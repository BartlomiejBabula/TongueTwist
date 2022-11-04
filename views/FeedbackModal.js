import React, { useState, useEffect } from "react";
import api from "../api/api";
import { StyleSheet, View, BackHandler } from "react-native";
import { Text, Button, Icon, useTheme } from "@rneui/themed";
import { Input } from "../components/common/Input";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import * as Yup from "yup";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import { useNavigate } from "react-router-native";

const FeedbackModal = () => {
  let navigate = useNavigate();
  const { theme } = useTheme();
  const [isSent, setIsSent] = useState(false);
  const [bttLoading, setBttLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .required("Required")
      .min(6, "Message is to short"),
  });

  const sendReport = (values) => {
    let message = {
      type: 1,
      message: values.description,
    };
    setBttLoading(true);
    api
      .post(`/users/feedback`, message)
      .then(async (res) => {
        setIsSent(true);
      })
      .catch((error) => {
        setBttLoading(false);
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
        <Animated.View style={styles.containerTitle}>
          <Icon
            size={26}
            underlayColor={"white"}
            type='material-community'
            name={"arrow-left"}
            onPress={() => {
              navigate(-1);
            }}
          />
          <Text style={styles.title}>Send us Feedback</Text>
        </Animated.View>
        {isSent ? (
          <>
            <Text style={styles.subtitle}>Thank you for you Feedback</Text>
            <Text style={styles.text}>
              We cannot respond to you personally, but please know that your
              message has been received and will be reviewed by us developer
              team.
            </Text>
            <Button
              title='Back'
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
              onPress={() => {
                navigate(-1);
              }}
            />
          </>
        ) : (
          <Formik
            initialValues={{
              description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={sendReport}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <>
                <Input
                  label='Message'
                  name='description'
                  value={values.description}
                  onChangeText={handleChange("description")}
                  errorMessage={touched.description && errors.description}
                  containerStyle={{ paddingHorizontal: 0 }}
                  multiline={true}
                  numberOfLines={5}
                  height={100}
                />
                <Button
                  title='Send Feedback'
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
        )}
      </Animated.View>
    </View>
  );
};

export default FeedbackModal;

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
  subtitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: "30%",
    marginBottom: 35,
  },
  text: {
    fontSize: 16,
    marginBottom: 25,
    marginHorizontal: 15,
  },
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
