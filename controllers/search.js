const connectToDatabase = require("../lib/mongodb");
const ProductModel = require("../models/ProductModel"); // Adjust the path to your ProductModel model

async function searchProducts(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const { query } = request.query;
    if (!query) {
      return response
        .status(400)
        .json({ error: "Query parameter is required" });
    }

    // Using MongoDB's $regex to search for matching products by title or description
    const products = await ProductModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    return response.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    return response.status(500).json({ error: "Error searching products" });
  }
}

module.exports = { searchProducts };
