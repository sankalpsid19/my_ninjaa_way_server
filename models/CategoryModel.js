const mongoose = require("mongoose");

// Define the schema
const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(), // Equivalent to uuid()
  },
  name: {
    type: String,
    unique: true, // Ensure the category name is unique
    required: true, // Assuming name is required
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to Product model
      ref: "Product",
    },
  ], // One-to-many relationship with products
});

// Create the model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
