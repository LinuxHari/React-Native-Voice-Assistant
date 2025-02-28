import Regenerate from "@/assets/svgs/regenerate";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";
import InfiniteAnimation from "./InfiniteAnimation";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Reload from "@/assets/svgs/reload";
import styles from "@/styles/ControlStyle";

type ControlSectionProps = {
  isRecording: boolean;
  loading: boolean;
  stopRecording: VoidFunction;
  startRecording: VoidFunction;
  sendAgain: () => void;
  speakText: (text: string) => void;
  text: string;
};

const ControlSection = ({
  sendAgain,
  isRecording,
  loading,
  speakText,
  startRecording,
  stopRecording,
  text,
}: ControlSectionProps) => {
  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity
        onPress={sendAgain}
        disabled={isRecording || loading}
      >
        <Regenerate width={scale(20)} height={scale(20)} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.micContainer}
        onPress={() => (isRecording ? stopRecording() : startRecording())}
        disabled={loading}
      >
        {loading ? (
          <InfiniteAnimation />
        ) : (
          <FontAwesome
            name={isRecording ? "stop" : "microphone"}
            size={scale(25)}
            color="#fff"
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => speakText(text)}
        disabled={isRecording || loading}
      >
        <Reload width={scale(20)} height={scale(20)} />
      </TouchableOpacity>
    </View>
  );
};

export default ControlSection;
