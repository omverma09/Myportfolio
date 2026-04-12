const {rateLimit}  = require("express-rate-limit");
const { config } = require("../config/env");

// Generic rate limit handler
const limitHandler = (req, res) => {
  return res.status(429).json({
    success: false,
    message: "Too many requests. Please try again later.",
  });
};

// Global limiter
// Applied to all routes
const globalLimiter = rateLimit({
  windowMs         : 15 * 60 * 1000,   // 15 minutes
  max              : 200,               // 200 requests per window
  standardHeaders  : true,
  legacyHeaders    : false,
  handler          : limitHandler,
  skip             : () => config.isDev, // skip in development
});

// Auth limiter
// Stricter — applied only to login/register routes
const authLimiter = rateLimit({
  windowMs        : 15 * 60 * 1000,   // 15 minutes
  max             : 10,               // 10 attempts per window
  standardHeaders : true,
  legacyHeaders   : false,
  handler         : (req, res) => {
    return res.status(429).json({
      success: false,
      message:
        "Too many login attempts. Please wait 15 minutes before trying again.",
    });
  },
  skip: () => config.isDev,
});

// Contact limiter
// Prevents contact form spam
const contactLimiter = rateLimit({
  windowMs        : 60 * 60 * 1000,   // 1 hour
  max             : 5,                // 5 messages per hour
  standardHeaders : true,
  legacyHeaders   : false,
  handler         : (req, res) => {
    return res.status(429).json({
      success: false,
      message:
        "Too many messages sent. Please wait an hour before trying again.",
    });
  },
  skip: () => config.isDev,
});

// API limiter
// Applied to general API routes
const apiLimiter = rateLimit({
  windowMs        : 15 * 60 * 1000,
  max             : 100,
  standardHeaders : true,
  legacyHeaders   : false,
  handler         : limitHandler,
  skip            : () => config.isDev,
});

module.exports = {
  globalLimiter,
  authLimiter,
  contactLimiter,
  apiLimiter,
};