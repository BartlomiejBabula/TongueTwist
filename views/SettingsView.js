import React, { useState } from "react";
import api from "../api/api";
import { myTheme } from "../components/Theme";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Input,
  ThemeProvider,
  Text,
  Divider,
  Button,
  Switch,
  Dialog,
  Icon,
} from "@rneui/themed";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-native";
import { useDispatch } from "react-redux";
import { logOutAction } from "../actions/LogoutActions";
import { updateUser } from "../actions/UserActions";
import { updateWord } from "../actions/WordsActions";
import { selectUser, selectWordsList } from "../selectors/user";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

const SettingsView = () => {
  const user = useSelector(selectUser);
  const wordList = useSelector(selectWordsList);
  const [theme, setTheme] = useState(false);
  const [nameDialog, setNameDialog] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [wordsDialog, setWordsDialog] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .min(2, "Name is to short - should be 2 chars minimum")
      .max(18, "Name is to long - should be 18 chars maximum"),
  });

  const validationSchema2 = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .min(6)
      .required("Required"),
    currentPassword: Yup.string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .min(6)
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Invalid repeat password")
      .required("Required"),
  });

  const submitDisplayName = async (values) => {
    let newName = { displayName: values.name };
    await dispatch(updateUser(newName));
    setNameDialog(!nameDialog);
  };

  const submitPassword = async (values) => {
    let newPassword = {
      oldPassword: values.currentPassword,
      newPassword: values.password,
    };
    await api
      .post("/password-change", newPassword)
      .then((res) => {
        togglePasswordDialog();
      })
      .catch((error) => {
        setErrorPassword("Invalid current password");
      });
  };

  const logOut = () => {
    dispatch(logOutAction());
    AsyncStorage.removeItem("access");
    navigate({ pathname: "/" }, { replace: true });
  };

  const toggleNameDialog = () => {
    setNameDialog(!nameDialog);
  };

  const togglePasswordDialog = () => {
    setPasswordDialog(!passwordDialog);
    setErrorPassword("");
  };

  const toggleWordsDialog = () => {
    setWordsDialog(!wordsDialog);
  };

  const resetProgress = async (wordID) => {
    let newProgress = {
      id: wordID,
      progress: 0,
    };
    await dispatch(updateWord(newProgress));
  };

  const EditButton = (props) => (
    <Button
      title='EDIT'
      type='clear'
      titleStyle={{
        color: myTheme.palette.secondary,
      }}
      onPress={props.open}
      disabled={props.disabled}
    />
  );

  return (
    <ThemeProvider theme={myTheme}>
      <Animated.View
        style={styles.container}
        entering={SlideInLeft.duration(150)}
        exiting={SlideOutLeft.duration(150)}
      >
        <Text style={styles.title}>Settings</Text>
        <Divider width={1} style={{ marginBottom: 5 }} />
        <View style={styles.menuTile}>
          <Text style={styles.subtitle}>Account</Text>
          <Text style={styles.valueName}>Display name</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{user?.displayName}</Text>
            <EditButton open={toggleNameDialog} />
          </View>
          <Divider />
          <Text style={styles.valueName}>Password</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>*******</Text>
            <EditButton open={togglePasswordDialog} />
          </View>
          <Divider />
          <Text style={styles.valueName}>Email</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{user.email}</Text>
            <EditButton name={"email"} disabled={true} />
          </View>
        </View>
        <View style={styles.menuTile}>
          <Text style={styles.subtitle}>Application</Text>
          <Text style={styles.valueName}>Archive</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>Learned words</Text>
            <EditButton name={"words"} open={toggleWordsDialog} />
          </View>
          <Divider />
          <Text style={styles.valueName}>Theme</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{theme ? "DARK" : "LIGHT"}</Text>
            <Switch
              disabled
              value={theme}
              color={myTheme.palette.secondary}
              onValueChange={(value) => setTheme(value)}
            />
          </View>
        </View>
        <View style={styles.menuTile}>
          <Button
            title='Logout'
            type='clear'
            titleStyle={{
              paddingVertical: 5,
              fontSize: 17,
              color: myTheme.palette.secondary,
            }}
            onPress={logOut}
          />
        </View>
      </Animated.View>
      <Dialog isVisible={nameDialog} onBackdropPress={toggleNameDialog}>
        <Dialog.Title title='Display name' />
        <Text style={{ marginBottom: 20 }}>Set your display name</Text>
        <Formik
          initialValues={{
            name: user?.displayName,
          }}
          validationSchema={validationSchema}
          onSubmit={submitDisplayName}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <>
              <Input
                label='New name'
                name='name'
                value={values.name}
                onChangeText={handleChange("name")}
                errorMessage={touched.name && errors.name}
                containerStyle={{ paddingHorizontal: 0 }}
              />
              <Button
                title='Save'
                type='clear'
                titleStyle={{
                  fontSize: 17,
                  color: myTheme.palette.secondary,
                }}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
        <Icon
          size={24}
          underlayColor={"white"}
          type='material-community'
          color={myTheme.palette.secondary}
          name={"close"}
          onPress={toggleNameDialog}
          containerStyle={{ position: "absolute", top: 8, right: 8 }}
        />
      </Dialog>
      <Dialog isVisible={passwordDialog} onBackdropPress={togglePasswordDialog}>
        <Dialog.Title title='Password' />
        <Text>Set your new password</Text>
        <Text
          style={{
            marginVertical: 10,
            color: myTheme.palette.red,
            textAlign: "center",
          }}
        >
          {errorPassword}
        </Text>
        <Formik
          initialValues={{
            currentPassword: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema2}
          onSubmit={submitPassword}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <>
              <Input
                label='Current password'
                name='currentPassword'
                secureTextEntry={true}
                value={values.currentPassword}
                onChangeText={handleChange("currentPassword")}
                errorMessage={touched.currentPassword && errors.currentPassword}
              />
              <Input
                label='New password'
                name='password'
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange("password")}
                errorMessage={touched.password && errors.password}
              />
              <Input
                label='Confirm password'
                name='confirmPassword'
                secureTextEntry={true}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                errorMessage={touched.confirmPassword && errors.confirmPassword}
              />
              <Button
                title='Save'
                type='clear'
                titleStyle={{
                  fontSize: 17,
                  color: myTheme.palette.secondary,
                }}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
        <Icon
          size={24}
          underlayColor={"white"}
          type='material-community'
          color={myTheme.palette.secondary}
          name={"close"}
          onPress={togglePasswordDialog}
          containerStyle={{ position: "absolute", top: 8, right: 8 }}
        />
      </Dialog>
      <Dialog isVisible={wordsDialog} onBackdropPress={toggleWordsDialog}>
        <Dialog.Title title='Archive' />
        <Text>Your learned words</Text>
        <ScrollView style={{ marginTop: 20 }}>
          {wordList
            .filter((word) => word.progress === 5)
            .map((word, key) => (
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.valueText}>{word.word.toUpperCase()}</Text>
                <Button
                  onPress={() => {
                    resetProgress(word.id);
                  }}
                  title='RESET '
                  type='clear'
                  key={key}
                  titleStyle={{
                    color: myTheme.palette.secondary,
                  }}
                />
              </View>
            ))}
        </ScrollView>
        <Icon
          size={24}
          underlayColor={"white"}
          type='material-community'
          color={myTheme.palette.secondary}
          name={"close"}
          onPress={toggleWordsDialog}
          containerStyle={{ position: "absolute", top: 8, right: 8 }}
        />
      </Dialog>
    </ThemeProvider>
  );
};

export default SettingsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myTheme.palette.grey,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 22,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  valueName: {
    paddingHorizontal: 15,
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#86939e",
  },
  valueText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  menuTile: {
    backgroundColor: "white",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 2,
  },
  valueContainer: {
    paddingLeft: 15,
    paddingRight: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
