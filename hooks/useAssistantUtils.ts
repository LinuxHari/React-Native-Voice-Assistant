import { getTextFromAudio } from "@/services/geminiService";
import { Audio } from "expo-av";
import { useState } from "react";
import { Alert } from "react-native";
import * as Speech from "expo-speech";
import getAudioExtension from "@/utils/getAudioExtension";

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
  const [messages, setMessages] = useState<Message[]>([
    { type: "assistant", id: 0, message: "Hello, how can I help you?" },
  ]);

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
        Alert.alert(
          "Permission",
          "Please grant permission to access microphone"
        );
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

      if (!uri) throw new Error("Recording URI is undefined");

      const mimeType = getAudioExtension(uri);

      const { data, success } = await sendAudioToGemini(
        uri,
        mimeType,
        srcLang,
        targetLang
      );

      if (!success || !data || !data?.user) {
        const text = data?.assistant || "Something went wrong.";
        setText(text);
        speakText(text);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "assistant", message: text, id: prevMessages.length },
        ]);
        return;
      }

      setText(data.assistant);
      setAIResponse(true);
      await speakText(data.assistant);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", message: data.user, id: prevMessages.length },
        {
          type: "assistant",
          message: data.assistant,
          id: prevMessages.length + 1,
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to stop recording");
    } finally {
      setLoading(false);
    }
  };

  const cancelRecording = async () => {
    if (recording) {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
    }
  };

  const sendAudioToGemini = async (
    uri: string,
    mimeType: string,
    srcLang?: string,
    targetLang?: string
  ) => {
    try {
      const { success, data } = await getTextFromAudio(
        uri,
        mimeType,
        srcLang,
        targetLang
      );
      if (
        !success ||
        !data ||
        data?.assistant.toLowerCase().includes("something went wrong")
      ) {
        throw new Error("Invalid text");
      }
      if (
        data.assistant.toLowerCase().includes("detected language is different")
      )
        return { success: false, data };

      if (
        data.assistant.toLowerCase().includes("could not understand the audio")
      )
        return {
          success: false,
          data: { assistant: data.assistant, user: null },
        };
      return { success: true, data };
    } catch (error) {
      return { success: false };
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
    Speech.stop(), setAISpeaking(false);
  };

  const sendAgain = async (srcLang?: string, targetLang?: string) => {
    try {
      setLoading(true);
      const prevRecording = recording?.getURI() as string;

      if (!prevRecording)
        return Alert.alert("Error", "No previous recordings!");

      const { data, success } = await sendAudioToGemini(
        prevRecording,
        getAudioExtension(prevRecording),
        srcLang,
        targetLang
      );

      if (!success || !data || !data?.user) {
        const text = data?.assistant || "Something went wrong.";
        setText(text);
        speakText(text);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "assistant", message: text, id: prevMessages.length },
        ]);
        return;
      }

      setText(data.assistant);
      setAIResponse(true);
      await speakText(data.assistant);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", message: data.user, id: prevMessages.length },
        {
          type: "assistant",
          message: data.assistant,
          id: prevMessages.length + 1,
        },
      ]);
    } catch (_) {
      Alert.alert("Error", "No previous recordings!");
    } finally {
      setLoading(false);
    }
  };

  return {
    text,
    isRecording,
    loading,
    AIResponse,
    setLoading,
    setAIResponse,
    sendAudioToGemini,
    sendAgain,
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
