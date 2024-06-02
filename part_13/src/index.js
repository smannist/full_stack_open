const cors = require("cors");

const express = require("express");
const app = express();

require("express-async-errors");

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const errorHandler = require("./middleware/errorhandler");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

app.use(express.json());
app.use(cors());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
