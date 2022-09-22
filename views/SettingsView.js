import React from "react";
import { myTheme } from "../components/Theme";
import { StyleSheet, View } from "react-native";
import { ThemeProvider } from "@rneui/themed";

const SettingsView = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <View></View>
    </ThemeProvider>
  );
};

export default SettingsView;

const styles = StyleSheet.create({});
