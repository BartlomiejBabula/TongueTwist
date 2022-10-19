import React, { useState } from "react";
import api from "../api/api";
import { myTheme } from "../components/Theme";
import { StyleSheet, View } from "react-native";
import { Input, ThemeProvider, Text, Button, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import * as Yup from "yup";
import Animated, { SlideInLeft } from "react-native-reanimated";

const ChangePasswordModal = ({ togglePasswordDialog }) => {
  const [errorPassword, setErrorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const validationSchema = Yup.object().shape({
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

  return (
    <ThemeProvider theme={myTheme}>
      <Animated.View
        style={styles.container}
        entering={SlideInLeft.duration(150)}
      >
        <View style={styles.containerTitle}>
          <Icon
            size={26}
            underlayColor={"white"}
            type='material-community'
            name={"arrow-left"}
            onPress={togglePasswordDialog}
          />
          <Text style={styles.title}>Change Password</Text>
        </View>
        <Text style={styles.text}>Set your new password</Text>
        <Text
          style={{
            marginVertical: 5,
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
          validationSchema={validationSchema}
          onSubmit={submitPassword}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <>
              <Input
                label='Current password'
                name='currentPassword'
                secureTextEntry={showCurrentPassword}
                value={values.currentPassword}
                onChangeText={handleChange("currentPassword")}
                errorMessage={touched.currentPassword && errors.currentPassword}
                rightIcon={
                  <Icon
                    name='eye'
                    type='material-community'
                    color='#b1b1b1'
                    underlayColor={"white"}
                    size={26}
                    containerStyle={{ marginRight: 7 }}
                    onPress={() => {
                      setShowCurrentPassword(!showCurrentPassword);
                    }}
                  />
                }
              />
              <Input
                label='New password'
                name='password'
                secureTextEntry={showPassword}
                value={values.password}
                onChangeText={handleChange("password")}
                errorMessage={touched.password && errors.password}
                rightIcon={
                  <Icon
                    name='eye'
                    type='material-community'
                    color='#b1b1b1'
                    underlayColor={"white"}
                    size={26}
                    containerStyle={{ marginRight: 7 }}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                }
              />
              <Input
                label='Confirm password'
                name='confirmPassword'
                secureTextEntry={showRePassword}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                errorMessage={touched.confirmPassword && errors.confirmPassword}
                rightIcon={
                  <Icon
                    name='eye'
                    type='material-community'
                    color='#b1b1b1'
                    underlayColor={"white"}
                    size={26}
                    containerStyle={{ marginRight: 7 }}
                    onPress={() => {
                      setShowRePassword(!showRePassword);
                    }}
                  />
                }
              />
              <Button
                title='Save'
                buttonStyle={styles.button}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: myTheme.palette.gradient,
                  end: { x: 0, y: 1.5 },
                }}
                titleStyle={{
                  color: "white",
                  fontWeight: "700",
                  letterSpacing: 1,
                }}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </Animated.View>
    </ThemeProvider>
  );
};

export default ChangePasswordModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  containerTitle: {
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 35,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    marginLeft: "8%",
    fontWeight: "bold",
    fontSize: 22,
  },
  text: { marginHorizontal: 15, fontWeight: "bold", fontSize: 16 },
  button: {
    marginHorizontal: 10,
    borderRadius: 14,
    height: 50,
    marginTop: 20,
    marginBottom: 20,
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
