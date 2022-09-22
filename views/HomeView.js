import React, { useState } from "react";
import { myTheme } from "../components/Theme";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { SearchBar, Icon, Text, ThemeProvider, Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { addWord, updateWord } from "../actions/WordsActions";
import { useDispatch } from "react-redux";
import ProgressBar from "../components/ProgressBar";

const HomeView = ({ userData }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [press, setPress] = useState(false);

  const updateSearch = (search) => {
    setSearch(search);
  };

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
      <ScrollView style={styles.container}>
        <View style={styles.wordContainer}>
          <LinearGradient
            colors={myTheme.palette.gradient_2}
            start={{ x: 2, y: 2 }}
            style={{ width: "150%", height: "150%", position: "absolute" }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.title}>whistle</Text>
              {ProgressBar(2)}
            </View>
            <View
              style={{
                height: 60,
                flexDirection: "row",
                width: 90,
                justifyContent: "space-between",
                marginRight: 40,
              }}
            >
              <Icon
                size={24}
                raised
                containerStyle={(styles.Icon, { opacity: press ? 0.8 : 1 })}
                reverse
                name='clear'
                color={myTheme.palette.red}
                onPressIn={() => {
                  setPress(true);
                }}
                onPress={() => {
                  console.log("red");
                }}
                onPressOut={() => {
                  setPress(false);
                }}
              />
              <Icon
                size={24}
                raised
                containerStyle={(styles.Icon, { opacity: press ? 0.8 : 1 })}
                reverse
                name='check'
                color={myTheme.palette.green}
                onPressIn={() => {
                  setPress(true);
                }}
                onPress={() => {
                  console.log("green");
                }}
                onPressOut={() => {
                  setPress(false);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    marginBottom: 70,
  },
  topbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 50,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  wordContainer: {
    overflow: "hidden",
    backgroundColor: "#F1F1F1",
    minHeight: 80,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 17,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  title: {
    paddingLeft: 5,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 7,
  },
});
