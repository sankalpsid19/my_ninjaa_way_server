const express = require("express");
const router = express.Router();
const { uploadMainImageFile } = require("../controllers/mainImages");

router.route("/").post(uploadMainImageFile);

module.exports = router;
