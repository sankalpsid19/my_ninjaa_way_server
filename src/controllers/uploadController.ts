// src/controllers/uploadController.js
import cloudinary from "../config/cloudinaryConfig";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Set up Cloudinary storage for PDFs
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pdfs", // Specify the folder in Cloudinary
    allowedFormats: ["pdf"], // Allow only PDF uploads
  } as any, // Assert 'params' as any to bypass the TypeScript check
});

const upload = multer({ storage });

// Function to handle PDF uploads
const uploadPdf = (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Return the file URL
  res.status(200).json({
    url: req.file.path, // URL of the uploaded PDF in Cloudinary
  });
};

// Function to retrieve PDFs
const fetchPdfs = async (req: any, res: any) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "pdfs", // The folder you used for uploading PDFs
      resource_type: "raw", // Use 'raw' for non-image files
    });

    const pdfs = result.resources.map((resource: any) => ({
      url: resource.secure_url, // Get the secure URL of the PDF
    }));

    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).send("Error fetching PDFs.");
  }
};

// Export the upload middleware
const uploadMiddleware = upload.single("file");

// Exporting functions and middleware
export { uploadPdf, fetchPdfs, uploadMiddleware };
