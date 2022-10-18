import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../actions/UserActions";
import { myTheme } from "./Theme";
import { StyleSheet, View } from "react-native";
import { Input, ThemeProvider, Text, Button, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import Animated, { SlideInLeft } from "react-native-reanimated";
import * as Yup from "yup";

const DisplayNameModal = ({ toggleNameDialog, user }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .min(2, "Name is to short - should be 2 chars minimum")
      .max(18, "Name is to long - should be 18 chars maximum"),
  });

  const submitDisplayName = async (values) => {
    let newName = { displayName: values.name };
    await dispatch(updateUser(newName));
    toggleNameDialog();
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
            onPress={toggleNameDialog}
          />
          <Text style={styles.title}>Display name</Text>
        </View>
        <Text style={styles.text}>Set your new display name</Text>
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

export default DisplayNameModal;

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
  text: {
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
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
