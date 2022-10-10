import React from "react";
import { myTheme } from "../components/Theme";
import { StyleSheet, View, ScrollView } from "react-native";
import { ThemeProvider, Input, Button, Text, Divider } from "@rneui/themed";
import * as Yup from "yup";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { addWord } from "../actions/WordsActions";
import { useDispatch } from "react-redux";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { useNavigate } from "react-router-native";

const AddWordView = ({ handleTabChange }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    word: Yup.string().required("Required"),
    translate: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    let examplesArr = [
      values.examples.trim(),
      values.examples2.trim(),
      values.examples3.trim(),
    ];

    examplesArr = examplesArr.filter((example) => example);

    let newWord = {
      word: values.word.trim(),
      translation: values.translate.trim(),
      pronancuation: values.pronancuation.trim(),
      examples: examplesArr,
      definition: values.definition.trim(),
    };
    await dispatch(addWord(newWord));
    handleTabChange({ label: "My word" });
  };

  return (
    <ThemeProvider theme={myTheme}>
      <Text style={styles.title}>Add Word</Text>
      <Divider width={1} />
      <Animated.ScrollView
        style={styles.container}
        entering={SlideInRight.duration(150)}
        exiting={SlideOutRight.duration(150)}
      >
        <Formik
          initialValues={{
            examples: "",
            examples2: "",
            examples3: "",
            word: "",
            translate: "",
            pronancuation: "",
            definition: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <View style={{ marginBottom: 40 }}>
              <Input
                label='Word'
                name='word'
                value={values.word}
                onChangeText={handleChange("word")}
                errorMessage={touched.word && errors.word}
              />
              <Input
                label='Translation'
                name='translate'
                value={values.translate}
                onChangeText={handleChange("translate")}
                errorMessage={touched.translate && errors.translate}
              />
              <Input
                label='Pronancuation'
                name='pronancuation'
                value={values.pronancuation}
                onChangeText={handleChange("pronancuation")}
                errorMessage={touched.pronancuation && errors.pronancuation}
              />
              <Input
                label='Definition'
                name='definition'
                value={values.definition}
                onChangeText={handleChange("definition")}
                multiline={true}
                numberOfLines={3}
                inputStyle={{
                  height: 60,
                  textAlignVertical: "top",
                  marginVertical: 5,
                }}
                errorMessage={touched.definition && errors.definition}
              />
              <Input
                label='Examples'
                name='examples'
                value={values.examples}
                onChangeText={handleChange("examples")}
                multiline={true}
                numberOfLines={3}
                inputStyle={{
                  height: 60,
                  textAlignVertical: "top",
                  marginVertical: 5,
                }}
                errorMessage={touched.examples && errors.examples}
              />
              <Input
                label='Examples 2'
                name='examples2'
                value={values.examples2}
                onChangeText={handleChange("examples2")}
                multiline={true}
                numberOfLines={3}
                inputStyle={{
                  height: 60,
                  textAlignVertical: "top",
                  marginVertical: 5,
                }}
                errorMessage={touched.examples2 && errors.examples2}
              />
              <Input
                label='Examples 3'
                name='examples3'
                value={values.examples3}
                onChangeText={handleChange("examples3")}
                multiline={true}
                numberOfLines={3}
                inputStyle={{
                  height: 60,
                  textAlignVertical: "top",
                  marginVertical: 5,
                }}
                errorMessage={touched.examples3 && errors.examples3}
              />

              <Button
                title='ADD WORD'
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: myTheme.palette.gradient,
                  end: { x: 0, y: 1.5 },
                }}
                containerStyle={styles.button}
                titleStyle={{
                  fontWeight: "700",
                  letterSpacing: 1,
                  paddingVertical: 10,
                }}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </Animated.ScrollView>
    </ThemeProvider>
  );
};

export default AddWordView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: myTheme.palette.grey,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  button: {
    marginHorizontal: 10,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 2,
  },
});
