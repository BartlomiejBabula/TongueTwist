import { createTheme } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const myTheme = createTheme({
  lightColors: {
    icon: "#333",
    primary: "#6B2C91",
    secondary: "#2E3192",
    background: "white",
    input_background: "#f6f0fa",
    error: "#e76f51",
    gradient: ["#6B2C91", "#2E3192"],
    gradient_2: ["#0034CC", "#6B2C91"],
    gradient_disabled: ["#fcf7ff", "#f6f0fa"],
    menu: "white",
  },
  darkColors: {
    icon: "#F2F2F2",
    primary: "#9b68ba",
    secondary: "#9b68ba",
    background: "#303030",
    input_background: "#424242",
    error: "#e76f51",
    gradient: ["#9b68ba", "#6b358c"],
    gradient_2: ["#303030", "#212121"],
    gradient_disabled: ["#fcf7ff", "#f6f0fa"],
    menu: "#212121",
  },

  mode: "light",

  components: {
    // Input: (props) => ({
    //   placeholderTextColor:
    //     myTheme.mode === "dark"
    //       ? myTheme.lightColors.greyOutline
    //       : myTheme.lightColors.grey3,
    //   autoCapitalize: "none",
    //   autoCorrect: false,
    //   cursorColor:
    //     myTheme.mode === "dark"
    //       ? myTheme.darkColors.primary
    //       : myTheme.lightColors.primary,
    //   labelStyle: {
    //     fontSize: 14,
    //     marginBottom: 2,
    //     marginLeft: 10,
    //     color:
    //       myTheme.mode === "dark"
    //         ? myTheme.lightColors.greyOutline
    //         : myTheme.lightColors.grey3,
    //   },
    //   errorStyle: {
    //     marginTop: 2,
    //     marginLeft: 10,
    //     color: "#e76f51",
    //     fontWeight: "bold",
    //   },
    //   inputStyle: {
    //     paddingHorizontal: 10,
    //     color: myTheme.mode === "dark" ? myTheme.darkColors.black : "#4B4B4B",
    //     fontSize: 16,
    //     height: 45,
    //   },
    //   inputContainerStyle: {
    //     borderBottomWidth: 0,
    //     backgroundColor: myTheme.mode === "dark" ? "#424242" : "#f6f0fa",
    //     borderRadius: 14,
    //   },
    // }),

    // Divider: () => ({
    //   color: myTheme.mode === "dark" ? "#505050" : null,
    // }),

    // SearchBar: () => ({
    //   containerStyle: {
    //     width: 190,
    //     backgroundColor: null,
    //     borderTopWidth: null,
    //     borderBottomWidth: null,
    //     padding: 0,
    //   },
    //   inputContainerStyle: {
    //     borderRadius: 30,
    //     height: 35,
    //     backgroundColor: myTheme.mode === "dark" ? "#424242" : "#F5F5F5",
    //     shadowColor: "#000",
    //     shadowOffset: {
    //       width: 0,
    //       height: 2,
    //     },
    //     shadowOpacity: 0.23,
    //     shadowRadius: 2.62,
    //     elevation: 1,
    //   },
    //   inputStyle: {
    //     fontSize: 16,
    //   },
    // }),
    Dialog: () => ({
      overlayStyle: {
        backgroundColor: myTheme.mode === "dark" ? "#212121" : "white",
        maxHeight: "60%",
        width: "90%",
      },
    }),
    Icon: () => ({
      underlayColor: myTheme.mode === "dark" ? "#212121" : "white",
    }),
  },
});

export const setTheme = async (setMode, newTheme) => {
  let theme = await AsyncStorage.getItem("theme");
  if (newTheme) {
    theme = newTheme;
    AsyncStorage.setItem("theme", newTheme);
  }
  setMode(theme);
};
