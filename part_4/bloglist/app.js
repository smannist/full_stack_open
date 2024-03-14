const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const { errorHandler } = require("./middleware/user");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const config = require("./utils/config");
const logger = require("./utils/logger");

const dotenv = require("dotenv");
dotenv.config();

morgan.token("body", (request) => JSON.stringify(request.body));

logger.info("Connecting to", config.MONGO_DB_URI);

mongoose.connect(config.MONGO_DB_URI).then(() => {
  logger.info("Connected to MongoDB");
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger.createMorganMiddleware());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(errorHandler);

module.exports = app;
