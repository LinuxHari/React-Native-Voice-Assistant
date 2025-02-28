import { StatusBar, View } from "react-native";;
import useAssistantUtils from "@/hooks/useAssistantUtils";
import styles from "@/styles/AssistantStyle";
import BodySection from "@/components/BodySection";
import HeaderSection from "@/components/HeaderSection";
import BackButton from "@/components/BackButton";

export default function HomeScreen() {
  const {
    isRecording,
    loading,
    text,
    stopRecording,
    speakText,
    sendAgain,
    startRecording,
    messages,
    stopSpeaking,
    AISpeaking,
    cancelRecording,
  } = useAssistantUtils();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />

      <BackButton />

      <HeaderSection
        title="Hi, I am Arivu."
        description="Your Personal AI Assistant."
      />

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
}
