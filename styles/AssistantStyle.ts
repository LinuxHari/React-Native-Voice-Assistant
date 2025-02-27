import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0D0A2C",
    gap: verticalScale(20)
  },
});

export default styles