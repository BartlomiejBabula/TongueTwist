import React, { useState, useEffect } from "react";
import { myTheme } from "../components/Theme";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { SearchBar, ThemeProvider, Text } from "@rneui/themed";
import WordsListElement from "../components/WordsListElement";
import Animated, { FadeIn, Keyframe, FadeOut } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { selectWordsList, selectPage } from "../selectors/user";
import { useDispatch } from "react-redux";
import { updateWordsList, updatePage } from "../actions/WordsActions";

const MyWords = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const [edit, setEdit] = useState({ edit: false, element: 0 });
  const [search, setSearch] = useState("");
  const [loadingWords, setLoadingWords] = useState(false);

  let myWords = useSelector(selectWordsList);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const keyframe = new Keyframe({
    0: {
      opacity: 0,
    },
    30: {
      opacity: 1,
    },
    70: {
      opacity: 1,
    },
    100: {
      opacity: 0,
    },
  });

  useEffect(() => {
    if (search !== "") {
    }
  }, [search]);

  useEffect(async () => {
    if (loadingWords) {
      let pageUp = page + 1;
      await dispatch(updatePage(pageUp));
      await dispatch(updateWordsList(pageUp));
    }
  }, [loadingWords]);

  return (
    <ThemeProvider theme={myTheme}>
      <View style={styles.topbar}>
        <Image
          resizeMode='center'
          style={{ height: 42, width: 42 }}
          source={require("../pictures/logo.png")}
        />
        <SearchBar
          placeholder='Search word...'
          onChangeText={updateSearch}
          value={search}
          rightIcon
        />
      </View>
      <Animated.ScrollView
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        onScroll={(e) => {
          if (
            e.nativeEvent.contentOffset.y +
              e.nativeEvent.layoutMeasurement.height >=
            e.nativeEvent.contentSize.height * 0.999
          ) {
            setLoadingWords(true);
          } else {
            setLoadingWords(false);
          }
        }}
      >
        {myWords
          ?.filter((word) => word.word.match(new RegExp(search, "i")))
          .map((word, key) => (
            <View
              key={key}
              style={{
                marginVertical: edit.edit && edit.element === key ? 15 : 0,
              }}
            >
              <WordsListElement
                edit={edit.edit && edit.element === key ? true : false}
                nrElement={key}
                word={word}
                setEdit={setEdit}
              />
            </View>
          ))}

        <View style={{ minHeight: 40 }}>
          {loadingWords && (
            <Animated.View
              entering={keyframe.duration(1500)}
              style={styles.loadingContainer}
            >
              <Text style={styles.loading}>Loading...</Text>
            </Animated.View>
          )}
        </View>
      </Animated.ScrollView>
    </ThemeProvider>
  );
};

export default MyWords;

const styles = StyleSheet.create({
  topbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 50,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  loading: {
    marginVertical: 5,
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 0.5,
    fontWeight: "bold",
    color: "#C1C1C1",
  },
});
