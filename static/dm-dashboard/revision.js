'use strict';

window.interpretation = function interpretation(result) {
  const p = result.params;

  if (Math.abs(p.kappa) < 1e-12 && Math.abs(p.theta) < 1e-12) {
    return `This is a size experiment. DM rejects ${percent(result.dmRate)} of the time and DM* rejects ${percent(result.dmStarRate)}.`;
  }

  if (Math.abs(p.kappa) < 1e-12) {
    return 'Only the declared shock window differs. For DM*, the null concerns observations outside that window, so its rejection frequency is an empirical-size result rather than power against the shock.';
  }

  let text = `In normal times the gap is κ = ${number(p.kappa, 2)}, while the shock-specific gap is θ = ${number(p.theta, 1)}. `;

  if (Math.abs(result.difference) <= 0.05) {
    text += 'The DM and DM* tests perform similarly in this design.';
  } else if (result.difference > 0) {
    text += `Winsorisation raises power by ${pp(result.difference)}.`;
  } else {
    text += `Winsorisation lowers power by ${pp(Math.abs(result.difference))}.`;
  }

  return text;
};

function formatStatisticQuantity(value, digits = 4) {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) >= 1000 || (value !== 0 && Math.abs(value) < 0.001)) {
    return value.toExponential(2);
  }
  return value.toFixed(digits);
}

const baseRenderEvaluation = window.renderEvaluation;
window.renderEvaluation = function renderEvaluationWithStatisticDetails(payload) {
  baseRenderEvaluation(payload);

  const result = payload.result;
  const rows = document.querySelectorAll('#numbers div');
  if (rows.length < 4) return;

  rows[0].querySelector('strong').textContent = String(result.n);
  rows[1].querySelector('strong').textContent = formatStatisticQuantity(result.winsorized.mean, 4);
  rows[2].querySelector('strong').textContent = formatStatisticQuantity(result.winsorized.lrv, 4);
  rows[3].querySelector('strong').textContent = formatStatisticQuantity(result.criticalValue, 4);
};

document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('#data .method-warning');
  if (!card) return;

  const label = card.querySelector('.label');
  const heading = card.querySelector('h3');
  const description = card.querySelector('h3 + p');
  const quantities = card.querySelector('#numbers');

  if (label) label.textContent = 'Test statistic';
  if (heading) heading.textContent = 'Compute the DM* statistic';
  if (description) {
    description.textContent = 'Here you can find the relevant quantities used to compute the winsorised test statistic.';
  }
  if (quantities) {
    quantities.innerHTML = [
      '<div><span>Sample size</span><strong>—</strong></div>',
      '<div><span>Winsorised mean loss differential</span><strong>—</strong></div>',
      '<div><span>Winsorised long-run variance estimate</span><strong>—</strong></div>',
      '<div><span>Critical value</span><strong>—</strong></div>'
    ].join('');
  }
});
