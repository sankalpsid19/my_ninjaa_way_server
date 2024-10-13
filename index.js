const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const uploadRoutes = require("./src/routes/uploadRoutes"); // Ensure this path is correct
const cors = require("cors");

dotenv.config();
const app = express();
// Enable CORS for all routes
app.use(cors());
const PORT = process.env.PORT;

app.use(express.json());

// Use the upload routes
app.use("/api", uploadRoutes); // This will prefix all routes in uploadRoutes with /api

// Simple route for health check
app.get("/ping", (req, res) => {
  res.json({ message: "Pong!" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
