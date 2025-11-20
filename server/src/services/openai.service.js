import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const aiReview = async (code, language = "javascript") => {
  const system = `You are an expert software engineer and code reviewer. Be concise, clear and structured.`;
  const user = `Analyze the following ${language} code and respond with these labeled sections:

1) SHORT SUMMARY - What the code does.
2) BUGS/ISSUES - List problems, with line hints if possible.
3) TIME COMPLEXITY - Big-O + short reasoning.
4) SPACE COMPLEXITY - Big-O + short reasoning.
5) OPTIMIZATIONS - How to improve the code.
6) FIXED CODE - Corrected, production-ready version. Put it under the heading "### FIXED CODE".

CODE:
\`\`\`
${code}
\`\`\`
`;

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  // If your installed OpenAI client throws a "not a function" error, tell me the error text and I will adapt this call.
  const resp = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    max_tokens: 1600,
    temperature: 0.0,
  });

  const text = resp?.choices?.[0]?.message?.content ?? "No response from model.";
  return text;
};
