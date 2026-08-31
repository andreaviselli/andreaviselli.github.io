/* Numerical core for the DM / winsorised DM dashboard. No dependencies. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.DMCore = api;
})(typeof self !== 'undefined' ? self : globalThis, function () {
  'use strict';

  function mean(values) {
    if (!values.length) return NaN;
    let sum = 0;
    for (let i = 0; i < values.length; i += 1) sum += Number(values[i]);
    return sum / values.length;
  }

  function bartlettLRV(values, bandwidth) {
    const n = values.length;
    if (n < 2) return NaN;
    const bw = Math.max(0, Math.min(n - 1, Math.floor(bandwidth)));
    const avg = mean(values);
    const x = new Float64Array(n);
    let lrv = 0;
    for (let i = 0; i < n; i += 1) {
      x[i] = Number(values[i]) - avg;
      lrv += x[i] * x[i];
    }
    lrv /= n;
    if (bw > 0) {
      for (let lag = 1; lag <= bw; lag += 1) {
        let gamma = 0;
        for (let t = lag; t < n; t += 1) gamma += x[t] * x[t - lag];
        gamma /= n;
        lrv += 2 * ((bw - lag) / bw) * gamma;
      }
    }
    return lrv;
  }

  function fixedBCriticalValue(n, bandwidth) {
    const b = Number(bandwidth) / Number(n);
    return 1.96 + 2.9694 * b + 0.4160 * b * b - 0.5324 * b * b * b;
  }

  function normalQuantile(p) {
    if (!(p > 0 && p < 1)) return p === 0 ? -Infinity : p === 1 ? Infinity : NaN;
    const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687,
      138.357751867269, -30.66479806614716, 2.506628277459239];
    const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866,
      66.80131188771972, -13.28068155288572];
    const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838,
      -2.549732539343734, 4.374664141464968, 2.938163982698783];
    const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
    const plow = 0.02425;
    const phigh = 1 - plow;
    let q;
    let r;
    if (p < plow) {
      q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    if (p > phigh) {
      q = Math.sqrt(-2 * Math.log(1 - p));
      return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    q = p - 0.5;
    r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }

  function criticalValue({ reference = 'fixed-b', n, bandwidth, alpha = 0.05, sides = 2 }) {
    if (reference === 'fixed-b') return fixedBCriticalValue(n, bandwidth);
    return normalQuantile(1 - (sides === 2 ? alpha / 2 : alpha));
  }

  function winsorizeWindow(values, startIndex, length) {
    const n = values.length;
    const start = Math.max(0, Math.floor(startIndex));
    const end = Math.min(n, start + Math.max(0, Math.floor(length)));
    const out = Float64Array.from(values, Number);
    if (end <= start) return { values: out, lower: NaN, upper: NaN, changed: 0, start, end };

    let lower = Infinity;
    let upper = -Infinity;
    let stable = 0;
    for (let i = 0; i < n; i += 1) {
      if (i >= start && i < end) continue;
      const value = Number(values[i]);
      if (!Number.isFinite(value)) continue;
      lower = Math.min(lower, value);
      upper = Math.max(upper, value);
      stable += 1;
    }
    if (!stable) throw new Error('The instability window leaves no observations outside it.');

    let changed = 0;
    for (let i = start; i < end; i += 1) {
      const oldValue = out[i];
      const newValue = Math.min(upper, Math.max(lower, oldValue));
      if (newValue !== oldValue) changed += 1;
      out[i] = newValue;
    }
    return { values: out, lower, upper, changed, start, end };
  }

  function dmStatistic(values, bandwidth) {
    const n = values.length;
    const avg = mean(values);
    const lrv = bartlettLRV(values, bandwidth);
    const statistic = lrv > 0 ? Math.sqrt(n) * avg / Math.sqrt(lrv) : NaN;
    return { statistic, absolute: Math.abs(statistic), mean: avg, lrv, n };
  }

  function evaluateLossDifferential(values, options) {
    const series = Float64Array.from(values, Number);
    if (series.length < 5) throw new Error('At least five observations are required.');
    for (let i = 0; i < series.length; i += 1) {
      if (!Number.isFinite(series[i])) throw new Error(`Observation ${i + 1} is not numeric.`);
    }
    const bandwidth = Math.max(0, Math.min(series.length - 1, Math.floor(options.bandwidth)));
    const wins = winsorizeWindow(series, options.startIndex, options.length);
    const ordinary = dmStatistic(series, bandwidth);
    const robust = dmStatistic(wins.values, bandwidth);
    const cv = criticalValue({
      reference: options.reference || 'fixed-b',
      n: series.length,
      bandwidth,
      alpha: Number(options.alpha || 0.05),
      sides: 2,
    });
    ordinary.reject = Number.isFinite(ordinary.absolute) && ordinary.absolute > cv;
    robust.reject = Number.isFinite(robust.absolute) && robust.absolute > cv;
    return {
      n: series.length,
      bandwidth,
      criticalValue: cv,
      reference: options.reference || 'fixed-b',
      ordinary,
      winsorized: robust,
      raw: series,
      winsorizedSeries: wins.values,
      lower: wins.lower,
      upper: wins.upper,
      changed: wins.changed,
      windowStart: wins.start,
      windowEnd: wins.end,
    };
  }

  function mulberry32(seed) {
    let a = (Number(seed) >>> 0) || 0;
    return function random() {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function normalGenerator(random) {
    let spare = null;
    return function normal() {
      if (spare !== null) {
        const value = spare;
        spare = null;
        return value;
      }
      let u = 0;
      let v = 0;
      while (u <= Number.EPSILON) u = random();
      while (v <= Number.EPSILON) v = random();
      const magnitude = Math.sqrt(-2 * Math.log(u));
      const angle = 2 * Math.PI * v;
      spare = magnitude * Math.sin(angle);
      return magnitude * Math.cos(angle);
    };
  }

  function validateSimulationParams(input) {
    const p = {
      n: Math.floor(Number(input.n)),
      replications: Math.floor(Number(input.replications)),
      sigma2: Number(input.sigma2),
      phi: Number(input.phi),
      kappa: Number(input.kappa),
      theta: Number(input.theta),
      m: Math.floor(Number(input.m)),
      shockStart: Math.floor(Number(input.shockStart)),
      bandwidth: Math.floor(Number(input.bandwidth)),
      seed: Math.floor(Number(input.seed)),
      reference: input.reference || 'fixed-b',
      alpha: Number(input.alpha || 0.05),
    };
    if (!(p.n >= 10 && p.n <= 5000)) throw new Error('T must lie between 10 and 5000.');
    if (!(p.replications >= 1 && p.replications <= 100000)) throw new Error('Replications must lie between 1 and 100,000.');
    if (!(p.sigma2 > 0)) throw new Error('Innovation variance must be positive.');
    if (!(Math.abs(p.phi) < 0.999)) throw new Error('|phi| must be below 0.999.');
    if (!(p.m >= 1 && p.m < p.n)) throw new Error('Shock length m must lie between 1 and T-1.');
    if (!(p.shockStart >= 1 && p.shockStart + p.m - 1 <= p.n)) throw new Error('The shock window must lie inside the sample.');
    if (!(p.bandwidth >= 0 && p.bandwidth < p.n)) throw new Error('Bandwidth must lie between 0 and T-1.');
    return p;
  }

  function simulateSeries(params, normal) {
    const out = new Float64Array(params.n);
    const scale = Math.sqrt(params.sigma2);
    let u = normal() * scale / Math.sqrt(1 - params.phi * params.phi);
    const start = params.shockStart - 1;
    const end = start + params.m;
    for (let t = 0; t < params.n; t += 1) {
      if (t > 0) u = params.phi * u + normal() * scale;
      out[t] = params.kappa + u + (t >= start && t < end ? params.theta : 0);
    }
    return out;
  }

  function runMonteCarlo(input, progressCallback) {
    const params = validateSimulationParams(input);
    const random = mulberry32(params.seed);
    const normal = normalGenerator(random);
    const cv = criticalValue({ ...params, sides: 2 });
    const start = params.shockStart - 1;
    let rejectDM = 0;
    let rejectDMStar = 0;
    let valid = 0;
    let sampleRaw = null;
    let sampleWins = null;
    let sampleBounds = null;
    const reportEvery = Math.max(1, Math.floor(params.replications / 20));

    for (let r = 0; r < params.replications; r += 1) {
      const series = simulateSeries(params, normal);
      const wins = winsorizeWindow(series, start, params.m);
      const dm = dmStatistic(series, params.bandwidth);
      const dmStar = dmStatistic(wins.values, params.bandwidth);
      if (Number.isFinite(dm.absolute) && Number.isFinite(dmStar.absolute)) {
        valid += 1;
        if (dm.absolute > cv) rejectDM += 1;
        if (dmStar.absolute > cv) rejectDMStar += 1;
      }
      if (r === 0) {
        sampleRaw = Array.from(series);
        sampleWins = Array.from(wins.values);
        sampleBounds = { lower: wins.lower, upper: wins.upper };
      }
      if (progressCallback && ((r + 1) % reportEvery === 0 || r + 1 === params.replications)) {
        progressCallback((r + 1) / params.replications);
      }
    }
    const dmRate = valid ? rejectDM / valid : NaN;
    const dmStarRate = valid ? rejectDMStar / valid : NaN;
    const mcse = (p) => valid ? Math.sqrt(p * (1 - p) / valid) : NaN;
    return {
      params,
      validReplications: valid,
      criticalValue: cv,
      dmRate,
      dmStarRate,
      dmMcse: mcse(dmRate),
      dmStarMcse: mcse(dmStarRate),
      difference: dmStarRate - dmRate,
      sampleRaw,
      sampleWins,
      sampleBounds,
    };
  }

  return {
    mean,
    bartlettLRV,
    fixedBCriticalValue,
    normalQuantile,
    criticalValue,
    winsorizeWindow,
    dmStatistic,
    evaluateLossDifferential,
    mulberry32,
    normalGenerator,
    validateSimulationParams,
    simulateSeries,
    runMonteCarlo,
  };
});
