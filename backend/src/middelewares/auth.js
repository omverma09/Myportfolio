const { verifyAccessToken } = require("../utils/generateTokens");
const { errorResponse }     = require("../utils/apiResponse");
const Auth                  = require("../models/Auth");

// ── Protect middleware ────────────────────────────
// Verifies access token from Authorization header
// Attaches user to req.user
const protect = async (req, res, next) => {
  try {
    let token = null;

    // Extract token from Authorization header
    // Expected format: "Bearer <token>"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token found
    if (!token) {
      return errorResponse(
        res,
        401,
        "Access denied. No token provided."
      );
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return errorResponse(
        res,
        401,
        "Invalid or expired access token."
      );
    }

    // Check user still exists in DB
    const user = await Auth.findById(decoded.id).select("-password -refreshToken");

    if (!user) {
      return errorResponse(
        res,
        401,
        "User belonging to this token no longer exists."
      );
    }

    // Check account is active
    if (!user.isActive) {
      return errorResponse(
        res,
        401,
        "Your account has been deactivated. Contact support."
      );
    }

    // Attach user to request
    req.user = user;
    next();

  } catch (err) {
    return errorResponse(res, 401, "Authentication failed.");
  }
};

// ── Admin middleware ──────────────────────────────
// Must be used AFTER protect middleware
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return errorResponse(
      res,
      403,
      "Access denied. Admin privileges required."
    );
  }
  next();
};

// ── Optional auth middleware ──────────────────────
// Attaches user if token exists but does NOT block
// if no token is provided (useful for public routes)
const optionalAuth = async (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      const decoded = verifyAccessToken(token);
      if (decoded) {
        const user = await Auth.findById(decoded.id).select(
          "-password -refreshToken"
        );
        if (user && user.isActive) {
          req.user = user;
        }
      }
    }

    next();
  } catch (err) {
    // Never block — just skip auth
    next();
  }
};

module.exports = { protect, adminOnly, optionalAuth };