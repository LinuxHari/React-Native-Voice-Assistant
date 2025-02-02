import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from 'expo-file-system';

interface ApiResult {
  success: boolean;
  data: string | null;
  msg?: string;
}

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_API_KEY as string);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a voice assistant named Arivu. Do not send in text in markdown format.",
});

export const getTextFromAudio = async(uri: string, mimeType: string) => {
  const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: mimeType,
        data: base64
      }
    },
    { text: "Generate a transcript of the speech, if you cannot transcribe just respond something went wrong as text" },
  ]);

  return result.response.candidates?.[0].content.parts[0].text
}

export const getAnswerFromGemini = async (
  prompt: string
): Promise<ApiResult> => {
  const result = await model.generateContent(prompt);
  const answer = result.response.candidates?.[0].content.parts[0].text;
  if (!answer)
    return { success: false, data: null };
  return { success: true, data: answer };
};
