const mongoose = require("mongoose");

// Define the schema for a car document
const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  registrationNumber: String,
  currentOwner: String,
  age: Number,
});

// Create a model based on the car schema
const Car = mongoose.model("Car", carSchema);

module.exports = Car;
