const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const uploadRoutes = require("./routes/uploadRoutes"); // Use require for your upload routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use the upload routes
app.use("/api", uploadRoutes); // This allows you to access your upload and PDF routes under /api

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
