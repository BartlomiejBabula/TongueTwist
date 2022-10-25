import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Button, Icon, useTheme } from "@rneui/themed";
import { updateWord } from "../actions/WordsActions";
import { useDispatch } from "react-redux";
import Animated, { SlideInLeft } from "react-native-reanimated";

const ArchiveWordsModal = ({ toggleWordsDialog, wordList }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const resetProgress = async (wordID) => {
    let newProgress = {
      id: wordID,
      progress: 0,
    };
    await dispatch(updateWord(newProgress));
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Animated.View entering={SlideInLeft.duration(150)}>
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
        <Text style={styles.text}>
          You can click the button to reset the progress of your learned word
        </Text>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {wordList
            .filter((word) => word.progress === 5)
            .map((word, key) => (
              <View
                key={key}
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
                    color: theme.colors.secondary,
                  }}
                />
              </View>
            ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default ArchiveWordsModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
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
  valueText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    marginHorizontal: 14,
    // fontWeight: "bold",
    fontSize: 16,
    marginBottom: 25,
  },
});
