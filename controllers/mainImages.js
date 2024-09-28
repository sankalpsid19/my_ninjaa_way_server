// /pages/api/upload.js
const { uploadMainImage, upload } = require("../lib/cloudinaryconfig");

const config = {
  api: {
    bodyParser: false, // Disable bodyParser to allow file upload
  },
};

async function uploadMainImageFile(req, res) {
  if (req.method === "POST") {
    // Use multer's upload middleware
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: "File upload error" });
      }
      uploadMainImage(req, res);
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

module.exports = {
  config,
  uploadMainImageFile,
};
