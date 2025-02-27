import { getAnswerFromGemini, getTextFromAudio } from "@/services/geminiService";
import { Audio } from "expo-av";
import { useState } from "react";
import { Alert } from "react-native";
import * as Speech from "expo-speech";

export type Message = {
  type: "user" | "assistant";
  message: string;
  id: number;
};

const useAssistantUtils = () => {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [AIResponse, setAIResponse] = useState(false);
  const [AISpeaking, setAISpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{type: "assistant", id: 0, message: "Hello, how can I help you?"}]);

  const MIME_TYPES = {
    m4a: "audio/m4a",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    webm: "audio/webm",
    ogg: "audio/ogg",
    aac: "audio/aac",
  };

  const recordingOptions = {
    android: {
      extension: ".mp3",
      outputFormat: Audio.AndroidOutputFormat.MPEG_4,
      audioEncoder: Audio.AndroidAudioEncoder.AAC,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitrate: 128000,
    },
    ios: {
      extension: ".mp3",
      format: 1,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      audioQuality: Audio.IOSAudioQuality.HIGH,
    },
    web: {
      mimeType: "audio/webm",
      bitsPerSecond: 128000,
    },
  };

  const getMicrophonePermission = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Permission", "Please grant permission to access microphone");
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const startRecording = async () => {
    if (isRecording) {
      return;
    }

    const hasPermission = await getMicrophonePermission();
    if (!hasPermission) return;

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(recordingOptions);
      await newRecording.startAsync();

      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      Alert.alert("Error", "Failed to start recording");
    }
  };

  const stopRecording = async (srcLang?: string, targetLang?: string) => {
    if (!recording) {
      return;
    }

    try {
      setIsRecording(false);
      setLoading(true);

      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

      const uri = recording.getURI();
      setRecording(null);

      if (!uri) throw new Error("Recording URI is undefined");

      const fileExtension = uri.split(".").pop()?.toLowerCase();
      const mimeType = MIME_TYPES[fileExtension as keyof typeof MIME_TYPES] || MIME_TYPES.webm;

      const { transcript, success } = await sendAudioToGemini(uri, mimeType, srcLang,);

      if (!success) {
        setText(transcript);
        speakText(transcript);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "assistant", message: transcript, id: prevMessages.length },
        ]);
        return;
      }

      setText(transcript);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", message: transcript, id: prevMessages.length },
      ]);
      await sendToGemini(transcript, srcLang, targetLang);
    } catch (error) {
      Alert.alert("Error", "Failed to stop recording");
    } finally{
      setLoading(false);
    } 
  };

  const cancelRecording = async() => {
    if(recording){
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
    }
  }

  const sendAudioToGemini = async (uri: string, mimeType: string, srcLang?: string) => {
    try {
      const text = await getTextFromAudio(uri, mimeType, srcLang);
      if (!text || text.toLowerCase().includes("something went wrong")) {
        throw new Error("Invalid text");
      }
      if(text.toLowerCase().includes("detected language is different"))
        return {success: false, transcript: text}

      return { success: true, transcript: text };
    } catch (error) {
      return { success: false, transcript: "Something went wrong, try again." };
    }
  };

  const sendToGemini = async (text: string, srcLang?: string, targerLang?: string) => {
    try {
      const { success, data } = await getAnswerFromGemini(text, srcLang, targerLang);
      if (!success || !data) 
        throw new Error("Failed to get response");

      setText(data);
      setAIResponse(true);
      await speakText(data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "assistant", message: data, id: prevMessages.length },
      ]);
      return data;
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "assistant", message: "Something went wrong", id: prevMessages.length },
      ]);
      await speakText("Something went wrong, try again later.");
    } finally {
      setLoading(false);
    }
  };

  const speakText = async (text: string) => {
    setAISpeaking(true);
    const options = {
      voice: "com.apple.ttsbundle.Samantha-compact",
      language: "en-US",
      pitch: 1.5,
      rate: 1,
      onDone: () => setAISpeaking(false),
    };
    Speech.speak(text, options);
  };

  const stopSpeaking = () => {
    Speech.stop(),
    setAISpeaking(false)
  };

  return {
    text,
    isRecording,
    loading,
    AIResponse,
    setLoading,
    setAIResponse,
    sendAudioToGemini,
    sendToGemini,
    startRecording,
    stopRecording,
    speakText,
    stopSpeaking,
    cancelRecording,
    AISpeaking,
    messages,
  };
};

export default useAssistantUtils;
