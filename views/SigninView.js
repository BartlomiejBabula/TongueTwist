import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { AppURL, setAuthHeader } from "../api/api";
import axios from "axios";
import { getUserData } from "../actions/LoggingActions";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Button, Icon, useTheme } from "@rneui/themed";
import { Input } from "../components/common/Input";
import { View, StyleSheet, Image } from "react-native";
import { useNavigate } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { SlideOutRight, SlideInRight } from "react-native-reanimated";

const SignIn = () => {
  const { theme } = useTheme();
  const input2 = useRef(null);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [bttLoading, setBttLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .max(32, "Email address is to long - should be 32 chars maximum")
      .required("Required"),
    password: Yup.string()
      // .matches(
      //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      //   "Password must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      // )
      .min(6, "Password is to short - should be 6 chars minimum")
      .required("Required"),
  });

  const onSubmit = (values) => {
    setBttLoading(true);
    let user = {
      username: values.email,
      password: values.password,
    };
    axios
      .post(AppURL + `/login`, user)
      .then(async (res) => {
        AsyncStorage.setItem("access", res.data.access_token);
        setAuthHeader(res.data.access_token);
        await dispatch(getUserData());
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMessage("Your email or password was incorrect.");
        } else {
          setErrorMessage(error.response.data.message);
        }

        setBttLoading(false);
      });
  };

  return (
    <Animated.View
      style={[styles.cointeiner, { backgroundColor: theme.colors.background }]}
      entering={SlideInRight.duration(250)}
      exiting={SlideOutRight.duration(250)}
    >
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
      <Text style={[styles.error, { color: theme.colors.error }]}>
        {errorMessage}
      </Text>
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
            <Button
              loading={bttLoading}
              title='SIGN IN'
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
      <Button
        title='CREATE A NEW ACCOUNT'
        type='clear'
        titleStyle={{
          color: theme.colors.primary,
        }}
        onPress={() => {
          navigate({ pathname: "/Register" }, { replace: true });
        }}
      />
    </Animated.View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  cointeiner: {
    flex: 1,
    paddingHorizontal: 35,
  },
  logo: { width: "45%", marginLeft: 5, marginTop: 10 },
  button: {
    marginHorizontal: 10,
    borderRadius: 30,
    height: 50,
    marginTop: 45,
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
  error: { textAlign: "center", marginVertical: 10 },
});
