const { OpenAI } = require("openai");
const multer = require("multer");
const fs = require("fs");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// File upload setup (Multer)
const upload = multer({ dest: "uploads/" });

// Analyze Resume
const analyzeResume = async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, "utf8"); // (works best with .txt; for PDF use pdf-parse)

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a resume analyzer." },
        { role: "user", content: `Analyze this resume and suggest improvements:\n\n${fileContent}` },
      ],
    });

    res.json({ feedback: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { analyzeResume, upload };
