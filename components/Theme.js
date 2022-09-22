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
  },
  Icon: {
    size: 30,
    color: "#777777",
  },

  Avatar: {
    containerStyle: {
      backgroundColor: "#0086d0",
    },
  },
  Input: {
    labelStyle: {
      color: "black",
      fontWeight: "normal",
      fontSize: 13,
      marginBottom: 3,
      marginLeft: 24,
    },
    errorStyle: { marginLeft: 24, marginTop: 3 },
    inputStyle: {
      fontSize: 16,
      padding: 1,
      paddingLeft: 16,
      height: 45,
    },
    inputContainerStyle: {
      borderBottomWidth: 0,
      backgroundColor: "#FBFBFB",
      borderRadius: 30,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
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
});
