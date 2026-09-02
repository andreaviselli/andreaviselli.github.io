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
