import { useState } from "react";
import useAssistantUtils from "./useAssistantUtils";

const useTranslatorUtils = () => {
  const {
    isRecording,
    messages,
    sendToGemini,
    loading,
    text,
    stopRecording,
    startRecording,
    speakText,
    AISpeaking,
    stopSpeaking,
    cancelRecording,
  } = useAssistantUtils();
  const languages = [
    "Tamil",
    "English",
    "Spanish",
    "Russian",
    "French",
    "German",
    "Chinese",
  ];
  const [sourceLang, setSourceLang] = useState("Tamil");
  const [targetLang, setTargetLang] = useState("English");

  const handleSourceLang = (lang: string) => {
    setSourceLang(lang)
    if(lang === targetLang){
      const index = languages.indexOf(lang) + 1 < languages.length? languages.indexOf(lang) + 1: 0
      setTargetLang(languages[index])
    }
  }

  return {
    isRecording,
    messages,
    sendToGemini,
    loading,
    text,
    stopRecording: () => stopRecording(sourceLang, targetLang),
    startRecording,
    speakText,
    sourceLang,
    targetLang,
    setSourceLang: handleSourceLang,
    setTargetLang,
    AISpeaking,
    stopSpeaking,
    cancelRecording,
    languages
  };
};

export default useTranslatorUtils;
