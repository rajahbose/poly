# _poly

Single-file web app that turns a photo of a piece of furniture or a plant into a clean, dimensioned vector drawing.

**Pipeline:** photo → Nano Banana (Gemini) orthographic line drawing → refine via chat → centerline vectorization in the browser → silhouette / fill shape → ratio-locked bounding box, overall dimensions and graphic scale → SVG at true size (1 unit = 1 inch).

- **Furniture** tab: side, front and plan views; sizes in inches.
- **Plants** tab: elevation and plan views; sizes in feet; mask-guided fill shape.
- **People** tab: elevation and plan views of figures in any pose or activity, entourage style; sizes in inches; mask-guided fill shape.
- **Site Plan** tab: from an aerial or satellite image, Nano Banana paints a colour-coded land-use map and Gemini finds small street infrastructure; each category is vectorized onto its own coloured layer (buildings, roads, sidewalks, parking, crosswalks, bike lanes, rail, trees, landscape, water, signals, lights, street furniture) with a Layers panel for visibility, colour and line weight. Sizes in feet.
- **Recent** filmstrip: the last 10 runs are kept in this browser (IndexedDB) and can be reopened with all their versions.

## Use

**On Vercel (recommended):** deploy with the **Other** preset and set these environment variables:

- `GEMINI_API_KEY` (required): your Gemini key. The page calls `api/gemini.js`, which adds the key on the server, so it never reaches the browser.
- `APP_PASSWORD` (optional): if set, visitors must enter this under **Settings → Site password** before the app works.

**Locally:** open `index.html` (or serve the folder, e.g. `python3 -m http.server 8000`), click **Settings** and paste a Gemini API key. It is stored only in your browser.

Then drop a photo, pick a view, and press **Generate drawing**.

If you restrict the API key by website, run it from a local server and allow that address (e.g. `http://localhost:8000/*`); opening the file directly sends no referrer.
