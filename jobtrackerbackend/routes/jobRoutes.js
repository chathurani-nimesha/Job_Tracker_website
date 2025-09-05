const express = require("express");
const { getJobs, createJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getJobs);
router.post("/", protect, createJob);

module.exports = router;
