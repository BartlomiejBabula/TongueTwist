import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, Vibration, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { myTheme } from "./Theme";
import ProgressBar from "./ProgressBar";
import EditWordModal from "./EditWordModal";
import Animated, {
  Layout,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  SlideInRight,
} from "react-native-reanimated";
import { Icon, ThemeProvider, FAB, Text, Dialog, Button } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { updateWord, deleteWord } from "../actions/WordsActions";

const WordsListElement = ({ word, nrElement, setEdit, edit }) => {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const height = useSharedValue(81);
  let updateDate = new Date(word.progressUpdated).getDate();
  let today = new Date().getDate();

  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      hight: height.value,
    };
  });

  useEffect(() => {
    setEdit({ edit: false, element: nrElement });
  }, [expand]);

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

  const toggleDeleteDialog = () => {
    setDeleteDialog(!deleteDialog);
  };

  const toggleEditModal = () => {
    setEditModal(!editModal);
    setEdit({ edit: false, element: nrElement });
  };

  const deleteThisWord = async () => {
    await dispatch(deleteWord(word.id));
    toggleDeleteDialog();
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
                {word.word.toLowerCase()}
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
                  onPress={toggleEditModal}
                />
                <Icon
                  name='delete'
                  color={myTheme.palette.red}
                  size={34}
                  onPress={toggleDeleteDialog}
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
      <Dialog isVisible={deleteDialog} onBackdropPress={toggleDeleteDialog}>
        <Dialog.Title title={`Delete`} />
        <Text style={{ marginBottom: 20 }}>
          Are you sure you want to delete "{word.word}"?
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            containerStyle={{ width: 70 }}
            title='YES'
            type='clear'
            titleStyle={{
              color: myTheme.palette.secondary,
            }}
            onPress={deleteThisWord}
          />
          <Button
            containerStyle={{ width: 70 }}
            title='NO'
            type='clear'
            titleStyle={{
              color: myTheme.palette.secondary,
            }}
            onPress={toggleDeleteDialog}
          />
        </View>

        <Icon
          size={20}
          underlayColor={"white"}
          type='material-community'
          color={myTheme.palette.secondary}
          name={"close"}
          onPress={toggleDeleteDialog}
          containerStyle={{ position: "absolute", top: 8, right: 8 }}
        />
      </Dialog>
      <Modal
        animationType='slide'
        visible={editModal}
        onRequestClose={toggleEditModal}
      >
        <EditWordModal toggleEditModal={toggleEditModal} word={word} />
      </Modal>
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
