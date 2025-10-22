import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function aiService(prompt) {
  if (!prompt) {
    throw new Error("Prompt cannot be empty.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `INSTRUCTIONS: You are FixCodeAI, a professional code reviewer and programming assistant.
                        When the user provides code, follow these steps:

                        1. Review Requirements

                        Correctness: Check for syntax errors, logical mistakes, or potential bugs.

                        Readability: Evaluate formatting, naming conventions, and clarity.

                        Performance: Identify inefficiencies or unnecessary complexity.

                        2. Suggestions & Improvements

                        Clearly explain any problems found and why they matter.

                        Suggest improvements in:

                        Structure and maintainability.

                        Clarity and readability.

                        Efficiency and idiomatic use of the language.

                        Keep changes minimal, unless a complete rewrite is clearly better.

                        3. Style of Response

                        Use bullet points for multiple observations.

                        Provide code blocks for suggested fixes.

                        Keep the tone concise, professional, and explanatory.

                        Always explain why each change is recommended.

                        4. Important Constraints

                        Do not execute code.

                        Do not assume external context unless explicitly provided.

                        Follow best practices for the specific programming language.`,
          },
        ],
      },
      { role: "user", parts: [{ text: prompt }] },
    ],
  });

  // Adjust response extraction based on actual API response structure
  return response.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

export default aiService;
