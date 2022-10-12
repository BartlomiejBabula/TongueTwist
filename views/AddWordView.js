import React, { useState } from "react";
import { myTheme } from "../components/Theme";
import { StyleSheet, View, ScrollView } from "react-native";
import { Input } from '../components/common/Input'
import api from "../api/api";
import {
  ThemeProvider,
  Button,
  Text,
  Divider,
  Icon,
  Dialog,
} from "@rneui/themed";
import * as Yup from "yup";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { addWord } from "../actions/WordsActions";
import { useDispatch } from "react-redux";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";

const AddWordView = ({ handleTabChange }) => {
  const dispatch = useDispatch();
  const [oxfordDialog, setOxfordDialog] = useState(false);
  const [oxfordSearchList, setOxfordSearchList] = useState();
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
      word: values.word.trim(),
      translation: values.translate.trim(),
      pronancuation: values.pronancuation.trim(),
      examples: examplesArr,
      definition: values.definition.trim(),
    };
    await dispatch(addWord(newWord));
    handleTabChange({ label: "My word" });
  };

  const toggleOxfordDialog = (searchWord) => {
    setOxfordDialog(!oxfordDialog);
    if (!oxfordDialog) {
      api
        .get(`/oxford/search/${searchWord}`)
        .then((res) => {
          setOxfordSearchList(res.data.results);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  };

  const selectWord = async (word, setFieldValue, values) => {
    setOxfordSearchList();
    Object.keys(values).map((item, i) => {
      if (item !== "word") {
        setFieldValue(`${item}`, "");
      }
    });
    await api
      .get(`/oxford/entries/${word.id}`)
      .then((res) => {
        let searchedWord = res.data.results[0]?.lexicalEntries[0]?.entries[0];
        setFieldValue("word", res.data.results[0]?.word);
        setFieldValue("definition", searchedWord.senses[0]?.definitions[0]);
        if (searchedWord.pronunciations) {
          setFieldValue(
            "pronancuation",
            searchedWord.pronunciations[0]?.phoneticSpelling
          );
        }
        if (searchedWord.senses[0]?.examples !== undefined) {
          setFieldValue("examples", searchedWord.senses[0]?.examples[0]?.text);
          setFieldValue("examples2", searchedWord.senses[0]?.examples[1]?.text);
          setFieldValue("examples3", searchedWord.senses[0]?.examples[2]?.text);
        }
      })
      .catch((error) => { });
    toggleOxfordDialog();
  };

  return (
    <ThemeProvider theme={myTheme}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Add Word</Text>
      </View>
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
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <View style={{ marginBottom: 40 }}>
              <Input
                label='Word*'
                name='word'
                value={values.word}
                onChangeText={handleChange("word")}
                errorMessage={touched.word && errors.word}
                rightIcon={
                  <Icon
                    onPress={() => {
                      toggleOxfordDialog(values.word);
                    }}
                    disabled={values.word.length < 3}
                    disabledStyle={{
                      backgroundColor: null,
                      color: "red",
                    }}
                    name='chevron-right'
                    type='material-community'
                    size={40}
                    color={
                      values.word.length < 3
                        ? "#b1b1b1"
                        : myTheme.palette.primary
                    }
                  />
                }
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
              <Button
                title="ADD"
                buttonStyle={styles.button}
                onPress={handleSubmit}
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
              />
              <Dialog
                isVisible={oxfordDialog}
                onBackdropPress={toggleOxfordDialog}
              >
                {oxfordSearchList ? (
                  <>
                    <Dialog.Title title='Definition list' />
                    <Text>Found list of word definitions</Text>
                    <ScrollView style={{ marginTop: 20 }}>
                      {oxfordSearchList?.map((word, key) => (
                        <Button
                          onPress={() => {
                            selectWord(word, setFieldValue, values);
                          }}
                          title={word.label}
                          type='clear'
                          key={key}
                          titleStyle={{
                            color: myTheme.palette.secondary,
                          }}
                        />
                      ))}
                    </ScrollView>
                    <Icon
                      size={20}
                      underlayColor={"white"}
                      type='material-community'
                      color={myTheme.palette.secondary}
                      name={"close"}
                      onPress={toggleOxfordDialog}
                      containerStyle={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                      }}
                    />
                  </>
                ) : (
                  <Dialog.Loading />
                )}
              </Dialog>
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
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
