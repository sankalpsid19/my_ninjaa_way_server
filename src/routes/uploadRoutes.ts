// src/routes/uploadRoutes.js
import express from "express";
import {
  uploadPdf,
  fetchPdfs,
  uploadMiddleware,
} from "../controllers/uploadController";

const router = express.Router();

// Route to upload a PDF
router.post("/upload", uploadMiddleware, uploadPdf);

// Route to retrieve PDFs
router.get("/pdfs", fetchPdfs);

export default router;
