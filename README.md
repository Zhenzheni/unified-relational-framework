# Unified Relational Framework (URF)

Geometric derivation from the Reuleaux triangle: Force Angle, Angular Shortfall, radial residual stress, pressure length, packed-set background, and shortfall-controlled optics.

**Author:** Chris Peterson (independent researcher)  
**Repo:** [Zhenzheni/unified-relational-framework](https://github.com/Zhenzheni/unified-relational-framework)  
**Pages:** [Zhenzheni.github.io/unified-relational-framework](https://Zhenzheni.github.io/unified-relational-framework/)

## Layout

```
paper/     LaTeX source
sims/      Interactive HTML instruments
.github/   Pages + LaTeX CI
```

## Core ideas

- **Force Angle Law** — retained generating circles; never reaches 120°.
- **Angular Shortfall** — permanent deficit; origin of residual stress.
- **Radial residual stress** — shortfall organised as radial tension/compression on the Pressure Shell (`P>0` / `p<0`).
- **Pressure length** `ℓ = s/√10` — pure geometry; regimes `pp … PP`.
- **Packed-set background** — tetrahedral lattice of four-sphere cells; no empty void.
- **Self-nuclearisation** — compression → explosive; expansion → sympathetic.
- **Optics** — Caustic, Prismatic, Kinetic, Scotopic, Cryptic.

## Sims

| File | Role |
|------|------|
| `sims/URF_The_Instrument.html` | Live dashboard of core equations |
| `sims/URF_raytrace_shortfall (7).html` | Full Canvas ray-trace (deployed as `URF_raytrace_shortfall.html` on Pages) |

Open HTML locally in a browser, or use the [Pages site](https://Zhenzheni.github.io/unified-relational-framework/).

WebGL ray-march lives in local project artifacts only until a clean single-file upload lands here.

## Build PDF

Push under `paper/` triggers LaTeX CI, or locally:

```bash
cd paper && latexmk -pdf URF_Paper_Skeleton.tex
```

## License

All rights reserved unless otherwise noted.
