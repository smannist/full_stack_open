const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
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
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/api/blogs", blogsRouter);

module.exports = app;
