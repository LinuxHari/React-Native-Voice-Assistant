import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  InteractionManager,
} from "react-native";
import ControlSection from "@/components/ControlSection";
import { useEffect, useRef } from "react";
import { Message } from "@/hooks/useAssistantUtils";
import styles from "@/styles/BodyStyle";

type BodySectionProps = {
  isRecording: boolean;
  messages: Message[];
  loading: boolean;
  text: string;
  AISpeaking: boolean;
  sendAgain: () => void;
  stopRecording: VoidFunction;
  startRecording: VoidFunction;
  speakText: (text: string) => void;
  stopSpeaking: VoidFunction;
  cancelRecording: VoidFunction;
};

const BodySection = ({
  isRecording,
  messages,
  loading,
  text,
  AISpeaking,
  sendAgain,
  stopRecording,
  startRecording,
  speakText,
  stopSpeaking,
  cancelRecording,
}: BodySectionProps) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      InteractionManager.runAfterInteractions(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      });
    }
  }, [messages]);

  return (
    <>
      <View style={styles.chatSection}>
        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          ref={flatListRef}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBox,
                item.type === "user"
                  ? styles.userMessage
                  : styles.assistantMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          )}
          contentContainerStyle={styles.chatContainer}
        />
      </View>

      <ControlSection
        text={text}
        startRecording={startRecording}
        stopRecording={stopRecording}
        sendAgain={sendAgain}
        speakText={speakText}
        isRecording={isRecording}
        loading={loading}
      />
      {AISpeaking && (
        <TouchableOpacity style={styles.stopButton} onPress={stopSpeaking}>
          <Text style={styles.stopButtonText}>Stop</Text>
        </TouchableOpacity>
      )}

      {isRecording && (
        <TouchableOpacity style={styles.stopButton} onPress={cancelRecording}>
          <Text style={styles.stopButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default BodySection;
