import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";
import { onBoardingData } from "@/configs/constans";
import { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const useOnboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(
      contentOffsetX / event.nativeEvent.layoutMeasurement.width
    );
    setActiveIndex(currentIndex);
  };

  const handleSkip = async () => {
    const nextIndex = activeIndex + 1;

    if (nextIndex < onBoardingData.length) {
      scrollViewRef.current?.scrollTo({
        x: Dimensions.get("window").width * nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    } else {
      await AsyncStorage.setItem("onboarding", "true");
      router.push("/(routes)/home");
    }
  };
  return {
    handleScroll,
    handleSkip,
    activeIndex,
    scrollViewRef,
    onBoardingData,
  };
};

export default useOnboarding;
