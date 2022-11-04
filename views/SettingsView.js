import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, BackHandler, Modal } from "react-native";
import {
  Text,
  Button,
  Icon,
  useTheme,
  BottomSheet,
  ListItem,
  useThemeMode,
} from "@rneui/themed";
import { Divider } from "../components/common/Divider";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-native";
import { useDispatch } from "react-redux";
import { logOutAction } from "../actions/LogoutActions";
import { setTheme } from "../components/Theme";

const SettingsView = ({ handleTabChange }) => {
  const { theme } = useTheme();
  const { mode, setMode } = useThemeMode();
  const [themeDialog, setThemeDialog] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = async () => {
    await dispatch(logOutAction());
    AsyncStorage.removeItem("access");
    navigate({ pathname: "/" }, { replace: true });
  };

  const toggleNameDialog = () => {
    navigate({ pathname: "/settingsNameDialog" });
  };

  const togglePasswordDialog = () => {
    navigate({ pathname: "/settingsPasswordChange" });
  };

  const toggleWordsDialog = () => {
    navigate({ pathname: "/settingsArchiveWords" });
  };

  const toggleReportDialog = () => {
    navigate({ pathname: "/settingsFeedback" });
  };

  useEffect(() => {
    const backAction = () => {
      handleTabChange({ label: "My word" });
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const EditButton = (props) => (
    <Button
      title={props.title}
      type='clear'
      titleStyle={{
        color: theme.colors.icon,
        fontSize: 15,
      }}
      buttonStyle={{ justifyContent: "flex-start", paddingLeft: 15 }}
      containerStyle={props.style}
      onPress={props.open}
      disabled={props.disabled}
      icon={
        <Icon
          name={props.icon}
          type='material-community'
          color={theme.colors.icon}
          size={26}
          containerStyle={{ marginRight: 30 }}
        />
      }
    />
  );

  const themeList = [
    {
      label: "light",
      title: "Light Theme",
      onPress: async () => {
        setTheme(setMode, "light");
        setThemeDialog(false);
      },
    },
    {
      label: "dark",
      title: "Dark Theme",
      onPress: () => {
        setTheme(setMode, "dark");
        setThemeDialog(false);
      },
    },
  ];

  return (
    <>
      <Animated.ScrollView
        style={styles.container}
        entering={SlideInLeft.duration(150)}
        exiting={SlideOutLeft.duration(150)}
      >
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Account</Text>
        <Divider />
        <EditButton
          open={toggleNameDialog}
          title={"Display name"}
          icon={"account-box"}
        />
        <EditButton
          open={togglePasswordDialog}
          title={"Password"}
          icon={"lock"}
        />
        <Text style={styles.subtitle}>Application</Text>
        <Divider />
        <EditButton
          open={toggleWordsDialog}
          title={"Archive words"}
          icon={"book-open"}
        />
        <EditButton
          title={"Send Feedback"}
          open={toggleReportDialog}
          icon={"comment-alert"}
        />
        <EditButton
          open={() => {
            setThemeDialog(true);
          }}
          title={"Theme"}
          icon={"brightness-6"}
        />
        <EditButton
          title={"Logout"}
          open={logOut}
          icon={"logout"}
          style={{ marginTop: 30 }}
        />
      </Animated.ScrollView>
      <BottomSheet
        onBackdropPress={() => {
          setThemeDialog(false);
        }}
        isVisible={themeDialog}
      >
        {themeList.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              {l.label === theme.mode && (
                <Icon
                  name='check'
                  type='material-community'
                  color={theme.colors.success}
                  size={28}
                  containerStyle={{ marginRight: 20 }}
                />
              )}
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
};

export default SettingsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 7,
  },
});
