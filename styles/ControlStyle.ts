import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
    bottomContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingVertical: verticalScale(10),
      paddingHorizontal: 30,
      backgroundColor: "rgba(30, 27, 80, 0.5)",
      borderRadius: scale(15),
    },
    micContainer: {
      width: scale(50),
      height: scale(50),
      borderRadius: scale(25),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#4A00E0",
    }
  });

  export default styles