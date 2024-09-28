const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Replace with your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Replace with your Cloudinary API secret
});

// Configure Multer-Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Optional folder where images will be stored in Cloudinary
    allowedFormats: ["jpg", "png", "jpeg"], // Allowed file formats
  },
});

// Initialize Multer with Cloudinary storage
const upload = multer({ storage });

// Route to handle file upload
async function uploadMainImage(req, res) {
  try {
    // If no file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // File is successfully uploaded to Cloudinary
    const imageUrl = req.file.path; // URL of the uploaded image in Cloudinary
    return res
      .status(200)
      .json({ message: "File uploaded successfully", imageUrl });
  } catch (error) {
    return res.status(500).json({ error: "Error uploading file" });
  }
}

module.exports = { uploadMainImage, upload };
