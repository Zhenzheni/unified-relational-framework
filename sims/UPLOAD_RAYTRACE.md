# Upload the full Ray Trace sim

The raytrace HTML is ~48 KB (single self-contained file). The API path used for smaller files is awkward at that size, so upload once via the web UI:

## Steps (2 minutes)

1. Open: https://github.com/Zhenzheni/unified-relational-framework/upload/main/sims
2. Drag in your local file:
   `URF_raytrace_shortfall.html`
   (from the project artifacts / wherever you saved the working sim)
3. Commit message: `Add full URF raytrace shortfall sim`
4. Commit to **main**

Pages will redeploy automatically. When green:

- Landing: https://Zhenzheni.github.io/unified-relational-framework/
- Ray Trace: https://Zhenzheni.github.io/unified-relational-framework/URF_raytrace_shortfall.html

## Note

A modular shell (`URF_raytrace_shortfall.html` + `raytrace.css`) may already exist in `sims/`. **Overwrite** that HTML with the full single-file version so the sim does not depend on missing `raytrace.part1.js` / `raytrace.part2.js`.
