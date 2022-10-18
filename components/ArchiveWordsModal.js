import React from "react";
import { myTheme } from "./Theme";
import { StyleSheet, View, ScrollView } from "react-native";
import { ThemeProvider, Text, Button, Icon, Divider } from "@rneui/themed";
import { updateWord } from "../actions/WordsActions";
import { useDispatch } from "react-redux";

const ArchiveWordsModal = ({ toggleWordsDialog, wordList }) => {
  const dispatch = useDispatch();
  const resetProgress = async (wordID) => {
    let newProgress = {
      id: wordID,
      progress: 0,
    };
    await dispatch(updateWord(newProgress));
  };

  return (
    <ThemeProvider theme={myTheme}>
      <View style={styles.container}>
        <Icon
          size={26}
          underlayColor={"white"}
          type='material-community'
          name={"arrow-left"}
          onPress={toggleWordsDialog}
        />
        <Text style={styles.title}>Archive</Text>
      </View>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {wordList
          .filter((word) => word.progress === 5)
          .map((word, key) => (
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.valueText}>{word.word.toUpperCase()}</Text>
              <Button
                onPress={() => {
                  resetProgress(word.id);
                }}
                title='RESET'
                type='clear'
                key={key}
                titleStyle={{
                  color: myTheme.palette.secondary,
                }}
              />
            </View>
          ))}
      </ScrollView>
    </ThemeProvider>
  );
};

export default ArchiveWordsModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
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
  valueText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
