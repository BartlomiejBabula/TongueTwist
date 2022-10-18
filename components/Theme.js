import { createTheme, darkColors } from "@rneui/themed";

export const myTheme = createTheme({
  palette: {
    primary: "#6B2C91",
    secondary: "#2E3192",
    grey: "#F5F5F5",
    red: "#e76f51",
    green: "#3CEC10",
    gradient: ["#6B2C91", "#2E3192"],
    gradient_2: ["#0034CC", "#6B2C91"],
    gradient_disabled: ["#fcf7ff", "#f6f0fa"],
  },

  Avatar: {
    containerStyle: {
      backgroundColor: "#0086d0",
    },
  },
  Input: {
    cursorColor: "#6B2C91",
    labelStyle: {
      fontSize: 14,
      marginBottom: 2,
      marginLeft: 10,
    },
    errorStyle: {
      marginTop: 2,
      marginLeft: 10,
      color: "#e76f51",
      fontWeight: "bold",
    },
    inputStyle: {
      paddingHorizontal: 10,
      color: "#4B4B4B",
      fontSize: 16,
      height: 45,
    },
    inputContainerStyle: {
      borderBottomWidth: 0,
      backgroundColor: "#f6f0fa",
      borderRadius: 14,
    },
  },

  SearchBar: {
    containerStyle: {
      width: 190,
      backgroundColor: null,
      borderTopWidth: null,
      borderBottomWidth: null,
      padding: 0,
    },
    inputContainerStyle: {
      borderRadius: 30,
      height: 35,
      backgroundColor: "#F5F5F5",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 1,
    },
    inputStyle: {
      fontSize: 16,
    },
  },

  Dialog: {
    overlayStyle: {
      maxHeight: "60%",
      width: "90%",
    },
  },
});
