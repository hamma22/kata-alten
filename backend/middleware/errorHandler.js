const logger = require("../config/logger");

module.exports = (err, req, res, _next) => {
  logger.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
