const express = require("express");
const { generateCoverLetter } = require("../controllers/coverLetterController");
const router = express.Router();

router.post("/generate", generateCoverLetter);

module.exports = router;
