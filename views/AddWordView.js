import React, { useRef } from "react";
import { myTheme } from "../components/Theme";
import { StyleSheet, View, ScrollView } from "react-native";
import { ThemeProvider, Button, Text } from "@rneui/themed";
import { Input } from '../components/common/Input'
import * as Yup from "yup";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { addWord } from "../actions/WordsActions";
import { useDispatch } from "react-redux";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useNavigate } from "react-router-native";

const AddWordView = ({ handleTabChange }) => {
  const ref_input2 = useRef();
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
      <Animated.ScrollView
        style={styles.container}
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
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
            <View style={styles.formik}>
              <Input
                label='Word'
                name='word'
                value={values.word}
                onChangeText={handleChange("word")}
                errorMessage={touched.word && errors.word}
                onSubmitEditing={() => ref_input2.current.focus()}
              />
              <Input
                label='Translation'
                name='translate'
                value={values.translate}
                onChangeText={handleChange("translate")}
                errorMessage={touched.translate && errors.translate}
                forwardRef={ref_input2}
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
                errorMessage={touched.definition && errors.definition}
              />
              <Input
                label='Examples'
                name='examples'
                value={values.examples}
                onChangeText={handleChange("examples")}
                errorMessage={touched.examples && errors.examples}
                numberOfLines={4}
              />

              <Button
                title={"ADD"}
                buttonStyle={styles.button}
                onPress={handleSubmit}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: myTheme.palette.gradient,
                  end: { x: 0, y: 0.9 },
                }}
                titleStyle={{ fontWeight: "700" }}
                containerStyle={{
                  width: 300,
                  marginHorizontal: 'auto',
                  marginVertical: 10,
                }}
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
  container: { marginTop: 10, marginHorizontal: 20 },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 60,
    marginHorizontal: 15,
  },
  formik: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  button: {
    borderRadius: 16,
    height: 50,
    width: '100%'
  },
});
