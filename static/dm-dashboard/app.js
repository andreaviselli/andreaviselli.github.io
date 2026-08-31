/* global DMCore */
'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const state = { worker: null, mc: null, loaded: null, evaluation: null };

function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
function number(value, digits = 3) {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) >= 1000 || (value !== 0 && Math.abs(value) < 0.001)) return value.toExponential(2);
  return value.toFixed(digits);
}
function percent(value, digits = 1) { return Number.isFinite(value) ? `${(100 * value).toFixed(digits)}%` : '—'; }
function pp(value) { return Number.isFinite(value) ? `${value >= 0 ? '+' : ''}${(100 * value).toFixed(1)} pp` : '—'; }
function status(target, message, error = false) { target.textContent = message; target.classList.toggle('error', error); }
function progress(fraction) { $('#progress').style.width = `${Math.max(0, Math.min(1, fraction)) * 100}%`; }

function canvasSetup(canvas) {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const width = Math.max(320, Math.floor(rect.width || 900));
  const height = Number(canvas.getAttribute('height')) || 300;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  return { ctx, width, height };
}

function emptyChart(canvas, message) {
  const { ctx, width, height } = canvasSetup(canvas);
  ctx.fillStyle = 'rgba(97,112,104,.75)';
  ctx.font = '600 14px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(message, width / 2, height / 2);
}

function extent(series) {
  let min = Infinity; let max = -Infinity;
  series.forEach(values => values.forEach(value => {
    const x = Number(value); if (!Number.isFinite(x)) return;
    min = Math.min(min, x); max = Math.max(max, x);
  }));
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [-1, 1];
  if (min === max) return [min - 1, max + 1];
  const pad = (max - min) * 0.09;
  return [min - pad, max + pad];
}

function lineChart(canvas, series, windowRange, labels) {
  const { ctx, width, height } = canvasSetup(canvas);
  const margin = { left: 58, right: 18, top: 18, bottom: 42 };
  const pw = width - margin.left - margin.right;
  const ph = height - margin.top - margin.bottom;
  const n = Math.max(...series.map(item => item.values.length));
  const [yMin, yMax] = extent(series.map(item => item.values));
  const x = i => margin.left + (n <= 1 ? 0 : i / (n - 1) * pw);
  const y = value => margin.top + (yMax - value) / (yMax - yMin) * ph;
  ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(0, 0, width, height);
  if (windowRange && windowRange.end > windowRange.start) {
    ctx.fillStyle = css('--shock');
    const x0 = x(windowRange.start); const x1 = x(Math.min(n - 1, windowRange.end - 1));
    ctx.fillRect(x0 - 2, margin.top, Math.max(7, x1 - x0 + 4), ph);
  }
  ctx.font = '11px system-ui, sans-serif'; ctx.fillStyle = 'rgba(97,112,104,.95)'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
  for (let g = 0; g <= 4; g += 1) {
    const value = yMax - (yMax - yMin) * g / 4; const yy = margin.top + ph * g / 4;
    ctx.strokeStyle = 'rgba(20,62,47,.10)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(margin.left, yy); ctx.lineTo(width - margin.right, yy); ctx.stroke();
    ctx.fillText(number(value, Math.abs(value) < 10 ? 1 : 0), margin.left - 8, yy);
  }
  if (yMin < 0 && yMax > 0) { const y0 = y(0); ctx.strokeStyle = 'rgba(20,62,47,.28)'; ctx.beginPath(); ctx.moveTo(margin.left, y0); ctx.lineTo(width - margin.right, y0); ctx.stroke(); }
  series.forEach(item => {
    ctx.strokeStyle = item.color; ctx.lineWidth = item.width || 2; ctx.globalAlpha = item.alpha ?? 1; ctx.setLineDash(item.dash || []); ctx.beginPath();
    let started = false;
    item.values.forEach((value, i) => { if (!Number.isFinite(Number(value))) return; if (!started) { ctx.moveTo(x(i), y(Number(value))); started = true; } else ctx.lineTo(x(i), y(Number(value))); });
    ctx.stroke(); ctx.globalAlpha = 1; ctx.setLineDash([]);
  });
  const ticks = [0, Math.floor((n - 1) / 2), n - 1];
  ctx.font = '11px system-ui, sans-serif'; ctx.textBaseline = 'top'; ctx.fillStyle = 'rgba(97,112,104,.95)';
  ticks.forEach((i, j) => { ctx.textAlign = j === 0 ? 'left' : j === 2 ? 'right' : 'center'; ctx.fillText(labels && labels[i] ? labels[i] : String(i + 1), x(i), height - margin.bottom + 10); });
}

