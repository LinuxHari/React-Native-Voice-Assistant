import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { scale } from "react-native-size-matters";

import AntDesign from "@expo/vector-icons/AntDesign";

import { styles } from "@/styles/OnboardingStyle";
import useOnboarding from "@/hooks/useOnboardingUtils";
import { useFonts } from "expo-font";

export default function OnBoardingScreen() {
  const {
    handleScroll,
    handleSkip,
    activeIndex,
    scrollViewRef,
    onBoardingData,
  } = useOnboarding();

  let [fontsLoaded, fontError] = useFonts({
    SegoeUI: require("../assets/fonts/Segoe-UI.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#250152", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <Pressable style={styles.skipContainer} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
        <AntDesign name="arrowright" size={scale(18)} color="white" />
      </Pressable>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollViewRef}
      >
        {onBoardingData.map((item: onBoardingDataType, index: number) => (
          <View key={index} style={styles.slide}>
            {item.image}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {onBoardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                opacity: activeIndex === index ? 1 : 0.3,
              },
            ]}
          />
        ))}
      </View>
    </LinearGradient>
  );
}
