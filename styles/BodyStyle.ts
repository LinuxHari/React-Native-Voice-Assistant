import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  chatSection: {
    flex: 1,
    width: "100%",
    borderRadius: scale(10),
    overflow: "hidden",
    backgroundColor: "rgba(30, 27, 80, 0.5)",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
  },
  messageBox: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(12),
    marginVertical: verticalScale(3),
    maxWidth: "85%",
  },
  userMessage: {
    backgroundColor: "#6200EE",
    alignSelf: "flex-end",
    borderTopRightRadius: scale(12),
    borderTopLeftRadius: scale(8),
    borderBottomRightRadius: scale(4),
    borderBottomLeftRadius: scale(12),
  },
  assistantMessage: {
    backgroundColor: "#3A2A6A",
    alignSelf: "flex-start",
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(8),
    borderBottomLeftRadius: scale(4),
    borderBottomRightRadius: scale(12),
  },
  messageText: {
    color: "#fff",
    fontSize: scale(14),
  },
  gap: {
    height: verticalScale(20),
  },
  stopButton: {
    marginTop: verticalScale(10),
    width: "30%",
    paddingVertical: verticalScale(5),
    borderRadius: scale(20),
    backgroundColor: "#E0004D",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 32,
    right: 25,
  },
  stopButtonText: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#fff",
  },
});

export default styles