function activate(name) {
  $$('.tab').forEach(button => { const active = button.dataset.tab === name; button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active)); });
  $$('.panel').forEach(panel => { const active = panel.dataset.panel === name; panel.hidden = !active; panel.classList.toggle('active', active); });
  history.replaceState(null, '', `#${name}`);
  setTimeout(() => {
    if (name === 'simulation' && state.mc) renderMC(state.mc);
    if (name === 'data' && state.evaluation) renderEvaluation(state.evaluation);
  }, 10);
}

function params() {
  return {
    n: Number($('#n').value), replications: Number($('#reps').value), sigma2: Number($('#sigma2').value), phi: Number($('#phi').value),
    kappa: Number($('#kappa').value), theta: Number($('#theta').value), m: Number($('#m').value), shockStart: Number($('#start').value),
    bandwidth: Number($('#bandwidth').value), seed: Number($('#seed').value), reference: $('#reference').value, alpha: 0.05,
  };
}

function syncLimits() {
  const n = Math.max(20, Number($('#n').value) || 100); const m = Math.max(1, Number($('#m').value) || 1);
  $('#start').max = String(Math.max(1, n - m + 1)); $('#m').max = String(n - 1); $('#bandwidth').max = String(n - 1);
  if (Number($('#start').value) + m - 1 > n) $('#start').value = String(Math.max(1, n - m + 1));
}

function interpretation(result) {
  const p = result.params;
  if (Math.abs(p.kappa) < 1e-12 && Math.abs(p.theta) < 1e-12) return `This is a size experiment. DM rejects ${percent(result.dmRate)} of the time and DM* rejects ${percent(result.dmStarRate)}.`;
  if (Math.abs(p.kappa) < 1e-12) return `Only the declared shock window differs. For DM*, the null concerns observations outside that window, so its rejection frequency is an empirical-size result rather than power against the shock.`;
  let text = `The ordinary-period gap is κ = ${number(p.kappa, 2)} and the shock-specific gap is θ = ${number(p.theta, 1)}. `;
  if (p.kappa * p.theta < 0) text += 'Their opposite signs attenuate the full-sample signal. ';
  text += result.difference > .25 ? `Winsorisation raises rejection frequency by ${pp(result.difference)}.` : result.difference > .05 ? `The gain is ${pp(result.difference)}.` : 'The procedures behave similarly in this design.';
  return text;
}

function renderMC(result) {
  state.mc = result;
  $('#dm-rate').textContent = percent(result.dmRate); $('#dm-se').textContent = `Monte Carlo SE ${percent(result.dmMcse, 2)}`;
  $('#dmstar-rate').textContent = percent(result.dmStarRate); $('#dmstar-se').textContent = `Monte Carlo SE ${percent(result.dmStarMcse, 2)}`;
  $('#difference').textContent = pp(result.difference); $('#critical').textContent = `Critical value ${number(result.criticalValue, 3)}`;
  lineChart($('#mc-chart'), [
    { values: result.sampleRaw, color: css('--raw'), width: 1.7, alpha: .72 },
    { values: result.sampleWins, color: css('--wins'), width: 2.5 },
  ], { start: result.params.shockStart - 1, end: result.params.shockStart - 1 + result.params.m });
  $('#mc-note').textContent = `The shaded window is observations ${result.params.shockStart}–${result.params.shockStart + result.params.m - 1}. Stable-sample range in this realization: [${number(result.sampleBounds.lower, 2)}, ${number(result.sampleBounds.upper, 2)}].`;
  $('#interpretation').textContent = interpretation(result);
}

function runMC() {
  const button = $('#run'); const target = $('#status');
  try {
    syncLimits(); const p = params(); DMCore.validateSimulationParams(p);
    if (state.worker) state.worker.terminate();
    const worker = new Worker('mc-worker.js'); state.worker = worker; button.disabled = true; progress(0); status(target, 'Running simulation…');
    worker.onmessage = event => {
      const message = event.data || {};
      if (message.type === 'progress') { progress(message.fraction); status(target, `Running… ${Math.round(message.fraction * 100)}%`); }
      if (message.type === 'result') { progress(1); status(target, `Completed ${message.result.validReplications.toLocaleString()} valid replications.`); renderMC(message.result); button.disabled = false; worker.terminate(); state.worker = null; }
      if (message.type === 'error') { button.disabled = false; progress(0); status(target, message.message, true); worker.terminate(); state.worker = null; }
    };
    worker.onerror = event => { button.disabled = false; progress(0); status(target, event.message || 'Simulation worker failed.', true); worker.terminate(); state.worker = null; };
    worker.postMessage({ params: p });
  } catch (error) { button.disabled = false; progress(0); status(target, error.message || String(error), true); }
}

