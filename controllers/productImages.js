const Image = require("../models/ImageModel"); // Assuming the Mongoose model is in this file
const connectToDatabase = require("../lib/mongodb");

// Get single product images
async function getSingleProductImages(request, response) {
  await connectToDatabase();
  const { id } = request.params;

  try {
    // Find images by productID
    const images = await Image.find({ productID: id });

    if (!images || images.length === 0) {
      return response.status(404).json({ error: "Images not found" });
    }

    return response.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    return response.status(500).json({ error: "Error fetching images" });
  }
}

// Create a new image
async function createImage(request, response) {
  await connectToDatabase();
  const { productID, image } = request.body;

  try {
    const newImage = new Image({
      productID,
      image,
    });

    const savedImage = await newImage.save();
    return response.status(201).json(savedImage);
  } catch (error) {
    console.error("Error creating image:", error);
    return response.status(500).json({ error: "Error creating image" });
  }
}

// Update an existing image
async function updateImage(request, response) {
  await connectToDatabase();
  const { id } = request.params; // Assuming this is the productID
  const { productID, image } = request.body;

  try {
    // Find the image by productID
    const existingImage = await Image.findOne({ productID: id });

    if (!existingImage) {
      return response
        .status(404)
        .json({ error: "Image not found for the provided productID" });
    }

    // Update the existing image
    existingImage.productID = productID;
    existingImage.image = image;

    const updatedImage = await existingImage.save();
    return response.json(updatedImage);
  } catch (error) {
    console.error("Error updating image:", error);
    return response.status(500).json({ error: "Error updating image" });
  }
}

// Delete an image by productID
async function deleteImage(request, response) {
  await connectToDatabase();
  const { id } = request.params; // Assuming this is the productID

  try {
    // Delete images with the specified productID
    await Image.deleteMany({ productID: id });
    return response.status(204).send();
  } catch (error) {
    console.error("Error deleting image:", error);
    return response.status(500).json({ error: "Error deleting image" });
  }
}

module.exports = {
  getSingleProductImages,
  createImage,
  updateImage,
  deleteImage,
};
