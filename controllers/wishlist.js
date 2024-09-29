const connectToDatabase = require("../lib/mongodb");
const WishlistModel = require("../models/WishlistModel"); // Adjust the path to your WishlistModel model

async function getAllWishlist(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const wishlist = await WishlistModel.find({}).populate("product");
    return response.json(wishlist);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching wishlist" });
  }
}

async function getAllWishlistByUserId(request, response) {
  await connectToDatabase(); // Connect to MongoDB
  const { userId } = request.params;

  try {
    const wishlist = await WishlistModel.find({ userId }).populate("product");
    return response.json(wishlist);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching wishlist" });
  }
}

async function createWishItem(request, response) {
  await connectToDatabase(); // Connect to MongoDB
  try {
    const { userId, productId } = request.body;
    const wishItem = new WishlistModel({
      userId,
      productId,
    });

    await wishItem.save();
    return response.status(201).json(wishItem);
  } catch (error) {
    console.error("Error creating wish item:", error);
    return response.status(500).json({ error: "Error creating wish item" });
  }
}

async function deleteWishItem(request, response) {
  await connectToDatabase(); // Connect to MongoDB
  const { userId, productId } = request.params;

  try {
    await WishlistModel.deleteMany({ userId, productId });
    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting wish item" });
  }
}

async function getSingleProductFromWishlist(request, response) {
  await connectToDatabase(); // Connect to MongoDB
  const { userId, productId } = request.params;

  try {
    const wishItem = await WishlistModel.findOne({ userId, productId });
    return response.status(200).json(wishItem);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error getting wish item" });
  }
}

async function deleteAllWishItemByUserId(request, response) {
  await connectToDatabase(); // Connect to MongoDB
  const { userId } = request.params;

  try {
    await WishlistModel.deleteMany({ userId });
    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting wish items" });
  }
}

module.exports = {
  getAllWishlistByUserId,
  getAllWishlist,
  createWishItem,
  deleteWishItem,
  getSingleProductFromWishlist,
  deleteAllWishItemByUserId,
};
