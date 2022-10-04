import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { AppURL } from "../api/api";
import axios from "axios";
import {
  Text,
  Input,
  lightColors,
  CheckBox,
  Button,
  Icon,
  ThemeProvider,
} from "@rneui/themed";
import { View, StyleSheet, Image } from "react-native";
import { useNavigate } from "react-router-native";
import { myTheme } from "../components/Theme";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { SlideOutLeft, SlideInLeft } from "react-native-reanimated";

const SignUp = () => {
  const input2 = useRef(null);
  const input3 = useRef(null);
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .max(32, "Email address is to long - should be 32 chars maximum")
      .required("Required"),
    password: Yup.string()
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

  const onSubmit = (values) => {
    let user = {
      email: values.email,
      password: values.password,
    };
    axios
      .post(AppURL + "/register", user)
      .then((response) => {
        if (response.data !== null) {
          // setError("");
          navigate({ pathname: "/" }, { replace: true });
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <ThemeProvider theme={myTheme}>
      <Animated.View
        style={styles.cointeiner}
        entering={SlideInLeft.duration(250)}
        exiting={SlideOutLeft.duration(250)}
      >
        <View style={styles.cointeinerLogo}>
          <Image
            resizeMode='center'
            style={styles.logo}
            source={require("../pictures/logo_2.png")}
          />
          <Button
            title='SIGN IN'
            type='clear'
            titleStyle={{ color: myTheme.palette.primary, fontSize: 14 }}
            onPress={() => {
              navigate({ pathname: "/" }, { replace: true });
            }}
            icon={{
              name: "arrow-forward-ios",
              size: 14,
              color: myTheme.palette.primary,
            }}
            iconRight
          />
        </View>
        <Text style={styles.h1}>Create account</Text>
        <Text style={styles.h2}>Start to improve your vocabulary</Text>
        <Text style={styles.error}>{error}</Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            handleSubmit,
          }) => (
            <View>
              <Input
                label='Email'
                name='email'
                keyboardType={"email-address"}
                value={values.email}
                onChangeText={handleChange("email")}
                errorMessage={touched.email && errors.email}
                placeholder='address@email.com'
                onSubmitEditing={() => input2.current.focus()}
              />
              <Input
                label='Password'
                name='password'
                value={values.password}
                onChangeText={handleChange("password")}
                errorMessage={touched.password && errors.password}
                secureTextEntry={true}
                placeholder='********'
                ref={input2}
                onSubmitEditing={() => input3.current.focus()}
              />
              <Input
                label='Repeat password'
                name='confirmPassword'
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                errorMessage={touched.confirmPassword && errors.confirmPassword}
                secureTextEntry={true}
                placeholder='********'
                ref={input3}
              />
              <Button
                title='SIGN UP'
                buttonStyle={styles.button}
                onPress={handleSubmit}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: myTheme.palette.gradient,
                  end: { x: 0, y: 1.5 },
                }}
                titleStyle={{ fontWeight: "700", letterSpacing: 1 }}
              />
            </View>
          )}
        </Formik>
      </Animated.View>
    </ThemeProvider>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  cointeiner: { flex: 1, paddingHorizontal: 35 },
  cointeinerLogo: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: { width: 140, marginLeft: 5 },
  h1: { marginLeft: 10, marginTop: 30, fontSize: 24, fontWeight: "700" },
  h2: {
    marginLeft: 10,
    fontSize: 16,
    color: "#616161",
    letterSpacing: 1,
    marginVertical: 5,
  },
  button: {
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 30,
    height: 50,
    marginTop: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 6,
  },
  error: { textAlign: "center", color: lightColors.error, marginVertical: 10 },
});
