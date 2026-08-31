# DM Test Explorer

A dependency-free, client-side dashboard accompanying **Robust forecast evaluation under extreme shocks** by Fabrizio Iacone and Andrea Viselli.

## Features

- Monte Carlo comparison of DM and winsorised DM* under the manuscript DGP.
- Controls for κ, θ, φ, shock duration, sample size, bandwidth, replications, and seed.
- Upload support for outcomes and forecasts, forecast errors, or a pre-computed loss differential.
- Squared and absolute loss.
- Fixed-smoothing or standard-normal critical values.
- Local browser processing: uploaded data are not transmitted.
- CSV export of the raw and winsorised loss differential.

## Run locally

```bash
python -m http.server 8765
```

Open `http://localhost:8765/`.

## Numerical convention

The Bartlett long-run variance estimator assigns weight `(M-j)/M` at lag `j`. The fixed-smoothing critical value uses the polynomial in the public replication code.

## Tests

```bash
node tests/test_core.js
node tests/test_mc.js
```

## Deployment

The production path is `https://andreaviselli.it/dm-dashboard/`. In the Hugo website repository, place this folder under `static/dm-dashboard/`.
