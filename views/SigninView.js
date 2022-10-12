import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import api, { setAuthHeader } from "../api/api";
import { getUserData } from "../actions/LoggingActions";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  Input,
  lightColors,
  Button,
  Icon,
  ThemeProvider,
} from "@rneui/themed";
import { View, StyleSheet, Image } from "react-native";
import { useNavigate } from "react-router-native";
import { myTheme } from "../components/Theme";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { SlideOutRight, SlideInRight } from "react-native-reanimated";

const SignIn = () => {
  const input2 = useRef(null);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
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
  });

  const onSubmit = (values) => {
    let user = {
      username: values.email,
      password: values.password,
    };
    console.log(`>> przed requestem`)
    api
      .post(`/login`, user)
      .then(async (res) => {
        console.log(`>> res`, res)
        AsyncStorage.setItem("access", res.data.access_token);
        setAuthHeader(res.data.access_token);
        await dispatch(getUserData());
      })
      .catch((error) => {
        console.log(`>> error`, error)
        setErrorMessage(error.message);
      });
  };

  return (
    <ThemeProvider theme={myTheme}>
      <Animated.View
        style={styles.cointeiner}
        entering={SlideInRight.duration(250)}
        exiting={SlideOutRight.duration(250)}
      >
        <Image
          resizeMode='center'
          style={styles.logo}
          source={require("../pictures/logo_2.png")}
        />
        <Text style={styles.error}>{errorMessage}</Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
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
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              <Input
                label='Password'
                name='password'
                value={values.password}
                onChangeText={handleChange("password")}
                errorMessage={touched.password && errors.password}
                secureTextEntry={true}
                placeholder='********'
                autoCapitalize={'none'}
                autoCorrect={false}
                ref={input2}
              />
              <Button
                title='SIGN IN'
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
        <Button
          title='CREATE A NEW ACCOUNT'
          type='clear'
          titleStyle={{
            color: myTheme.palette.primary,
          }}
          onPress={() => {
            navigate({ pathname: "/Register" }, { replace: true });
          }}
        />
      </Animated.View>
    </ThemeProvider>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  cointeiner: {
    flex: 1,
    paddingHorizontal: 35,
  },
  logo: { width: 140, marginLeft: 5, marginTop: 10 },
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
    borderRadius: 30,
    height: 50,
    marginTop: 45,
    marginBottom: 20,
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
