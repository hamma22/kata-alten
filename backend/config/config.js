module.exports = {
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 5000,
  dbUri: process.env.DB_URI || "mongodb://localhost:27017/kata-db",
  jwtSecret: process.env.JWT_SECRET || "your_default_jwt_secret",
};
