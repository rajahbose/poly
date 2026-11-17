// Vercel serverless relay: forwards the app's Gemini requests and adds the server-side key.
// Environment variables (Project Settings → Environment Variables):
//   GEMINI_API_KEY  required — your Gemini API key
//   APP_PASSWORD    optional — if set, the app must send this password (entered in the app's Settings)
module.exports = async (req, res) => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: { message: "GEMINI_API_KEY is not set on the server." } });

  const pw = process.env.APP_PASSWORD;
  if (pw && req.headers["x-app-password"] !== pw)
    return res.status(401).json({ error: { message: "This site needs a password: enter it under Settings → Site password." } });

  // Only the two calls the app makes: list models, and generateContent on a model.
  const path = String(req.query.path || "");
  const ok = /^models(\?pageSize=\d{1,3})?$/.test(path) || /^models\/[\w.\-]+:generateContent$/.test(path);
  if (!ok) return res.status(400).json({ error: { message: "Unsupported request." } });
  if (path.includes(":generateContent") ? req.method !== "POST" : req.method !== "GET")
    return res.status(405).json({ error: { message: "Method not allowed." } });

  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/${path}`, {
      method: req.method,
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    });
    res.status(r.status);
    res.setHeader("Content-Type", r.headers.get("content-type") || "application/json");
    res.setHeader("Cache-Control", "no-store");
    res.send(await r.text());
  } catch (e) {
    res.status(502).json({ error: { message: "Couldn't reach Gemini: " + (e && e.message) } });
  }
};
