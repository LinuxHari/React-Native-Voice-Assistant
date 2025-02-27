import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    justifyContent: "space-between",
    backgroundColor: "#0D0A2C",
    gap: scale(20),
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 27, 80, 0.5)",
    borderRadius: scale(10),
    padding: scale(10),
  },
  picker: {
    flex: 1,
    color: "#fff",
  }
});

export default styles;
