// src/routes/uploadRoutes.js
const {
  uploadPdf,
  fetchPdfs,
  uploadMiddleware,
} = require("../controllers/uploadController");

const router = express.Router();

// Route to upload a PDF
router.post("/upload", uploadMiddleware, uploadPdf);

// Route to retrieve PDFs
router.get("/pdfs", fetchPdfs);

export default router
