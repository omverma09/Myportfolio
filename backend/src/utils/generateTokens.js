const jwt = require("jsonwebtoken");
const { config } = require("../config/env");

// ── Generate access token ─────────────────────────
// Short-lived (15m by default)
// Stored in memory on the client (not in localStorage)
const generateAccessToken = (payload) => {
    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
        expiresIn: config.ACCESS_TOKEN_EXPIRE,
    });
};

// ── Generate refresh token ────────────────────────
// Long-lived (7d by default)
// Stored in httpOnly cookie — never accessible via JS
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
        expiresIn: config.REFRESH_TOKEN_EXPIRE,
    });
};

// ── Verify access token ───────────────────────────
const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    } catch (err) {
        return null;
    }
};

// ── Verify refresh token ──────────────────────────
const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
    } catch (err) {
        return null;
    }
};

// ── Cookie options for refresh token ─────────────
// httpOnly = JS cannot access the cookie
// secure   = HTTPS only in production
// sameSite = CSRF protection
const getRefreshCookieOptions = () => ({
    httpOnly: true,
    secure: config.isProd,
    sameSite: config.isProd ? "strict" : "lax",
    maxAge: config.COOKIE_EXPIRE,  // milliseconds
    path: "/api/auth",           // cookie only sent to auth routes
});

// ── Clear cookie options ──────────────────────────
const getClearCookieOptions = () => ({
    httpOnly: true,
    secure: config.isProd,
    sameSite: config.isProd ? "strict" : "lax",
    path: "/api/auth",
});

// ── Send tokens helper ────────────────────────────
// Attaches refresh token as httpOnly cookie
// Returns access token in response body
const sendTokenResponse = (res, user, statusCode = 200, message = "Success") => {
    // Build minimal payload — never include password
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Set refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, getRefreshCookieOptions());

    // Send access token + user info in body
    return res.status(statusCode).json({
        success: true,
        message,
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    getRefreshCookieOptions,
    getClearCookieOptions,
    sendTokenResponse,
};