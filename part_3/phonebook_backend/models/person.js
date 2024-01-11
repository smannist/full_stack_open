const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

console.log("Connecting to ...", process.env.MONGO_DB_URI);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then((result) => {
    console.log("Success! Connected to MongoDB.");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: number => /^(\d{2,3}-|\d{3}-)\d+$/.test(number),
      message: "The phone number must be in the format XX-XXXXXXX or XXX-XXXXXXX."
    },
    minlength: 8,
    required: true
  }
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
