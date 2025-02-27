import React from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import styles from "@/styles/HomeStyle"

const HomeScreen: React.FC = () => {
  const router = useRouter();

  return (
    <ImageBackground 
      source={require("../assets/images/bgTexture.png")} 
      style={styles.background}
      imageStyle={{tintColor: "blue", opacity: 0.7}}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.assistantBox}>
          <Image source={require("../assets/images/bot.png")} style={styles.botIcon} />
          <View>
            <Text style={styles.assistantTextBold}>Hi, I am Arivu.</Text>
            <Text style={styles.assistantText}>Your AI Personal Assistant</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push({ pathname: "/assistant" })}
          >
            <Image source={require("../assets/images/voice.png")} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Voice Assistant</Text>
            <Text style={styles.buttonDescription}>Interact with Arivu using your voice</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push({ pathname: "/translator" })}
          >
            <Image source={require("../assets/images/translator.png")} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Translator</Text>
            <Text style={styles.buttonDescription}>Translate languages instantly</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