function preset() {
  const values = { kappa: '-0.8', theta: '-80', phi: '0.25', m: '3', n: '100', start: '81', sigma2: '1', bandwidth: '10', seed: '0' };
  Object.entries(values).forEach(([id, value]) => $(`#${id}`).value = value); $('#reps').value = '5000'; $('#reference').value = 'fixed-b'; syncLimits(); status($('#status'), 'SPF calibration loaded.');
}

function parseLine(line, delimiter) {
  const out = []; let value = ''; let quoted = false;
  for (let i = 0; i < line.length; i += 1) { const c = line[i]; if (c === '"') { if (quoted && line[i + 1] === '"') { value += '"'; i += 1; } else quoted = !quoted; } else if (c === delimiter && !quoted) { out.push(value.trim()); value = ''; } else value += c; }
  out.push(value.trim()); return out;
}
function parseCSV(text) {
  const lines = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim().split('\n').filter(line => line.trim());
  if (lines.length < 2) throw new Error('The CSV must contain a header and data rows.');
  const candidates = [',', ';', '\t']; let delimiter = ','; let best = -1; candidates.forEach(d => { const count = lines[0].split(d).length; if (count > best) { best = count; delimiter = d; } });
  return { header: parseLine(lines[0], delimiter), rows: lines.slice(1).map(line => parseLine(line, delimiter)) };
}
function norm(value) { return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, ''); }
function find(header, choices) { const h = header.map(norm); for (const choice of choices) { const i = h.indexOf(choice); if (i >= 0) return i; } return -1; }
function numeric(row, index) { if (index < 0 || index >= row.length) return NaN; const value = String(row[index]).trim().replace(/\s/g, '').replace(',', '.'); return value === '' ? NaN : Number(value); }

function buildLoss(parsed, requested, lossName) {
  const aliases = {
    date: ['date', 'period', 'time', 'quarter', 'label'], outcome: ['outcome', 'realized', 'realised', 'actual', 'target', 'y'],
    fa: ['forecast_a', 'forecast1', 'forecast_1', 'model_a'], fb: ['forecast_b', 'forecast2', 'forecast_2', 'model_b'],
    ea: ['error_a', 'err_a', 'error1', 'error_1'], eb: ['error_b', 'err_b', 'error2', 'error_2'], loss: ['loss_diff', 'loss_differential', 'd', 'dt'],
  };
  const idx = Object.fromEntries(Object.entries(aliases).map(([key, choices]) => [key, find(parsed.header, choices)]));
  let mode = requested;
  if (mode === 'auto') { if (idx.outcome >= 0 && idx.fa >= 0 && idx.fb >= 0) mode = 'forecasts'; else if (idx.ea >= 0 && idx.eb >= 0) mode = 'errors'; else if (idx.loss >= 0) mode = 'loss'; else throw new Error('Could not auto-detect the required columns.'); }
  if (mode === 'forecasts' && !(idx.outcome >= 0 && idx.fa >= 0 && idx.fb >= 0)) throw new Error('Forecast mode requires outcome, forecast_a, and forecast_b.');
  if (mode === 'errors' && !(idx.ea >= 0 && idx.eb >= 0)) throw new Error('Error mode requires error_a and error_b.');
  if (mode === 'loss' && idx.loss < 0) throw new Error('Loss mode requires loss_diff.');
  const L = e => lossName === 'absolute' ? Math.abs(e) : e * e; const values = []; const labels = []; let dropped = 0;
  parsed.rows.forEach((row, rowIndex) => {
    let value;
    if (mode === 'forecasts') { const y = numeric(row, idx.outcome), a = numeric(row, idx.fa), b = numeric(row, idx.fb); value = [y, a, b].every(Number.isFinite) ? L(y - a) - L(y - b) : NaN; }
    else if (mode === 'errors') { const a = numeric(row, idx.ea), b = numeric(row, idx.eb); value = Number.isFinite(a) && Number.isFinite(b) ? L(a) - L(b) : NaN; }
    else value = numeric(row, idx.loss);
    if (Number.isFinite(value)) { values.push(value); labels.push(idx.date >= 0 && row[idx.date] ? row[idx.date] : String(rowIndex + 1)); } else dropped += 1;
  });
  if (values.length < 5) throw new Error('Fewer than five complete numeric observations remain.');
  return { values, labels, mode, dropped };
}

function loadText(text, name) {
  state.loaded = { parsed: parseCSV(text), name }; state.evaluation = null; $('#file-name').textContent = name;
  $('#summary').textContent = `${name}: ${state.loaded.parsed.rows.length.toLocaleString()} rows; columns: ${state.loaded.parsed.header.join(', ')}.`;
  $('#export').disabled = true; status($('#data-status'), 'Data loaded. Check the declared window and evaluation settings.'); emptyChart($('#data-chart'), 'Choose settings and evaluate the loaded data.');
}

