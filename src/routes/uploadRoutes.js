// src/routes/uploadRoutes.js
const express = require("express");
const {
  uploadMiddleware,
  uploadPdf,
  fetchPdfs,
} = require("../controllers/uploadController");

const router = express.Router();

// Route to upload a PDF
router.post("/upload", uploadMiddleware, uploadPdf);

// Route to retrieve PDFs
router.get("/pdfs", fetchPdfs);

module.exports = router;
