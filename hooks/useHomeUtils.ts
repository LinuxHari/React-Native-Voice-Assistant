import { getAnswerFromGemini, getTextFromAudio } from "@/services/geminiService";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import * as Speech from "expo-speech";

const useHomeUtils = () => {
    const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording>();
  const [AIResponse, setAIResponse] = useState(false);
  const [AISpeaking, setAISpeaking] = useState(false);
  const lottieRef = useRef<LottieView>(null);
  const MIME_TYPES = {
    m4a: "audio/m4a",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    webm: "audio/webm",
    ogg: "audio/ogg",
    aac: "audio/aac",
  };

  // get microphone permission
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

  const startRecording = async () => {
    const hasPermission = await getMicrophonePermission();
    if (!hasPermission) return;
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      setIsRecording(true);
      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);
    } catch (error) {
      Alert.alert("Error", "Failed to start recording");
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setLoading(true);
      await recording?.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording?.getURI();
      const fileExtension = uri?.split(".").pop()?.toLowerCase();
      const mimeType =
        MIME_TYPES[fileExtension as keyof typeof MIME_TYPES] || MIME_TYPES.webm;

      // send audio to whisper API for transcription
      const { transcript, success } = await sendAudioToGemini(uri!, mimeType);

      if (!success) {
        setText(transcript);
        speakText(transcript);
        return setLoading(false);
      }

      setText(transcript);

      // send the transcript to gpt-4 API for response
      await sendToGemini(transcript);
    } catch (error) {
      Alert.alert("Error", "Failed to stop recording");
    }
  };

  const sendAudioToGemini = async (uri: string, mimeType: string) => {
    try {
      const text = await getTextFromAudio(uri, mimeType);
      if (!text || text.toLowerCase().includes("something went wrong"))
        throw "invalid text";
      return { success: true, transcript: text };
    } catch (error) {
      return { success: false, transcript: "Something went wrong, try again." };
    }
  };

  // send text to gpt4 API
  const sendToGemini = async (text: string) => {
    try {
      const { success, data } = await getAnswerFromGemini(text);
      if (!data || !success) throw new Error("Failed");
      setText(data);
      setAIResponse(true);
      await speakText(data);
      return data;
    } catch (error) {
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
      onDone: () => {
        setAISpeaking(false);
      },
    };
    Speech.speak(text, options);
  };

  useEffect(() => {
    if (AISpeaking) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.reset();
    }
  }, [AISpeaking]);
  return {text, isRecording, loading, AIResponse, setLoading, setAIResponse, sendAudioToGemini, sendToGemini, startRecording, setIsRecording, setRecording, setText, lottieRef, stopRecording, speakText}
}

export default useHomeUtils