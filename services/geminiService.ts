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
  srcLang?: string
) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const context = srcLang
      ? `First, detect the spoken language. If the language is ${srcLang}, transcribe it. If not, respond with "The detected language is different from ${srcLang}. Please try again with the correct language. Do not respond if any question is asked just transcribe it."`
      : "Generate a transcript of the speech. If you cannot transcribe, just respond with 'Something went wrong'."

    const result = await model.generateContent([
      {
        inlineData: { mimeType, data: base64 },
      },
      {
        text: context
      },
    ]);

    const transcript =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    console.log(transcript, "audio response")
    return transcript || "Something went wrong";
  } catch (error) {
    return "Something went wrong";
  }
};

export const getAnswerFromGemini = async (
  prompt: string,
  srcLang?: string,
  targetLang?: string
): Promise<ApiResult> => {
  const userPrompt =
    targetLang && srcLang
      ? `Translate the sentence ${prompt} from ${srcLang} to ${targetLang}, only give reply with letters of the ${targetLang} language, no need for ${srcLang} letters. `
      : prompt;
  try {
    const result = await model.generateContent(userPrompt);

    const answer = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!answer)
      return { success: false, data: null, msg: "No response from AI" };

    console.log(answer, "text response")
    return { success: true, data: answer.trim() };
  } catch (error) {
    return { success: false, data: null, msg: "API request failed" };
  }
};
