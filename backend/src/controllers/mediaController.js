const cloudinary = require("../config/cloudinary");

async function serveMedia(req, res) {
  const { publicId } = req.params;

  if (!publicId || typeof publicId !== "string") {
    return res.status(400).json({ message: "Invalid public ID." });
  }

  const url = cloudinary.url(publicId, {
    type: "authenticated",
    sign_url: true,
    secure: true,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
  });

  res.json({ url });
}

module.exports = { serveMedia };
