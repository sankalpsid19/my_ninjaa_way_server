const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(), // Equivalent to uuid() in MongoDB
  },
  email: {
    type: String,
    unique: true, // Ensure the email is unique
    required: true, // Assuming email is required
  },
  password: {
    type: String, // Optional password field
  },
  role: {
    type: String,
    default: "user", // Default role is 'user'
  },
  Wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId, // Refers to an array of Wishlist objects
      ref: "Wishlist",
    },
  ],
});

// Create the model
const User = mongoose.model("User", userSchema);

module.exports = User;
