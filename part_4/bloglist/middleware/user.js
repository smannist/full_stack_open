const logger = require("../utils/logger");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "Token missing or invalid" });
  } else if (error.name === "PermissionError") {
    return response.status(401).json({
      error: "Permission denied. You can only delete the blogs created by you.",
    });
  }

  next(error);
};

module.exports = {
  errorHandler,
};
