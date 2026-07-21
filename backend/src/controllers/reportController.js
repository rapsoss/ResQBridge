const convexClient = require("../config/convex");
const { anyApi } = require("convex/server");
const { logEvent } = require("../middleware/logAudit");
const { notifyAdmin } = require("../services/adminNotification");

const URGENCY_MAP = {
  Healthy: "low",
  Injured: "high",
  Sick: "high",
  Trapped: "high",
  Unknown: "high",
};

const submitReport = async (req, res) => {
  try {
  const { name, phone, category, animalType, wildlifeCondition, location, description, latitude, longitude, quantity } = req.body;

  if (name && name.length > 100) {
    return res.status(400).json({ message: "Name must be at most 100 characters." });
  }
  if (!phone || !/^\+?\d{7,15}$/.test(phone)) {
    return res.status(400).json({ message: "Valid phone number is required (7-15 digits)." });
  }
  if (!animalType || animalType.length > 200) {
    return res.status(400).json({ message: "Animal type is required and must be at most 200 characters." });
  }
  if (!location || location.length > 500) {
    return res.status(400).json({ message: "Location is required and must be at most 500 characters." });
  }
  if (!description || description.length > 2000) {
    return res.status(400).json({ message: "Description is required and must be at most 2000 characters." });
  }

  const urgency = URGENCY_MAP[wildlifeCondition] || "medium";

  const qty = quantity ? parseInt(quantity, 10) : undefined;
  if (qty !== undefined && (isNaN(qty) || qty < 1)) {
    return res.status(400).json({ message: "Quantity must be a positive number." });
  }

  const lat = latitude ? parseFloat(latitude) : undefined;
  const lng = longitude ? parseFloat(longitude) : undefined;

  const images = [];

  const metadata = {
    name: name || "Anonymous",
    phone,
    category: category || "other",
    animalType,
    wildlifeCondition,
    urgency,
    location,
    description,
    images,
  };

  await logEvent({ req, eventType: "report_animal", metadata });

  const clientIp = req.ip || req.connection?.remoteAddress || "unknown";

  await convexClient.mutation(anyApi.reports.insertReport, {
    name: name || "Anonymous",
    phone,
    category: category || "other",
    animalType,
    urgency,
    quantity: qty,
    location,
    description,
    images: images.length > 0 ? images.join(",") : undefined,
    latitude: lat,
    longitude: lng,
    status: "pending",
    reporterIp: clientIp,
  });

  await notifyAdmin({
    type: "new_report",
    message: `New ${urgency} ${animalType} report from ${name || "Anonymous"} at ${location}`,
    link: "/admin/dashboard/reports",
  });

  res.status(201).json({ message: "Report submitted successfully.", images });
} catch (err) {
  console.error("submitReport error:", err);
  res.status(500).json({ message: "Internal server error: " + err.message });
  }
};

module.exports = { submitReport };
