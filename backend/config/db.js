const mongoose = require("mongoose");
const logger = require("./logger");
const { dbUri, nodeEnv, dbTestUri } = require("./config");

async function connectDB() {
  logger.info("Connecting to MongoDB...");

  try {
    const uri = nodeEnv === "test" ? dbTestUri : dbUri;
    await mongoose.connect(uri);
    logger.info(
      `✅ MongoDB connected to ${nodeEnv === "test" ? "test" : "main"} database`
    );
  } catch (err) {
    logger.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
