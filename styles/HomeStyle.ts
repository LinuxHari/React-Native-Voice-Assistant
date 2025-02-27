import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#0D0A2C", 
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(13, 10, 44, 0.4)", 
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  assistantBox: {
    backgroundColor: "rgba(26, 20, 72, 0.5)", 
    padding: 20,
    borderRadius: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  botIcon: {
    width: 50,
    height: 40,
    marginRight: 15,
  },
  assistantTextBold: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  assistantText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    gap: 10,
  },
  button: {
    backgroundColor: "rgba(30, 27, 80, 0.5)", 
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    width: "47%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    height: 160
  },
  buttonText: {
    color: "#64FFDA",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonDescription: {
    color: "#A8B2D1",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  buttonImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default styles