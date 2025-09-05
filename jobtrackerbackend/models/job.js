const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    type: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
