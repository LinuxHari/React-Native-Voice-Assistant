import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
    assistantBox: {
        alignItems: "center",
        justifyContent: "center",
      },
      botIcon: {
        width: scale(70),
        height: scale(70),
        marginBottom: verticalScale(5),
      },
      assistantTextBold: {
        fontSize: scale(14),
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
      },
      assistantText: {
        fontSize: scale(12),
        color: "#aaa",
        textAlign: "center",
      },
})

export default styles;