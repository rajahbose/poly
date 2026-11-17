# Elevation

Single-file web app that turns a photo of a piece of furniture or a plant into a clean, dimensioned vector drawing.

**Pipeline:** photo → Nano Banana (Gemini) orthographic line drawing → refine via chat → centerline vectorization in the browser → silhouette / fill shape → ratio-locked bounding box, overall dimensions and graphic scale → SVG at true size (1 unit = 1 inch).

- **Furniture** tab: side, front and plan views; sizes in inches.
- **Plants** tab: elevation and plan views; sizes in feet; mask-guided fill shape.

## Use

1. Open `index.html` in a browser (or serve the folder, e.g. `python3 -m http.server 8000`).
2. Click **Settings** and paste a Gemini API key. It is stored only in your browser.
3. Drop a photo, pick a view, press **Generate drawing**.

If you restrict the API key by website, run it from a local server and allow that address (e.g. `http://localhost:8000/*`); opening the file directly sends no referrer.
