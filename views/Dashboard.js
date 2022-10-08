import React, { useState } from "react";
import { Route, Routes } from "react-router-native";
import MyWords from "./MyWords";
import AddWordView from "./AddWordView";
import SettingsView from "./SettingsView";
import { StyleSheet, View } from "react-native";
import { Icon, ThemeProvider, Text } from "@rneui/themed";
import { myTheme } from "../components/Theme";
import { useNavigate } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";

const Dashboard = () => {
  let navigate = useNavigate();
  const [buttonList, setButtonList] = useState([
    { icon: "pencil", label: "Add word", clicked: false },
    { icon: "book-open", label: "My word", clicked: true },
    { icon: "account", label: "Settings", clicked: false },
  ]);

  const handleTabChange = (type) => {
    buttonList.map((button) => {
      button.label === type.label
        ? (button.clicked = true)
        : (button.clicked = false);
    });
    switch (type.label) {
      case "Add word":
        return navigate({ pathname: "/addword" }, { replace: true });
      case "Settings":
        return navigate({ pathname: "/settings" }, { replace: true });
      case "My word":
        return navigate({ pathname: "/" }, { replace: true });
      default:
        return navigate({ pathname: "/" }, { replace: true });
    }
  };

  return (
    <ThemeProvider theme={myTheme}>
      <View style={styles.container}>
        <Routes>
          <Route path='/' exact element={<MyWords />} />
          <Route
            path='/addword'
            exact
            element={<AddWordView handleTabChange={handleTabChange} />}
          />
          <Route path='/settings' exact element={<SettingsView />} />
        </Routes>
      </View>
      <LinearGradient
        end={{ x: 1, y: 0 }}
        start={{ x: 1, y: 1 }}
        colors={["#e4e2e4", "#FFF"]}
        style={{ height: 7, marginTop: 5 }}
      />
      <View style={styles.menuBottom}>
        {buttonList.map((button, key) => {
          return (
            <View key={key}>
              <Icon
                size={28}
                underlayColor={"white"}
                type='material-community'
                color={
                  button.clicked
                    ? myTheme.palette.primary
                    : myTheme.palette.silver
                }
                name={button.clicked ? button.icon : button.icon + "-outline"}
                onPress={() => {
                  handleTabChange(button);
                }}
              />
              <Text
                style={[
                  button.clicked
                    ? { color: myTheme.palette.primary }
                    : { color: "#777" },
                  styles.buttonText,
                ]}
              >
                {button.label}
              </Text>
            </View>
          );
        })}
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuBottom: {
    paddingBottom: 2,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    height: 52,
    width: "100%",
  },
  buttonText: { letterSpacing: 0.5, textAlign: "center", fontSize: 12 },
});

export default Dashboard;
