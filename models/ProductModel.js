const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(), // UUID equivalent in MongoDB
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    inStock: {
      type: Number,
      default: 1,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    customerOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomerOrderProduct",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist",
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
