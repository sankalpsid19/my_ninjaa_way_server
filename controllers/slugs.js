const connectToDatabase = require("../lib/mongodb");
const ProductModel = require("../models/ProductModel"); // Adjust the path to your ProductModel model

async function getProductBySlug(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  const { slug } = request.params;

  try {
    // Find the product by its slug and populate the category field
    const product = await ProductModel.findOne({ slug }).populate("category");

    if (!product) {
      return response.status(404).json({ error: "Product not found" });
    }

    return response.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return response
      .status(500)
      .json({ error: "Error fetching product by slug" });
  }
}

module.exports = { getProductBySlug };
