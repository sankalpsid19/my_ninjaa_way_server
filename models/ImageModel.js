const mongoose = require("mongoose");

// Define the schema
const imageSchema = new mongoose.Schema({
  imageID: {
    type: String,
    default: () => new mongoose.Types.ObjectId(), // Generate a unique ID similar to uuid()
  },
  productID: {
    type: String,
    required: true, // Assuming productID should be provided
  },
  image: {
    type: String,
    required: true, // Assuming the image (URL or path) should be provided
  },
});

// Create the model
const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
