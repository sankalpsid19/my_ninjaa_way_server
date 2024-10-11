const express = require("express");

const router = express.Router();

const { loginFunction } = require("../controllers/login");

router.route("/").post(loginFunction);

module.exports = router;
