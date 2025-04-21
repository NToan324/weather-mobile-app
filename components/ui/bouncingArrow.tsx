import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { ChevronDoubleDownIcon } from "react-native-heroicons/outline";

const BouncingArrows = () => {
  const animations = [useRef(new Animated.Value(0)).current];

  useEffect(() => {
    animations.forEach((anim, index) => {
      const loopAnimation = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };
      setTimeout(loopAnimation, index * 200); // Delay mỗi mũi tên
    });
  }, []);

  const getArrowStyle = (anim: Animated.Value) => ({
    opacity: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 8], // Di chuyển nhẹ xuống
        }),
      },
    ],
  });

  return (
    <View style={styles.container}>
      {animations.map((anim, idx) => (
        <Animated.Text key={idx} style={[styles.arrow, getArrowStyle(anim)]}>
          <ChevronDoubleDownIcon color={"white"} />
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 40,
  },
  arrow: {
    fontSize: 32,
    color: "#333",
  },
});

export default BouncingArrows;
