import React from "react";
import { Text, Button, ThemeProvider, useTheme } from "@rneui/themed";
import { View, StyleSheet, Image } from "react-native";
import { useNavigate } from "react-router-native";
import { myTheme } from "../components/Theme";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { SlideOutLeft, SlideInLeft } from "react-native-reanimated";

const SignUpInfo = () => {
  const { theme } = useTheme();
  let navigate = useNavigate();

  return (
    <ThemeProvider theme={myTheme}>
      <View
        style={[
          styles.cointeiner,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Animated.View
          entering={SlideInLeft.duration(250)}
          exiting={SlideOutLeft.duration(250)}
        >
          <View style={styles.cointeinerLogo}>
            {theme.mode === "dark" ? (
              <Image
                resizeMode='center'
                style={styles.logo}
                source={require("../pictures/logo_2_dark.png")}
              />
            ) : (
              <Image
                resizeMode='center'
                style={styles.logo}
                source={require("../pictures/logo_2.png")}
              />
            )}
          </View>
          <Text style={styles.h1}>Congratulations!</Text>
          <Text style={[styles.h2, { color: theme.colors.black }]}>
            Your account has been successfully created. Please check your
            mailbox, you are going to receive an email with activation link
          </Text>
          <Button
            title='OK'
            buttonStyle={styles.button}
            onPress={() => {
              navigate({ pathname: "/" }, { replace: true });
            }}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: theme.colors.gradient,
              end: { x: 0, y: 1.5 },
            }}
            titleStyle={{ fontWeight: "700", letterSpacing: 1 }}
          />
        </Animated.View>
      </View>
    </ThemeProvider>
  );
};

export default SignUpInfo;

const styles = StyleSheet.create({
  cointeiner: { flex: 1, paddingHorizontal: 35 },
  cointeinerLogo: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: { width: 140, marginLeft: 5 },
  h1: {
    marginLeft: 10,
    marginTop: "30%",
    fontSize: 24,
    fontWeight: "700",
    color: myTheme.lightColors.success,
  },
  h2: {
    marginLeft: 10,
    fontSize: 16,
    color: "#616161",
    letterSpacing: 0.5,
    marginTop: 25,
    fontWeight: "bold",
  },
  button: {
    marginHorizontal: "15%",
    borderRadius: 30,
    height: 50,
    marginTop: 55,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
