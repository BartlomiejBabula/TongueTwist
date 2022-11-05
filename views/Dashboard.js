import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-native";
import MyWords from "./MyWords";
import AddWordView from "./AddWordView";
import SettingsView from "./SettingsView";
import { StyleSheet, View } from "react-native";
import { Icon, Text, useTheme } from "@rneui/themed";
import { Divider } from "../components/common/Divider";
import { useNavigate, useLocation } from "react-router-native";
import * as NavigationBar from "expo-navigation-bar";

const Dashboard = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const { theme } = useTheme();
  const [buttonList, setButtonList] = useState([
    { icon: "pencil-plus", label: "Add word", clicked: false },
    { icon: "book-open", label: "My word", clicked: true },
    { icon: "cog", label: "Settings", clicked: false },
  ]);

  const handleTabChange = (type) => {
    buttonList.map((button) => {
      button.label === type.label
        ? (button.clicked = true)
        : (button.clicked = false);
    });

    switch (type.label) {
      case "Add word":
        return navigate({ pathname: "/addword" });
      case "Settings":
        return navigate({ pathname: "/settings" });
      case "My word":
        return navigate({ pathname: "/" });
      default:
        return navigate({ pathname: "/" });
    }
  };

  useEffect(() => {
    if (theme.mode === "dark") {
      NavigationBar.setBackgroundColorAsync(theme.colors.menu);
      NavigationBar.setButtonStyleAsync("light");
    } else {
      NavigationBar.setBackgroundColorAsync("white");
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, [theme.mode]);

  useEffect(() => {
    if (location.pathname === "/settings") {
      handleTabChange({ label: "Settings" });
    }
  }, [location.pathname]);

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Routes>
          <Route path='/' exact element={<MyWords />} />
          <Route
            path='/addword'
            exact
            element={<AddWordView handleTabChange={handleTabChange} />}
          />
          <Route
            path='/settings'
            exact
            element={<SettingsView handleTabChange={handleTabChange} />}
          />
        </Routes>
      </View>
      <Divider width={1} />
      <View style={[styles.menuBottom, { backgroundColor: theme.colors.menu }]}>
        {buttonList.map((button, key) => {
          return (
            <View
              key={key}
              style={{
                width: "20%",
                height: "100%",
              }}
            >
              <Icon
                containerStyle={{ paddingTop: 4 }}
                underlayColor={theme.colors.menu}
                size={26}
                type='material-community'
                color={button.clicked ? theme.colors.primary : "#777"}
                name={button.clicked ? button.icon : button.icon + "-outline"}
                onPress={() => {
                  handleTabChange(button);
                }}
              />
              <Text
                style={[
                  button.clicked
                    ? { color: theme.colors.primary }
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuBottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 50,
    width: "100%",
    justifyContent: "space-evenly",
  },
  buttonText: {
    letterSpacing: 0.2,
    textAlign: "center",
    fontSize: 12,
    marginTop: 2,
  },
});

export default Dashboard;
