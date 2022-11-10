import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import { Text, useTheme } from "@rneui/themed";
import { SearchBar } from "../components/common/SearchBar";
import WordsListElement from "../components/WordsListElement";
import Animated, {
  FadeIn,
  Keyframe,
  FadeOut,
  Layout,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { selectWordsList, selectPage } from "../selectors/user";
import { useDispatch } from "react-redux";
import { updateWordsList, updatePage } from "../actions/WordsActions";

const MyWords = () => {
  const { theme } = useTheme();
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

  useEffect(() => {
    if (myWords.length > 20) {
      if (loadingWords) {
        let pageUp = page + 1;
        dispatch(updatePage(pageUp));
        dispatch(updateWordsList(pageUp));
      }
    }
  }, [loadingWords]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("TongueTwist", "Are you sure you want to exit app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
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
      <View style={styles.topbar}>
        {theme.mode === "dark" ? (
          <Image
            resizeMode='center'
            style={{ height: 38, width: 38 }}
            source={require("../pictures/logo_dark.png")}
          />
        ) : (
          <Image
            resizeMode='center'
            style={{ height: 38, width: 38 }}
            source={require("../pictures/logo.png")}
          />
        )}
        <SearchBar
          placeholder='Search word...'
          onChangeText={updateSearch}
          value={search}
          rightIcon
        />
      </View>
      <Animated.ScrollView
        onScroll={(e) => {
          if (myWords.length > 20) {
            if (
              e.nativeEvent.contentOffset.y +
                e.nativeEvent.layoutMeasurement.height >=
              e.nativeEvent.contentSize.height * 0.999
            ) {
              setLoadingWords(true);
            } else {
              setLoadingWords(false);
            }
          }
        }}
      >
        {myWords
          ?.filter((word) => word.word.match(new RegExp(search, "i")))
          .filter((word) => word.progress !== 5)
          .map((word, key) => (
            <Animated.View
              layout={Layout.springify().stiffness(90).mass(0.6)}
              key={key}
              style={{
                marginVertical: edit.edit && edit.element === key ? 15 : 0,
              }}
            >
              <WordsListElement
                edit={edit.edit && edit.element === key ? true : false}
                checkEdit={edit.edit}
                nrElement={key}
                word={word}
                setEdit={setEdit}
              />
            </Animated.View>
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
    </>
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
