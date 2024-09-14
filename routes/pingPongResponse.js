const express = require("express");

const router = express.Router();

const { pingPongResponse } = require("../controllers/pingPongResponse");

router.route("/").get(pingPongResponse);

module.exports = router;
