import React, { useEffect } from "react";
import { Image, View } from "react-native";
import Animated, {
  withRepeat,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Text, useTheme } from "@rneui/themed";

const LoadingView = () => {
  const { theme } = useTheme();
  const loadingOpacity = useSharedValue(0);
  const transformDeg = useSharedValue(0);

  const loadingStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${transformDeg.value}deg`,
        },
      ],
    };
  });
  const loadingStyle2 = useAnimatedStyle(() => {
    return {
      opacity: loadingOpacity.value,
    };
  });

  useEffect(() => {
    transformDeg.value = withRepeat(
      withTiming(360, {
        duration: 3000,
      }),
      -1,
      true
    );
    loadingOpacity.value = withRepeat(
      withTiming(0.8, {
        duration: 4000,
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
        backgroundColor: theme.colors.background,
      }}
    >
      <Animated.View style={loadingStyle}>
        {theme.mode === "dark" ? (
          <Image
            style={{ width: 80, height: 80 }}
            source={require("../pictures/logo_dark.png")}
          />
        ) : (
          <Image
            style={{ width: 80, height: 80 }}
            source={require("../pictures/logo.png")}
          />
        )}
      </Animated.View>
      <Animated.View style={loadingStyle2}>
        <Text
          style={{
            marginTop: "8%",
            textAlign: "center",
            fontSize: 20,
            letterSpacing: 0.5,
            fontWeight: "bold",
          }}
        >
          Loading...
        </Text>
      </Animated.View>
    </View>
  );
};

export default LoadingView;
