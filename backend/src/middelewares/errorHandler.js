const { config } = require("../config/env");

// Custom error class
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Global error handler middleware
// Must have 4 params for Express to treat it as error middleware
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === "CastError") {
        statusCode = 404;
        message = `Resource not found`;
    }

    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    }

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((e) => e.message)
            .join(", ");
    }

    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token. Please log in again.";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token expired. Please log in again.";
    }

    if (config.isDev) {
        console.error("🔴 Error:", {
            statusCode,
            message,
            stack: err.stack,
        });
    }

    return res.status(statusCode).json({
        success: false,
        message,
        // Only show stack in development
        ...(config.isDev && { stack: err.stack }),
    });
};

const notFound = (req, res, next) => {
    const err = new AppError(
        `Route not found — ${req.method} ${req.originalUrl}`,
        404
    );
    next(err);
};

module.exports = { errorHandler, notFound, AppError };