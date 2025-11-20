import { aiReview } from "../services/openai.service.js";
import { detectLanguage } from "../services/language.service.js";

export const analyzeCode = async (req, res) => {
  try {
    const { code, language } = req.body || {};
    if (!code) return res.status(400).json({ error: "code is required" });

    // --- AUTO-DETECT LANGUAGE FROM USER CODE ---
    const detected = detectLanguage(code); // "javascript", "cpp", "python", etc.

    // --- CHECK MISMATCH ---
    if (detected !== language) {
      return res.status(400).json({
        error: `Language mismatch detected. Your code looks like **${detected}**, but you selected **${language}**. Please choose the correct language.`,
      });
    }

    const output = await aiReview(code, language);
    return res.json({ output });

  } catch (err) {
    console.error("analyzeCode error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
