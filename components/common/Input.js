import React from "react";
import { makeStyles, useTheme, Input as RenuiInput } from "@rneui/themed";

export const Input = (props) => {
  const style = useStyles(props);
  const { theme } = useTheme();

  return (
    <RenuiInput
      inputContainerStyle={style.container}
      placeholderTextColor={
        theme.mode === "dark" ? theme.colors.greyOutline : theme.colors.grey3
      }
      autoCapitalize={"none"}
      autoCorrect={false}
      cursorColor={theme.colors.primary}
      labelStyle={style.label}
      errorStyle={style.error}
      inputStyle={props.multiline ? style.inputMultiline : style.input}
      ref={props.inputRef}
      {...props}
    />
  );
};

const useStyles = makeStyles((theme, props) => ({
  container: {
    borderBottomWidth: 0,
    backgroundColor: theme.mode === "dark" ? "#424242" : "#f6f0fa",
    borderRadius: 14,
  },
  label: {
    fontSize: 14,
    marginBottom: 2,
    marginLeft: 10,
    color:
      theme.mode === "dark" ? theme.colors.greyOutline : theme.colors.grey3,
  },
  error: { marginTop: 2, marginLeft: 10, color: "#e76f51", fontWeight: "bold" },
  input: {
    color: theme.mode === "dark" ? theme.colors.black : "#4B4B4B",
    fontSize: 16,
    height: 45,
    marginHorizontal: 10,
  },
  inputMultiline: {
    color: theme.mode === "dark" ? theme.colors.black : "#4B4B4B",
    fontSize: 16,
    height: 45,
    marginHorizontal: 10,
    height: props.height ? props.height : 60,
    textAlignVertical: "top",
    marginVertical: 5,
  },
}));
