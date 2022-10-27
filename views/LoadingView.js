import React, { useEffect } from "react";
import { Image, View, Text } from "react-native";
import Animated, {
  withRepeat,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const LoadingView = () => {
  const loadingOpacity = useSharedValue(0);

  const loadingStyle = useAnimatedStyle(() => {
    return {
      opacity: 1 - loadingOpacity.value,
    };
  });

  useEffect(() => {
    loadingOpacity.value = withRepeat(
      withTiming(1, {
        duration: 2000,
      }),
      -1,
      true
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        resizeMode='center'
        style={{ height: 90, width: 90 }}
        source={require("../pictures/logo.png")}
      />
      <Animated.View style={loadingStyle}>
        <Text
          style={{
            marginBottom: 5,
            textAlign: "center",
            fontSize: 20,
            letterSpacing: 0.5,
            fontWeight: "bold",
            color: "#AAA",
          }}
        >
          Loading...
        </Text>
      </Animated.View>
    </View>
  );
};

export default LoadingView;
