import React from "react";
import { myTheme } from "../components/Theme";
import { StyleSheet, View } from "react-native";
import {
  Input,
  ThemeProvider,
  Text,
  Button,
  Icon,
  useTheme,
} from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import * as Yup from "yup";
import Animated, { SlideInLeft } from "react-native-reanimated";

const FeedbackModal = ({ toggleReportDialog, user }) => {
  const { theme } = useTheme();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string()
      .required("Required")
      .min(6, "Description is to short"),
    email: Yup.string()
      .email("Invalid email address")
      .max(32, "Email address is to long - should be 32 chars maximum")
      .required("Required"),
  });

  const sendReport = (values) => {
    console.log(values);
  };

  return (
    <ThemeProvider theme={myTheme}>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Animated.View entering={SlideInLeft.duration(150)}>
          <Animated.View style={styles.containerTitle}>
            <Icon
              size={26}
              underlayColor={"white"}
              type='material-community'
              name={"arrow-left"}
              onPress={toggleReportDialog}
            />
            <Text style={styles.title}>Send us Feedback</Text>
          </Animated.View>
          <Formik
            initialValues={{
              name: user.displayName ? user.displayName : "",
              email: user.email ? user.email : "",
              description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={sendReport}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <>
                <Input
                  label='Name'
                  name='name'
                  value={values.name}
                  onChangeText={handleChange("name")}
                  errorMessage={touched.name && errors.name}
                  containerStyle={{ paddingHorizontal: 0 }}
                />
                <Input
                  label='Email'
                  name='email'
                  value={values.email}
                  onChangeText={handleChange("email")}
                  errorMessage={touched.email && errors.email}
                  containerStyle={{ paddingHorizontal: 0 }}
                />
                <Input
                  label='Description'
                  name='description'
                  value={values.description}
                  onChangeText={handleChange("description")}
                  errorMessage={touched.description && errors.description}
                  containerStyle={{ paddingHorizontal: 0 }}
                  multiline={true}
                  numberOfLines={5}
                  inputStyle={{
                    height: 100,
                    textAlignVertical: "top",
                    marginVertical: 5,
                  }}
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
        </Animated.View>
      </View>
    </ThemeProvider>
  );
};

export default FeedbackModal;

const styles = StyleSheet.create({
  container: {
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
