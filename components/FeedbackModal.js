import React from "react";
import { myTheme } from "./Theme";
import { StyleSheet, View } from "react-native";
import { Input, ThemeProvider, Text, Button, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";

const FeedbackModal = ({ toggleReportDialog, user }) => {
  const validationSchema = Yup.object().shape({
    reason: Yup.string().required("Required"),
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
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Icon
            size={26}
            underlayColor={"white"}
            type='material-community'
            name={"arrow-left"}
            onPress={toggleReportDialog}
          />
          <Text style={styles.title}>Send us Feedback</Text>
        </View>
        <Formik
          initialValues={{
            name: user.displayName ? user.displayName : "",
            email: user.email ? user.email : "",
            description: "",
            reason: "",
          }}
          validationSchema={validationSchema}
          onSubmit={sendReport}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <>
              <Picker
                selectedValue={values.reason}
                onValueChange={(itemValue, itemIndex) => {
                  setFieldValue("reason", itemValue);
                }}
              >
                <Picker.Item label='Bug report' value='bug' />
                <Picker.Item label='Upgrade idea' value='idea' />
                <Picker.Item label='Select reason' value='' />
              </Picker>
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
                title='Send'
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
      </View>
    </ThemeProvider>
  );
};

export default FeedbackModal;

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
