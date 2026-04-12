const express = require("express");
const router  = express.Router();

const {
  sendMessage,
  contactHealth,
} = require("../controllers/contactController.js");

const { contactLimiter } = require("../middelewares/rateLimiter.js");
const validate           = require("../middelewares/validate.js");
const { contactValidator } = require("../validators/contactValidator.js");

// Public routes

// GET /api/contact/health
router.get("/health", contactHealth);

// POST /api/contact
// Rate limited — 5 messages per hour per IP
router.post(
  "/",
  contactLimiter,
  contactValidator,
  validate,
  sendMessage
);

module.exports = router;