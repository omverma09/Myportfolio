const express = require("express");
const router = express.Router();

const {
    login,
    refreshToken,
    logout,
    getMe,
    updateProfile,
    changePassword,
} = require("../controllers/authController.js");

const { protect, adminOnly } = require("../middelewares/auth.js");
const validate = require("../middelewares/validate.js");
const { authLimiter } = require("../middelewares/rateLimiter.js");

const {
    loginValidator,
    changePasswordValidator,
    updateProfileValidator,
} = require("../validators/authValidator");

// POST /api/auth/login
// Rate limited — 10 attempts per 15 minutes
router.post(
    "/login",
    authLimiter,
    loginValidator,
    validate,
    login
);

// POST /api/auth/refresh
// Uses httpOnly refresh token cookie to issue new access token
router.post("/refresh", refreshToken);

// Private routes — require valid access token

// POST /api/auth/logout
router.post("/logout", protect, adminOnly, logout);

// GET /api/auth/me
router.get("/me", protect, adminOnly, getMe);

// PUT /api/auth/update-profile
router.put(
    "/update-profile",
    protect,
    adminOnly,
    updateProfileValidator,
    validate,
    updateProfile
);

// PUT /api/auth/change-password
router.put(
    "/change-password",
    protect,
    adminOnly,
    changePasswordValidator,
    validate,
    changePassword
);

module.exports = router;