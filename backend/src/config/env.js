// ── Environment variable validation ───────────────
// Fails fast at startup if required vars are missing.

const requiredEnvVars = [
    "MONGO_URI",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
];

const validateEnv = () => {
    const missing = requiredEnvVars.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        console.error(
            ` Missing required environment variables:\n   ${missing.join("\n   ")}`
        );
        process.exit(1);
    }

    console.log("Environment variables validated");
};

// Centralised config object
const config = {
    // Server
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: parseInt(process.env.PORT || "5000", 10),

    // MongoDB
    MONGO_URI: process.env.MONGO_URI,

    // JWT
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE || "15m",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE || "7d",

    // Cookie
    COOKIE_EXPIRE: parseInt(process.env.COOKIE_EXPIRE || "604800000", 10),

    // Admin seed
    ADMIN_NAME: process.env.ADMIN_NAME || "Admin",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@portfolio.com",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "Admin@123456",

    // Email
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: parseInt(process.env.SMTP_PORT || "587", 10),
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "Portfolio Contact",

    // Client
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",

    // Helpers
    isDev: process.env.NODE_ENV === "development",
    isProd: process.env.NODE_ENV === "production",
};

module.exports = { config, validateEnv };