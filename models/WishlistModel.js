const mongoose = require("mongoose");

// Define the schema
const wishlistSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(), // Equivalent to uuid()
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
    ref: "Product",
    required: true, // Assuming the product is required in the wishlist
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: true, // Assuming the user is required in the wishlist
  },
});

// Create the model
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
