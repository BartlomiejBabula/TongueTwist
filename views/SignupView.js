import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { AppURL } from "../api/api";
import axios from "axios";
import { Text, Button, Icon, useTheme } from "@rneui/themed";
import { Input } from "../components/common/Input";
import { View, StyleSheet, Image } from "react-native";
import { useNavigate } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { SlideOutLeft, SlideInLeft } from "react-native-reanimated";

const SignUp = () => {
  const { theme } = useTheme();
  const input2 = useRef(null);
  const input3 = useRef(null);
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);
  const [bttLoading, setBttLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .max(32, "Email address is to long - should be 32 chars maximum")
      .required("Required"),
    password: Yup.string()
      .min(6, "Password is to short - should be 6 chars minimum")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Invalid repeat password")
      .required("Required"),
  });

  const onSubmit = (values) => {
    setBttLoading(true);
    let user = {
      email: values.email,
      password: values.password,
    };
    axios
      .post(AppURL + "/register", user)
      .then((response) => {
        if (response.data !== null) {
          navigate({ pathname: "/CreatedAccountView" }, { replace: true });
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        setBttLoading(false);
      });
  };

  return (
    <Animated.View
      style={[styles.cointeiner, { backgroundColor: theme.colors.background }]}
      entering={SlideInLeft.duration(250)}
      exiting={SlideOutLeft.duration(250)}
    >
      <View style={styles.cointeinerLogo}>
        {theme.mode === "dark" ? (
          <Image
            resizeMode='center'
            style={styles.logo}
            source={require("../pictures/logo_2_dark.png")}
          />
        ) : (
          <Image
            resizeMode='center'
            style={styles.logo}
            source={require("../pictures/logo_2.png")}
          />
        )}
        <Button
          title='SIGN IN'
          type='clear'
          titleStyle={{ color: theme.colors.primary, fontSize: 14 }}
          onPress={() => {
            navigate({ pathname: "/" }, { replace: true });
          }}
          icon={{
            name: "arrow-forward-ios",
            size: 14,
            color: theme.colors.primary,
          }}
          iconRight
        />
      </View>
      <Text style={styles.h1}>Create account</Text>
      <Text
        style={[
          styles.h2,
          {
            color: theme.mode === "dark" ? theme.colors.greyOutline : "#616161",
          },
        ]}
      >
        Start to improve your vocabulary
      </Text>
      <Text style={[styles.error, { color: theme.colors.error }]}>{error}</Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
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
            />
            <Input
              label='Password'
              name='password'
              value={values.password}
              onChangeText={handleChange("password")}
              errorMessage={touched.password && errors.password}
              secureTextEntry={showPassword}
              placeholder='********'
              inputRef={input2}
              onSubmitEditing={() => input3.current.focus()}
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
              label='Repeat password'
              name='confirmPassword'
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              errorMessage={touched.confirmPassword && errors.confirmPassword}
              secureTextEntry={showRePassword}
              placeholder='********'
              inputRef={input3}
              rightIcon={
                <Icon
                  name='eye'
                  type='material-community'
                  color='#b1b1b1'
                  size={26}
                  containerStyle={{ marginRight: 7 }}
                  onPress={() => {
                    setShowRePassword(!showRePassword);
                  }}
                />
              }
            />
            <Button
              loading={bttLoading}
              title='SIGN UP'
              buttonStyle={styles.button}
              onPress={handleSubmit}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: theme.colors.gradient,
                end: { x: 0, y: 1.5 },
              }}
              titleStyle={{ fontWeight: "700", letterSpacing: 1 }}
            />
          </View>
        )}
      </Formik>
    </Animated.View>
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
  logo: { width: "45%", marginLeft: 5 },
  h1: { marginLeft: 10, marginTop: 30, fontSize: 24, fontWeight: "700" },
  h2: {
    marginLeft: 10,
    fontSize: 16,
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
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  error: { textAlign: "center", marginVertical: 10 },
});
