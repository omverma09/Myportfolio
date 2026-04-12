const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const { config } = require("./config/env");
const { globalLimiter } = require("./middelewares/rateLimiter.js");
const { errorHandler, notFound } = require("./middelewares/errorHandler.js");

// Route imports
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Security Middleware

// Set security HTTP headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// CORS — allow only frontend origin
app.use(
    cors({
        origin: config.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Requested-With",
        ],
    })
);

// Global rate limiter
app.use(globalLimiter);

app.use(mongoSanitize());

// Prevent HTTP parameter pollution
app.use(hpp());

// General Middleware

// Parse JSON bodies — limit to 10kb
app.use(express.json({ limit: "10kb" }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Parse cookies (needed for refresh token httpOnly cookie)
app.use(cookieParser());

// HTTP request logger — only in development
if (config.isDev) {
    app.use(morgan("dev"));
}

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Portfolio API is running",
        version: "1.0.0",
        env: config.NODE_ENV,
        timestamp: new Date().toISOString(),
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API health check passed",
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())}s`,
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);

// Error Handling

// 404 — catch all unmatched routes
app.use(notFound);

// Global error handler — must be last
app.use(errorHandler);

module.exports = app;