function renderEvaluation(payload) {
  state.evaluation = payload; const r = payload.result;
  $('#data-dm').textContent = number(r.ordinary.absolute, 3); $('#data-dm-decision').textContent = `${r.ordinary.reject ? 'Reject' : 'Do not reject'} · critical value ${number(r.criticalValue, 3)}`;
  $('#data-dmstar').textContent = number(r.winsorized.absolute, 3); $('#data-dmstar-decision').textContent = `${r.winsorized.reject ? 'Reject' : 'Do not reject'} · critical value ${number(r.criticalValue, 3)}`;
  $('#changed').textContent = String(r.changed); $('#bounds').textContent = `Stable range [${number(r.lower, 2)}, ${number(r.upper, 2)}]`;
  lineChart($('#data-chart'), [{ values: Array.from(r.raw), color: css('--raw'), width: 1.7, alpha: .72 }, { values: Array.from(r.winsorizedSeries), color: css('--wins'), width: 2.5 }], { start: r.windowStart, end: r.windowEnd }, payload.labels);
  $('#data-note').textContent = `${payload.name}. Shaded rows ${r.windowStart + 1}–${r.windowEnd}; ${r.changed} observation${r.changed === 1 ? '' : 's'} changed.${payload.dropped ? ` ${payload.dropped} incomplete rows were dropped.` : ''}`;
  const rows = $$('#numbers div'); rows[0].querySelector('strong').textContent = String(r.n); rows[1].querySelector('strong').textContent = number(r.ordinary.mean, 4); rows[2].querySelector('strong').textContent = number(r.winsorized.mean, 4); rows[3].querySelector('strong').textContent = number(r.criticalValue, 4);
  $('#export').disabled = false; status($('#data-status'), 'Evaluation complete.');
}

function evaluate() {
  try {
    if (!state.loaded) throw new Error('Load a CSV file first.'); const built = buildLoss(state.loaded.parsed, $('#format').value, $('#loss').value);
    const start = Math.floor(Number($('#window-start').value)); const end = Math.floor(Number($('#window-end').value));
    if (!(start >= 1 && end >= start && end <= built.values.length)) throw new Error(`The window must lie between rows 1 and ${built.values.length}.`);
    const result = DMCore.evaluateLossDifferential(built.values, { bandwidth: Number($('#data-bandwidth').value), startIndex: start - 1, length: end - start + 1, reference: $('#data-reference').value, alpha: .05 });
    renderEvaluation({ result, labels: built.labels, mode: built.mode, dropped: built.dropped, name: state.loaded.name });
  } catch (error) { status($('#data-status'), error.message || String(error), true); }
}

function escapeCSV(value) { const text = String(value ?? ''); return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; }
function exportResults() {
  if (!state.evaluation) return; const { result, labels } = state.evaluation; const lines = ['row,label,loss_diff,loss_diff_winsorised,in_instability_window'];
  for (let i = 0; i < result.n; i += 1) lines.push([i + 1, escapeCSV(labels[i] || i + 1), result.raw[i], result.winsorizedSeries[i], i >= result.windowStart && i < result.windowEnd ? 1 : 0].join(','));
  lines.push('', `ordinary_dm,${result.ordinary.statistic}`, `winsorised_dm,${result.winsorized.statistic}`, `critical_value,${result.criticalValue}`);
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'dm-test-results.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

function init() {
  $$('.tab').forEach(button => button.addEventListener('click', () => activate(button.dataset.tab)));
  $('#run').addEventListener('click', runMC); $('#preset').addEventListener('click', preset); $('#n').addEventListener('change', syncLimits); $('#m').addEventListener('change', syncLimits);
  $('#file').addEventListener('change', async event => { const file = event.target.files && event.target.files[0]; if (!file) return; try { loadText(await file.text(), file.name); } catch (error) { status($('#data-status'), error.message || String(error), true); } });
  $('#evaluate').addEventListener('click', evaluate); $('#export').addEventListener('click', exportResults);
  emptyChart($('#mc-chart'), 'Run the simulation to draw a realization.'); emptyChart($('#data-chart'), 'Load data and evaluate the two tests.'); syncLimits();
  const hash = location.hash.replace('#', ''); if (['simulation', 'data', 'method'].includes(hash)) activate(hash);
  let timer; window.addEventListener('resize', () => { clearTimeout(timer); timer = setTimeout(() => { if (state.mc && !$('#simulation').hidden) renderMC(state.mc); if (state.evaluation && !$('#data').hidden) renderEvaluation(state.evaluation); }, 160); });
}

document.addEventListener('DOMContentLoaded', init);
