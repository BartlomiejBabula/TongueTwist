import React, { useEffect } from "react";
import { StyleSheet, ScrollView, BackHandler } from "react-native";
import { Text, Button, Icon, useTheme } from "@rneui/themed";
import { Divider } from "../components/common/Divider";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-native";
import { useDispatch } from "react-redux";
import { logOutAction } from "../actions/LogoutActions";

const SettingsView = ({ handleTabChange }) => {
  const { theme } = useTheme();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = async () => {
    AsyncStorage.removeItem("access");
    await dispatch(logOutAction());
    navigate({ pathname: "/" }, { replace: true });
  };

  const navigateNameChange = () => {
    navigate({ pathname: "/settingsNameChange" });
  };

  const navigateThemeChange = () => {
    navigate({ pathname: "/settingsThemeChange" });
  };

  const navigatePasswordChange = () => {
    navigate({ pathname: "/settingsPasswordChange" });
  };

  const navigateArchiveWords = () => {
    navigate({ pathname: "/settingsArchiveWords" });
  };

  const navigateFeedback = () => {
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
          open={navigateNameChange}
          title={"Display name"}
          icon={"account-box"}
        />
        <EditButton
          open={navigatePasswordChange}
          title={"Password"}
          icon={"lock"}
        />
        <Text style={styles.subtitle}>Application</Text>
        <Divider />
        <EditButton
          open={navigateArchiveWords}
          title={"Archive words"}
          icon={"book-open"}
        />
        <EditButton
          title={"Send Feedback"}
          open={navigateFeedback}
          icon={"comment-alert"}
        />
        <EditButton
          open={navigateThemeChange}
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
