import React, { useState, useEffect } from "react";
import api from "../api/api";
import { StyleSheet, View, BackHandler } from "react-native";
import { useNavigate } from "react-router-native";
import { Text, Button, Icon, useTheme } from "@rneui/themed";
import { Input } from "../components/common/Input";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import * as Yup from "yup";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";

const PasswordChangeView = () => {
  const { theme } = useTheme();
  let navigate = useNavigate();
  const [errorPassword, setErrorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password is to short - should be 6 chars minimum")
      .required("Required"),
    currentPassword: Yup.string()
      .min(6, "Password is to short - should be 6 chars minimum")
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
        navigate(-1);
      })
      .catch((error) => {
        setErrorPassword("Invalid current password");
      });
  };

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

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Animated.View
        entering={SlideInLeft.duration(200)}
        exiting={SlideOutLeft.duration(150)}
      >
        <View style={styles.containerTitle}>
          <Icon
            size={26}
            underlayColor={"white"}
            type='material-community'
            name={"arrow-left"}
            onPress={() => {
              navigate(-1);
            }}
          />
          <Text style={styles.title}>Change Password</Text>
        </View>
        <Text style={styles.text}>Set your new password</Text>
        <Text
          style={{
            marginVertical: 5,
            color: theme.colors.error,
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
                title='Update password'
                buttonStyle={styles.button}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: theme.colors.gradient,
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
    </View>
  );
};

export default PasswordChangeView;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 15,
    flex: 1,
  },
  containerTitle: {
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 35,
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
