# Upload full WebGL ray-march sim

The complete sim is a single self-contained HTML file (~34 KB):

`URF_raytrace_webgl.html`

(from project artifacts or your local working copy)

## Why upload via the web UI?

The GitHub API path used by the agent is awkward above ~20–30 KB. The modular shell + loader already in this folder will **not** run until either:

1. You upload the **full single-file** HTML (recommended), or
2. The agent finishes pushing decoded JS payloads.

## Steps (recommended)

1. Open: https://github.com/Zhenzheni/unified-relational-framework/upload/main/sims
2. Drag **`URF_raytrace_webgl.html`** (the full local file).
3. Commit message: `Add full WebGL SDF ray-march sim`
4. Commit to **main**

Pages redeploys automatically.

- Landing: https://Zhenzheni.github.io/unified-relational-framework/
- WebGL: https://Zhenzheni.github.io/unified-relational-framework/URF_raytrace_webgl.html

## Local (always works)

Open `artifacts/URF_raytrace_webgl.html` directly in Chrome / Edge / Firefox (WebGL2).
