import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, BackHandler } from "react-native";
import api from "../api/api";
import { Button, Text, Icon, Dialog, useTheme } from "@rneui/themed";
import * as Yup from "yup";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { addWord } from "../actions/WordsActions";
import { useDispatch } from "react-redux";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { Input } from "../components/common/Input";

const AddWordView = ({ handleTabChange }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [oxfordDialog, setOxfordDialog] = useState(false);
  const [moreExamples, setMoreExamples] = useState(false);
  const [oxfordSearchList, setOxfordSearchList] = useState();
  const validationSchema = Yup.object().shape({
    word: Yup.string().required("Required"),
    translate: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    let examplesArr = [
      values.example?.trim(),
      values.example2?.trim(),
      values.example3?.trim(),
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
    setOxfordSearchList();
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
        if (searchedWord.senses[0]?.examples) {
          setFieldValue("example", searchedWord.senses[0]?.examples[0]?.text);
          if (searchedWord.senses[0]?.examples[1]) {
            setMoreExamples(true);
            setFieldValue(
              "example2",
              searchedWord.senses[0]?.examples[1]?.text
            );
            setFieldValue(
              "example3",
              searchedWord.senses[0]?.examples[2]?.text
            );
          }
        }
      })
      .catch((error) => {});
    toggleOxfordDialog();
  };

  const toggleExample = (type) => {
    if (type === "add") {
      setMoreExamples(true);
    }
    if (type === "minus") {
      setMoreExamples(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      handleTabChange({ label: "My word" });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <Animated.View
        entering={SlideInRight.duration(150)}
        exiting={SlideOutRight.duration(150)}
        style={styles.titleContainer}
      >
        <Text style={styles.title}>Add Word</Text>
      </Animated.View>
      <Animated.ScrollView
        style={styles.container}
        entering={SlideInRight.duration(150)}
        exiting={SlideOutRight.duration(150)}
      >
        <Formik
          initialValues={{
            example: "",
            example2: "",
            example3: "",
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
                      values.word.length < 3 ? "#b1b1b1" : theme.colors.primary
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
                errorMessage={touched.definition && errors.definition}
              />
              <Input
                label='Example'
                name='example'
                value={values.example}
                onChangeText={handleChange("example")}
                multiline={true}
                numberOfLines={3}
                errorMessage={touched.example && errors.example}
                rightIcon={
                  <View style={{ marginRight: 5 }}>
                    {!moreExamples ? (
                      <Icon
                        onPress={() => {
                          toggleExample("add");
                        }}
                        name='plus'
                        type='material-community'
                        size={30}
                        color={theme.colors.primary}
                      />
                    ) : (
                      <Icon
                        onPress={() => {
                          toggleExample("minus");
                        }}
                        name='minus'
                        type='material-community'
                        size={30}
                        color={theme.colors.primary}
                      />
                    )}
                  </View>
                }
              />
              {moreExamples && (
                <>
                  <Input
                    label='Second example'
                    name='example2'
                    value={values.example2}
                    onChangeText={handleChange("example2")}
                    multiline={true}
                    numberOfLines={3}
                    errorMessage={touched.example2 && errors.example2}
                  />
                  <Input
                    label='Third example'
                    name='example3'
                    value={values.example3}
                    onChangeText={handleChange("example3")}
                    multiline={true}
                    numberOfLines={3}
                    errorMessage={touched.example3 && errors.example3}
                  />
                </>
              )}
              <Button
                title='ADD'
                buttonStyle={styles.button}
                onPress={handleSubmit}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: theme.colors.gradient,
                  end: { x: 0, y: 1.5 },
                }}
                titleStyle={{
                  color:
                    theme.mode === "dark" ? theme.colors.disabled : "white",
                  fontWeight: "700",
                  letterSpacing: 1,
                }}
              />
              <Dialog
                isVisible={oxfordDialog}
                onBackdropPress={toggleOxfordDialog}
              >
                {oxfordSearchList ? (
                  <>
                    <Dialog.Title
                      title='Definition list'
                      titleStyle={{ color: theme.colors.black }}
                    />
                    <Text>Found list of word definitions</Text>
                    <ScrollView style={{ marginTop: 20 }}>
                      {oxfordSearchList.length !== 0 ? (
                        oxfordSearchList?.map((word, key) => (
                          <Button
                            onPress={() => {
                              selectWord(word, setFieldValue, values);
                            }}
                            title={word.label}
                            type='clear'
                            key={key}
                            titleStyle={{
                              color: theme.colors.secondary,
                            }}
                          />
                        ))
                      ) : (
                        <Dialog.Title
                          title='Definition not found'
                          titleStyle={{ textAlign: "center" }}
                        />
                      )}
                    </ScrollView>
                    <Icon
                      size={20}
                      underlayColor={"white"}
                      type='material-community'
                      color={theme.colors.secondary}
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
    </>
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
    paddingBottom: 5,
    paddingHorizontal: 15,
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
