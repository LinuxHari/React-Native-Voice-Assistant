import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        alignSelf: "flex-start",
        paddingVertical: scale(15),
        marginBottom: verticalScale(5),
      }}
    >
      <FontAwesome name="chevron-left" size={scale(20)} color="#fff" />
    </TouchableOpacity>
  );
};

export default BackButton;
