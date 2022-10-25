import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@rneui/themed";
import Router from "./components/Router";
import { myTheme } from "./components/Theme";
import { Provider } from "react-redux";
import { store } from "./store/AppStore";
import "react-native-gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar animated={true} />
      <ThemeProvider theme={myTheme}>
        <Router />
      </ThemeProvider>
    </Provider>
  );
}
