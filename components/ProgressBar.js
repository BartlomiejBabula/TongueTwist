import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useTheme } from "@rneui/themed";

const ProgressBar = (progress) => {
  const { theme } = useTheme();
  const [newProgress, setNewProgress] = useState(progress);
  useEffect(() => {
    setNewProgress(progress);
  }, [progress]);

  let bars = [
    { progress: false },
    { progress: false },
    { progress: false },
    { progress: false },
    { progress: false },
  ];
  for (let i = 0; i < newProgress; i++) {
    bars[i].progress = true;
  }
  return (
    <View
      style={{
        flexDirection: "row",
        overflow: "hidden",
        marginHorizontal: 4,
        marginVertical: 4,
        height: 15,
        width: 100,
        borderRadius: 30,
        backgroundColor: "#DDDDDD",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 2.23,
        shadowRadius: 2.62,
        elevation: 3,
      }}
    >
      {bars.map((bar, key) => (
        <View
          key={key}
          style={{
            height: 15,
            width: 20,
            backgroundColor: bar.progress
              ? theme.colors.success
              : theme.mode === "dark"
              ? theme.colors.greyOutline
              : theme.colors.disabled,
            borderRightWidth: bars.length !== key + 1 ? 1.3 : 0,
            borderRightColor: "white",
            alignSelf: "center",
          }}
        ></View>
      ))}
    </View>
  );
};

export default ProgressBar;
