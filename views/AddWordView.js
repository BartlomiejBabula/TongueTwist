import React from "react";
import { myTheme } from "../components/Theme";
import { StyleSheet, View } from "react-native";
import { ThemeProvider, Input, Button } from "@rneui/themed";
import * as Yup from "yup";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { addWord, updateWord } from "../actions/WordsActions";
import { useDispatch } from "react-redux";

const AddWordView = ({ toggleOverlay, editWord }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    word: Yup.string().required("Required"),
    translate: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    let newWord = {
      word: values.word.trim(),
      translation: values.translate.trim(),
      pronancuation: values.pronancuation.trim(),
      definition: values.englishExplanation.trim(),
    };
    if (editWord?.id) {
      newWord = { ...newWord, id: editWord.id, progress: editWord.progress };
      await dispatch(updateWord(newWord));
    } else await dispatch(addWord(newWord));
    toggleOverlay();
  };

  return (
    <ThemeProvider theme={myTheme}>
      <View>
        <Formik
          initialValues={{
            word: editWord?.word ? editWord?.word : "",
            translate: editWord?.translation ? editWord?.translation : "",
            pronancuation: editWord?.pronancuation
              ? editWord?.pronancuation
              : "",
            englishExplanation: editWord?.definition
              ? editWord?.definition
              : "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <View
              style={{
                paddingHorizontal: 15,
                marginTop: 100,
                width: "100%",
              }}
            >
              <Input
                label='Word'
                name='word'
                value={values.word}
                onChangeText={handleChange("word")}
                errorMessage={touched.word && errors.word}
                placeholder='Word'
              />
              <Input
                name='translate'
                value={values.translate}
                onChangeText={handleChange("translate")}
                errorMessage={touched.translate && errors.translate}
                placeholder='Polish translation'
              />
              <Input
                name='pronancuation'
                value={values.pronancuation}
                onChangeText={handleChange("pronancuation")}
                errorMessage={touched.pronancuation && errors.pronancuation}
                placeholder='Pronancuation'
              />
              <Input
                inputContainerStyle={{ paddingVertical: 10 }}
                style={{ textAlignVertical: "top" }}
                name='englishExplanation'
                value={values.englishExplanation}
                onChangeText={handleChange("englishExplanation")}
                errorMessage={
                  touched.englishExplanation && errors.englishExplanation
                }
                multiline
                numberOfLines={4}
                placeholder='English explanation'
              />
              <Button
                title={editWord ? "EDIT WORD" : "ADD WORD"}
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
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
              />
            </View>
          )}
        </Formik>
      </View>
    </ThemeProvider>
  );
};

export default AddWordView;

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 55,
    left: 20,
  },
  button: {
    borderRadius: 30,
    height: 50,
    marginTop: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 4,
  },
});
