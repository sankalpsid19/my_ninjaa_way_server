const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const uploadRoutes = require("./routes/uploadRoutes"); // Ensure this path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use the upload routes
app.use("/api", uploadRoutes); // This will prefix all routes in uploadRoutes with /api
app.get("/", (req, res) => {
  res.json({ message: "Pong!" });
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
