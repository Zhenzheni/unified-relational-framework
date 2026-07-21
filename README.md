# Unified Relational Framework (URF)

Geometric derivation from the Reuleaux triangle: Force Angle, Angular Shortfall, residual stress, pressure length, packed-set background, and shortfall-controlled optics.

**Author:** Chris Peterson (independent researcher)  
**GitHub:** [Zhenzheni/unified-relational-framework](https://github.com/Zhenzheni/unified-relational-framework)

## Repository layout

```
paper/          LaTeX source (canonical theory write-up)
sims/           Interactive HTML instruments and ray-trace
figures/        Static plots
.github/        CI (LaTeX PDF build)
```

## Core ideas (status)

- **Force Angle Law** — retained generating circles; never reaches 120°.
- **Angular Shortfall** — permanent deficit; source of residual stress and angular momentum.
- **Pressure length** $\ell = s/\sqrt{10}$ — pure geometry (no $\sigma$ in the length symbol).
- **Regimes** — $\mathrm{P}\ell \leftrightarrow \ell\mathrm{P}$, cycle including pp / PP extremes.
- **Packed-set background** — space is tiled by extended nuclei; no empty Cartesian void.
- **Self-nuclearisation** — compression → explosive split; expansion → sympathetic split (PL–pl limits).
- **Optics** — Caustic, Prismatic, Kinetic, Scotopic, Cryptic; shortfall-controlled raytrace.
- **Open** — full GR match; quantitative residual pressure → Newtonian limit.

## Sims

| File | Role |
|------|------|
| `sims/URF_The_Instrument.html` | Live dashboard of core equations |
| `sims/URF_raytrace_shortfall.html` | Packed sets, $\kappa$ sweep, self-nuclearisation, modes |

Open the HTML files in a browser (no build step).

## Build PDF (GitHub Actions)

Push to `main` under `paper/` triggers LaTeX build. Download the PDF from the Actions artifact, or run locally:

```bash
cd paper && latexmk -pdf URF_Paper_Skeleton.tex
```

## License

All rights reserved unless otherwise noted. Contact the author for collaboration.
