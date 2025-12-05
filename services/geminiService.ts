import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeFoodImage(base64Image: string): Promise<AnalysisResult> {
  // Strip prefix if present (e.g., "data:image/jpeg;base64,")
  const data = base64Image.split(',')[1] || base64Image;

  const model = "gemini-2.5-flash"; // Using Flash for speed/multimodal capabilities
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: data
            }
          },
          {
            text: `Analyze this food or drink item. 
            1. Identify the item name (keep it short, e.g., "Spicy Tuna Roll").
            2. Determine if it looks "Industrial" (mass-produced, packaged) or "Local/Wild" (homemade, foraged, artisanal).
            3. Estimate its scent/flavor profile on 0-100 scales:
               - intensity: (Quiet -> Loud)
               - warmth: (Cold/Fresh -> Warm/Spicy)
               - texture: (Round/Creamy -> Sharp/Acidic/Spiky)
               - sweetness: (Dry -> Sweet)
            4. Write a short, poetic tasting note (max 150 chars) describing the sensory experience.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING },
            provenance: { type: Type.STRING, enum: ["Industrial", "Local/Wild"] },
            scentProfile: {
              type: Type.OBJECT,
              properties: {
                intensity: { type: Type.NUMBER },
                warmth: { type: Type.NUMBER },
                texture: { type: Type.NUMBER },
                sweetness: { type: Type.NUMBER }
              },
              required: ["intensity", "warmth", "texture", "sweetness"]
            },
            description: { type: Type.STRING }
          },
          required: ["label", "provenance", "scentProfile", "description"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");
    
    return JSON.parse(resultText) as AnalysisResult;

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    // Fallback if AI fails
    return {
      label: "Unknown Item",
      provenance: "Industrial",
      scentProfile: { intensity: 50, warmth: 50, texture: 50, sweetness: 50 },
      description: "Could not analyze image."
    };
  }
}
