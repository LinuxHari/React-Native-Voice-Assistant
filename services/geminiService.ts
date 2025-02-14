import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from "expo-file-system";

interface ApiResult {
  success: boolean;
  data: string | null;
  msg?: string;
}

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_API_KEY as string);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a voice assistant named Arivu. Always give responses within 5 seconds.",
  generationConfig: {
    maxOutputTokens: 500,
    temperature: 0.2,
    topK: 40,
    topP: 0.8,
  },
});

export const getTextFromAudio = async (uri: string, mimeType: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const result = await model.generateContent([
      {
        inlineData: { mimeType, data: base64 },
      },
      {
        text: "Generate a transcript of the speech. If you cannot transcribe, just respond with 'Something went wrong'.",
      },
    ]);

    const transcript = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    return transcript || "Something went wrong";
  } catch (error) {
    return "Something went wrong";
  }
};

export const getAnswerFromGemini = async (prompt: string): Promise<ApiResult> => {
  try {
    const result = await model.generateContent(prompt);

    const answer = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!answer) return { success: false, data: null, msg: "No response from AI" };

    return { success: true, data: answer.trim() };
  } catch (error) {
    return { success: false, data: null, msg: "API request failed" };
  }
};
