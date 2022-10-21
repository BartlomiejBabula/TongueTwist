import React, { useState, useEffect } from "react";
import { myTheme } from "../components/Theme";
import { StyleSheet, ScrollView, BackHandler, Modal } from "react-native";
import {
  ThemeProvider,
  Text,
  Divider,
  Button,
  Icon,
  useTheme,
  BottomSheet,
  ListItem,
  useThemeMode,
} from "@rneui/themed";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-native";
import { useDispatch } from "react-redux";
import { logOutAction } from "../actions/LogoutActions";
import { selectUser, selectWordsList } from "../selectors/user";
import { useSelector } from "react-redux";
import ArchiveWordsModal from "./ArchiveWordsModal";
import FeedbackModal from "./FeedbackModal";
import ChangePasswordModal from "./ChangePasswordModal";
import DisplayNameModal from "./DisplayNameModal";

const SettingsView = ({ handleTabChange }) => {
  const { theme } = useTheme();
  const user = useSelector(selectUser);
  const wordList = useSelector(selectWordsList);
  const { mode, setMode } = useThemeMode();
  const [themeDialog, setThemeDialog] = useState(false);
  const [nameDialog, setNameDialog] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [wordsDialog, setWordsDialog] = useState(false);
  const [reportDialog, setReportDialog] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = async () => {
    await dispatch(logOutAction());
    AsyncStorage.removeItem("access");
    navigate({ pathname: "/" }, { replace: true });
  };

  const toggleNameDialog = () => {
    setNameDialog(!nameDialog);
  };

  const togglePasswordDialog = () => {
    setPasswordDialog(!passwordDialog);
  };

  const toggleWordsDialog = () => {
    setWordsDialog(!wordsDialog);
  };

  const toggleReportDialog = () => {
    setReportDialog(!reportDialog);
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
        color: theme.colors.black,
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
          color={theme.colors.black}
          size={26}
          containerStyle={{ marginRight: 30 }}
        />
      }
    />
  );

  const themeList = [
    {
      title: "Light Theme",
      onPress: () => {
        setMode("light");
        setThemeDialog(false);
      },
    },
    {
      title: "Dark Theme",
      onPress: () => {
        setMode("dark");
        setThemeDialog(false);
      },
    },
    { title: "Cancel", onPress: () => setThemeDialog(false) },
  ];

  return (
    <ThemeProvider theme={myTheme}>
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
      <Modal
        visible={nameDialog}
        onRequestClose={toggleNameDialog}
        animationType='none'
      >
        <DisplayNameModal toggleNameDialog={toggleNameDialog} user={user} />
      </Modal>
      <Modal
        visible={passwordDialog}
        onRequestClose={togglePasswordDialog}
        animationType='none'
      >
        <ChangePasswordModal togglePasswordDialog={togglePasswordDialog} />
      </Modal>
      <Modal
        visible={wordsDialog}
        onRequestClose={toggleWordsDialog}
        animationType='none'
      >
        <ArchiveWordsModal
          toggleWordsDialog={toggleWordsDialog}
          wordList={wordList}
        />
      </Modal>
      <Modal
        visible={reportDialog}
        animationType='none'
        onRequestClose={toggleReportDialog}
      >
        <FeedbackModal toggleReportDialog={toggleReportDialog} user={user} />
      </Modal>
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
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </ThemeProvider>
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
