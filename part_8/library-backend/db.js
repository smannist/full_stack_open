const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
mongoose.set("strictQuery", false);

const MONGO_DB_URI = process.env.MONGO_DB_URI;
console.log("connecting to", MONGO_DB_URI);

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

module.exports = mongoose;
