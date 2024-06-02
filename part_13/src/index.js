const cors = require("cors");
const express = require("express");

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const blogsRouter = require("./controllers/blogs");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/blogs", blogsRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
