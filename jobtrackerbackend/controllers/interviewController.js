const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate Interview Questions
const generateQuestions = async (req, res) => {
  const { jobRole } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an interview coach." },
        { role: "user", content: `Generate 5 interview questions for a ${jobRole} position.` },
      ],
    });
    res.json({ questions: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Evaluate Answer
const evaluateAnswer = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an interview evaluator." },
        { role: "user", content: `Question: ${question}\nAnswer: ${answer}\nEvaluate clarity, confidence, and relevance.` },
      ],
    });
    res.json({ feedback: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateQuestions, evaluateAnswer };
