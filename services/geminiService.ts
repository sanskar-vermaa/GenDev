import { GoogleGenAI, Type, Schema } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

const codeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    html: {
      type: Type.STRING,
      description: "The HTML structure of the application. Do not include <html>, <head>, or <body> tags, just the internal structure.",
    },
    css: {
      type: Type.STRING,
      description: "The CSS styles for the application.",
    },
    javascript: {
      type: Type.STRING,
      description: "The JavaScript logic for the application.",
    },
  },
  required: ["html", "css", "javascript"],
};

export const generateCodeFromPrompt = async (prompt: string): Promise<{ html: string; css: string; javascript: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a functional, interactive web application based on this request: "${prompt}". 
      
      Requirements:
      1. Make it look modern, clean, and professional.
      2. Ensure all interactivity works (buttons, forms, calculations).
      3. Return ONLY the raw code for HTML, CSS, and JS fields.
      4. Do not use external libraries (like React/Vue) in the output, use vanilla JS and CSS.
      5. Ensure the CSS makes the app responsive and centered.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: codeSchema,
        systemInstruction: "You are an expert Senior Frontend Engineer. You generate high-quality, bug-free, working web applications.",
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response received from Gemini.");
    }

    const parsedData = JSON.parse(responseText);
    return {
      html: parsedData.html,
      css: parsedData.css,
      javascript: parsedData.javascript,
    };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate code");
  }
};