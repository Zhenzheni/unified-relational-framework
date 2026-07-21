# URF core equations (quick reference)

Canonical full source: project file `URF_Paper_Skeleton.tex` (sync to this folder from the Grok project).

## Force Angle Law
$$\theta(d) = \frac{2\pi}{3} - 2\arcsin\left(\frac{d}{2s}\right), \quad d \in [0, s\sqrt{3}]$$

## Angular Shortfall
$$\Delta\theta(d) = 2\arcsin\left(\frac{d}{2s}\right) > 0$$
$$\Delta\theta_c = \pi/3 \quad (d=s)$$

## Residual stress
$$\sigma_{\mathrm{res}} = \kappa \cdot \Delta\theta, \quad \kappa \neq 0$$
$$P > 0 \text{ tension}, \quad p < 0 \text{ pressure}$$

## Pressure length (pure geometry)
$$\ell = \frac{s}{\sqrt{10}}$$
Primary axis: $\mathrm{P}\ell \leftrightarrow \ell\mathrm{P}$

## Elastic moduli
$$Y = \sqrt{10}\,|\sigma_{\mathrm{res}}|, \quad K = \frac{\sqrt{10}}{3}\,|\sigma_{\mathrm{res}}|, \quad G = \frac{3}{\pi}\,|\sigma_{\mathrm{res}}|$$

## Mass scale
$$m \sim \frac{\hbar}{c\,s}, \quad s \approx 0.84\,\mathrm{fm}$$

## Self-nuclearisation
- Compression ($\kappa < 0$): explosive separation at PL–pl limits
- Expansion ($\kappa > 0$): sympathetic separation at PL–pl limits

## Background
Packed sets (extended nuclei lattice) — no empty Cartesian void.
