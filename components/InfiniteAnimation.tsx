import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";

export default function InfiniteAnimation() {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.loop(
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000, // Speed of animation
          useNativeDriver: true,
        })
      ).start();
  }, []);

  // **Define the infinity path (∞)**
  const leftCircleX = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-15, 0, -15], // Moves left and center
  });

  const leftCircleY = animation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -10, 0, 10, 0], // Moves in an ellipse
  });

  const rightCircleX = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [15, 0, 15], // Moves right and center
  });

  const rightCircleY = animation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 10, 0, -10, 0], // Moves in an ellipse (opposite)
  });

  return (
    <View style={styles.container}>
      {/* Left part of ∞ */}
      <Animated.View style={[styles.circle, { transform: [{ translateX: leftCircleX }, { translateY: leftCircleY }] }]} />
      {/* Right part of ∞ */}
      <Animated.View style={[styles.circle, { transform: [{ translateX: rightCircleX }, { translateY: rightCircleY }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
    position: "absolute",
  },
});
