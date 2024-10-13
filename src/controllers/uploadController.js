const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pdfs",
    allowedFormats: ["pdf"],
  },
});

const upload = multer({ storage });

// Middleware to handle PDF uploads
const uploadMiddleware = upload.single("file");

// Function to handle PDF uploads
const uploadPdf = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  res.status(200).json({
    url: req.file.path,
  });
};

// Function to retrieve PDFs
const fetchPdfs = async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "pdfs",
      resource_type: "raw",
    });

    const pdfs = result.resources.map((resource) => ({
      url: resource.secure_url,
    }));

    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).send("Error fetching PDFs.");
  }
};

// Exporting functions and middleware
module.exports = {
  uploadMiddleware,
  uploadPdf,
  fetchPdfs,
};
