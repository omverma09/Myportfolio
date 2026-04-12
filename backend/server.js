require("dotenv").config();

const { validateEnv } = require("./src/config/env");
const connectDB = require("./src/config/db");
const app = require("./src/app");
const { config } = require("./src/config/env");

validateEnv();

connectDB();

const server = app.listen(config.PORT, () => {
    console.log("─────────────────────────────────────────");
    console.log(`Server running in ${config.NODE_ENV} mode`);
    console.log(`URL      : http://localhost:${config.PORT}`);
    console.log(`API Base : http://localhost:${config.PORT}/api`);
    console.log("─────────────────────────────────────────");
});

// Unhandled promise rejections
// Catches async errors not caught by try/catch
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    console.error(err.stack);

    // Close server gracefully then exit
    server.close(() => {
        process.exit(1);
    });
});

// Uncaught exceptions
// Catches synchronous errors not caught anywhere
process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
});

// Graceful shutdown on SIGTERM (e.g. Docker / cloud)
process.on("SIGTERM", () => {
    console.log("📴  SIGTERM received. Shutting down gracefully...");
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
});