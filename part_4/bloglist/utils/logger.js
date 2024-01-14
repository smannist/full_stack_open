const morgan = require("morgan");

const info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

const createMorganMiddleware = () => {
  if (process.env.NODE_ENV !== "test") {
    return morgan(":method :url :status :res[content-length] - :response-time ms :body");
  }
  return (req, res, next) => next();
};

module.exports = {
  info,
  error,
  createMorganMiddleware,
};
