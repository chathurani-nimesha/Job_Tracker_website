const express = require("express");
const { generateQuestions, evaluateAnswer } = require("../controllers/interviewController");
const router = express.Router();

router.post("/questions", generateQuestions);
router.post("/feedback", evaluateAnswer);

module.exports = router;
