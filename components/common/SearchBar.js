import React from "react";
import {
  makeStyles,
  useTheme,
  SearchBar as RenuiSearchBar,
} from "@rneui/themed";

export const SearchBar = (props) => {
  const style = useStyles(props);
  const { theme } = useTheme();

  return (
    <RenuiSearchBar
      placeholderTextColor={theme.colors.greyOutline}
      searchIcon={{
        color: theme.colors.greyOutline,
      }}
      cursorColor={theme.colors.primary}
      containerStyle={style.container}
      autoCapitalize={"none"}
      autoCorrect={false}
      inputContainerStyle={style.inputContainer}
      inputStyle={style.input}
      {...props}
    />
  );
};

const useStyles = makeStyles((theme, props) => ({
  container: {
    width: 190,
    backgroundColor: null,
    borderTopWidth: null,
    borderBottomWidth: null,
    padding: 0,
  },
  inputContainer: {
    borderRadius: 30,
    height: 35,
    backgroundColor: theme.mode === "dark" ? "#424242" : "#F5F5F5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1,
  },
  input: {
    fontSize: 16,
    color: theme.mode === "dark" ? theme.colors.greyOutline : "#525252",
  },
}));
