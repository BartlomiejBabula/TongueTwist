import React from "react";
import { myTheme } from "../components/Theme";
import { StyleSheet, View, ScrollView } from "react-native";
import { ThemeProvider, Input, Button, Text, useTheme } from "@rneui/themed";
import * as Yup from "yup";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { updateWord } from "../actions/WordsActions";

const EditWordModal = ({ toggleEditModal, word }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    word: Yup.string().required("Required"),
    translate: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    let examplesArr = [
      values.examples?.trim(),
      values.examples2?.trim(),
      values.examples3?.trim(),
    ];
    examplesArr = examplesArr.filter((example) => example);
    let newWord = {
      id: word.id,
      word: values.word.trim(),
      translation: values.translate.trim(),
      pronancuation: values.pronancuation.trim(),
      examples: examplesArr,
      definition: values.definition.trim(),
    };
    await dispatch(updateWord(newWord));
    toggleEditModal();
  };

  return (
    <ThemeProvider theme={myTheme}>
      <View
        style={{
          backgroundColor: theme.colors.background,
          paddingBottom: "20%",
        }}
      >
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Edit Word</Text>
          <Button
            title='Cancel'
            type='clear'
            titleStyle={{
              color: theme.colors.error,
            }}
            onPress={toggleEditModal}
          />
        </View>
        <ScrollView style={styles.container}>
          <Formik
            initialValues={{
              examples: word?.examples[0] ? word.examples[0] : "",
              examples2: word?.examples[1] ? word.examples[1] : "",
              examples3: word?.examples[2] ? word.examples[2] : "",
              word: word?.word ? word.word : "",
              translate: word?.translation ? word.translation : "",
              pronancuation: word?.pronancuation ? word.pronancuation : "",
              definition: word?.definition ? word.definition : "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <View style={{ marginBottom: 40 }}>
                <Input
                  label='Word*'
                  name='word'
                  value={values.word}
                  onChangeText={handleChange("word")}
                  errorMessage={touched.word && errors.word}
                />
                <Input
                  label='Translation*'
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
                  title='SAVE'
                  ViewComponent={LinearGradient}
                  buttonStyle={styles.button}
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
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </ThemeProvider>
  );
};

export default EditWordModal;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  containerTitle: {
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 5,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
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
