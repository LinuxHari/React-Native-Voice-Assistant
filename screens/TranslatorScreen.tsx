import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useTranslatorUtils from "@/hooks/useTranslatorUtils";
import styles from "@/styles/TranslatorStyle";
import BodySection from "@/components/BodySection";
import HeaderSection from "@/components/HeaderSection";
import BackButton from "@/components/BackButton";
import { useMemo } from "react";

const TranslatorScreen: React.FC = () => {
  const {
    isRecording,
    messages,
    sendAgain,
    loading,
    text,
    stopRecording,
    startRecording,
    speakText,
    sourceLang,
    targetLang,
    setSourceLang,
    setTargetLang,
    AISpeaking,
    stopSpeaking,
    cancelRecording,
    languages
  } = useTranslatorUtils();

  return (
    <View style={styles.container}>
      <BackButton />

      <HeaderSection
        title="Hi, I am Arivu."
        description="AI Language Translator."
      />

      <View style={styles.languageContainer}>
        <Picker
          selectedValue={sourceLang}
          style={styles.picker}
          onValueChange={(itemValue) => setSourceLang(itemValue)}
          dropdownIconColor="#fff"
        >
          {languages.map((lang) => (
            <Picker.Item key={lang} label={lang} value={lang} />
          ))}
        </Picker>
        <Picker
          selectedValue={targetLang}
          style={styles.picker}
          onValueChange={(itemValue) => setTargetLang(itemValue)}
          dropdownIconColor="#fff"
        >
          {languages
            .filter((lang) => lang !== sourceLang)
            .map((lang) => (
              <Picker.Item key={lang} label={lang} value={lang} />
            ))}
        </Picker>
      </View>

      <BodySection
        isRecording={isRecording}
        messages={messages}
        loading={loading}
        text={text}
        AISpeaking={AISpeaking}
        sendAgain={sendAgain}
        stopRecording={stopRecording}
        startRecording={startRecording}
        speakText={speakText}
        stopSpeaking={stopSpeaking}
        cancelRecording={cancelRecording}
      />
    </View>
  );
};

export default TranslatorScreen;
