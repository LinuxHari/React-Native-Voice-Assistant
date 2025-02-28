import generateContext from "@/utils/generateContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from "expo-file-system";

interface ApiResult {
  success: boolean;
  data?: {
    user: string;
    assistant: string;
  };
}

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_API_KEY as string);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are a voice assistant named Arivu. Always give responses within 5 seconds.",
  generationConfig: {
    maxOutputTokens: 500,
    temperature: 0.2,
    topK: 40,
    topP: 0.8,
  },
});

export const getTextFromAudio = async (
  uri: string,
  mimeType: string,
  srcLang?: string,
  targetLang?: string
): Promise<ApiResult> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const context = generateContext(srcLang, targetLang);
    const result = await model.generateContent([
      {
        inlineData: { mimeType, data: base64 },
      },
      {
        text: context,
      },
    ]);

    const data = JSON.parse(
      result.response?.candidates?.[0]?.content?.parts?.[0].text?.slice(
        7,
        -4
      ) as string
    );
    return { success: true, data };
  } catch (error) {
    return { success: false };
  }
};
