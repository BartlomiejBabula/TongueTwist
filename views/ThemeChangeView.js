import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
  Pressable,
} from "react-native";
import { Text, Icon, useTheme, useThemeMode } from "@rneui/themed";
import { setTheme } from "../components/Theme";
import { useNavigate } from "react-router-native";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";

const ThemeChangeView = () => {
  const { theme } = useTheme();
  let navigate = useNavigate();
  const { mode, setMode } = useThemeMode();

  useEffect(() => {
    const backAction = () => {
      navigate(-1);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const themeList = [
    {
      label: "light",
      title: "Light Theme",
      onPress: async () => {
        setTheme(setMode, "light");
      },
    },
    {
      label: "dark",
      title: "Dark Theme",
      onPress: async () => {
        setTheme(setMode, "dark");
      },
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Animated.View
        entering={SlideInLeft.duration(200)}
        exiting={SlideOutLeft.duration(150)}
      >
        <View style={styles.container}>
          <Icon
            size={26}
            underlayColor={"white"}
            type='material-community'
            name={"arrow-left"}
            onPress={() => {
              navigate(-1);
            }}
          />
          <Text style={styles.title}>Set theme</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          {themeList.map((l, i) => (
            <Pressable onPress={l.onPress}>
              <View
                key={i}
                style={{
                  height: 35,
                  flexDirection: "row",
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <Text style={styles.valueText}>{l.title}</Text>
                {l.label === theme.mode && (
                  <Icon
                    name='check'
                    type='material-community'
                    color={theme.colors.success}
                    size={28}
                    containerStyle={{ marginLeft: "20%" }}
                  />
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default ThemeChangeView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: "row",
    paddingTop: 60,
    paddingBottom: 35,
    alignItems: "center",
  },
  title: {
    marginLeft: "8%",
    fontWeight: "bold",
    fontSize: 22,
  },
  valueText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
