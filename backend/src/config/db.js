const mongoose = require("mongoose");
const { config } = require("./env");

// ── MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI, {
      autoIndex: true,
    });

    console.log(
      `MongoDB connected: ${conn.connection.host} — DB: ${conn.connection.name}`
    );

    await seedAdmin();

  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};


const seedAdmin = async () => {
  try {
    const Auth = require("../models/Auth");

    const exists = await Auth.findOne({ email: config.ADMIN_EMAIL });

    if (!exists) {
      await Auth.create({
        name    : config.ADMIN_NAME,
        email   : config.ADMIN_EMAIL,
        password: config.ADMIN_PASSWORD,
        role    : "admin",
      });

      console.log(
        `Admin seeded — email: ${config.ADMIN_EMAIL} | password: ${config.ADMIN_PASSWORD}`
      );
      console.log(
        "Change the admin password after first login!"
      );
    }
  } catch (err) {
    console.error(`Admin seed failed: ${err.message}`);
  }
};

// Mongoose event listeners
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌  MongoDB connection closed (SIGINT)");
  process.exit(0);
});

module.exports = connectDB;