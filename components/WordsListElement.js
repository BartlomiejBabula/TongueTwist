import React, { useState } from "react";
import { StyleSheet, View, Pressable, Vibration } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { myTheme } from "./Theme";
import ProgressBar from "./ProgressBar";
import Animated, {
  Layout,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  SlideInRight,
} from "react-native-reanimated";
import { Icon, ThemeProvider, FAB, Text } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { updateWord } from "../actions/WordsActions";

const WordsListElement = ({ word, nrElement, setEdit, edit }) => {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState(false);
  const [expand, setExpand] = useState(false);
  const height = useSharedValue(81);
  let updateDate = new Date(word.progressUpdated).getDate();
  let today = new Date().getDate();

  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      hight: height.value,
    };
  });

  const progressChange = async (type) => {
    if (type === "+") {
      let newProgress = {
        id: word.id,
        progress: word.progress + 1,
      };
      await dispatch(updateWord(newProgress));
      word.progress = word.progress + 1;
    }
    if (type === "-") {
      let newProgress = {
        id: word.id,
        progress: word.progress - 1,
      };
      await dispatch(updateWord(newProgress));
      word.progress = word.progress - 1;
    }
  };

  return (
    <ThemeProvider theme={myTheme}>
      <Animated.View
        style={[styles.wordContainer, animatedStyle]}
        layout={Layout.springify().stiffness(90).mass(0.6)}
        entering={SlideInRight.duration(150).delay(nrElement * 100)}
      >
        {!edit && (
          <LinearGradient
            colors={myTheme.palette.gradient_2}
            start={{ x: 2, y: 2 }}
            style={{ width: "150%", height: "150%", position: "absolute" }}
          />
        )}
        <Pressable
          onLongPress={() => {
            setEdit({ edit: !edit, element: nrElement });
            Vibration.vibrate();
          }}
          onPress={() => {
            if (!edit) {
              setExpand(!expand);
              if (!expand) {
                height.value = withSpring(310, { stiffness: 100, mass: 0.5 });
              } else
                height.value = withSpring(80, { stiffness: 100, mass: 0.5 });
            }
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={[styles.title, { color: edit ? "#616161" : "white" }]}
              >
                {word.word}
              </Text>
              {ProgressBar(word.progress)}
            </View>
            {!edit ? (
              updateDate !== today ? (
                <View
                  style={{
                    marginRight: 5,
                    height: 65,
                    flexDirection: "row",
                    width: 95,
                    justifyContent: "space-between",
                  }}
                >
                  <FAB
                    disabled={word.progress === 0 && true}
                    size={"small"}
                    color={myTheme.palette.red}
                    icon={{ name: "clear", color: "white" }}
                    onPress={() => progressChange("-")}
                  />
                  <FAB
                    disabled={word.progress === 5 && true}
                    size={"small"}
                    color={myTheme.palette.green}
                    icon={{ name: "check", color: "white" }}
                    onPress={() => progressChange("+")}
                  />
                </View>
              ) : (
                <Text style={styles.title}>Voted today!</Text>
              )
            ) : (
              <View
                style={{
                  alignItems: "center",
                  marginRight: 5,
                  height: 65,
                  flexDirection: "row",
                  width: 90,
                  justifyContent: "space-between",
                }}
              >
                <Icon
                  name='edit'
                  color={myTheme.palette.green}
                  size={34}
                  onPress={() => {
                    console.log("edit");
                  }}
                />
                <Icon
                  name='delete'
                  color={myTheme.palette.red}
                  size={34}
                  onPress={() => {
                    console.log("delete");
                  }}
                />
              </View>
            )}
          </View>
          {expand && !edit && (
            <View
              style={{ width: "100%", marginTop: 16, marginHorizontal: 20 }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    styles.expandText,
                    { width: 150, fontWeight: "bold" },
                  ]}
                >
                  {word.translation}
                </Text>
                {word.pronancuation !== "" && (
                  <Text style={[styles.expandText, { fontWeight: "bold" }]}>
                    "{word.pronancuation}"
                  </Text>
                )}
              </View>
              {word.definition !== "" && (
                <Text
                  style={[styles.expandText, { width: 250, marginTop: 16 }]}
                >
                  {word.definition}
                </Text>
              )}
              <View style={{ width: 250, marginTop: 16, marginBottom: 15 }}>
                {word.examples?.map((example, key) => (
                  <View key={key} style={{ flexDirection: "row" }}>
                    <Text style={styles.expandText}>
                      {"\u2022"}
                      {"  "}
                    </Text>
                    <Text style={styles.expandText}>{example}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Pressable>
      </Animated.View>
    </ThemeProvider>
  );
};

export default WordsListElement;

const styles = StyleSheet.create({
  wordContainer: {
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
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
  expandText: { color: "white", fontSize: 13 },
});
