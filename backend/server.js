// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import router for handling car routes
const carRouter = require("./controllers/carController");

// Create an Express application
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware for handling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Connect to MongoDB database
mongoose.connect(
  "mongodb+srv://Hyperion_zam1:Cefxcfdf.1@clusterzam.cob0h5l.mongodb.net/carInventory",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Route handling for cars using carRouter
app.use("/cars", carRouter);

// Set the port for the server to listen on
const port = process.env.PORT || 5000;
// Start the server and listen for incoming requests
app.listen(port, () => console.log(`Server running on port ${port}`));
