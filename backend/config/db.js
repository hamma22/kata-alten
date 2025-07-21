const mongoose = require("mongoose");
const logger = require("./logger");
const { dbUri } = require("./config");

async function connectDB() {
  logger.info("Connecting to MongoDB...");

  try {
    await mongoose.connect(dbUri);
    logger.info("✅ MongoDB connected");
  } catch (err) {
    logger.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
