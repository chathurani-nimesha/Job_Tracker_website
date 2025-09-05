const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateCoverLetter = async (req, res) => {
  const { resumeSummary, jobDescription } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional cover letter writer." },
        {
          role: "user",
          content: `Write a personalized cover letter.\nResume Summary:\n${resumeSummary}\nJob Description:\n${jobDescription}`,
        },
      ],
    });
    res.json({ coverLetter: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateCoverLetter };
