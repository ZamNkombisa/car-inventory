const express = require("express");
const Car = require("../models/carModel");

const router = express.Router();

// Route to fetch all cars
router.get("/", async (_req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a new car
router.post("/", async (req, res) => {
  const newCar = new Car(req.body);
  try {
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update a car by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a car by ID
router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
