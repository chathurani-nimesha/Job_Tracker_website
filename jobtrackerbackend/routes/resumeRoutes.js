const express = require("express");
const { analyzeResume, upload } = require("../controllers/resumeController");
const router = express.Router();

router.post("/analyze", upload.single("resume"), analyzeResume);

module.exports = router;
