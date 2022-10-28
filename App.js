import { ThemeProvider } from "@rneui/themed";
import Router from "./components/Router";
import { myTheme } from "./components/Theme";
import { Provider } from "react-redux";
import { store } from "./store/AppStore";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={myTheme}>
        <StatusBar style='light' animated={true} />
        <Router />
      </ThemeProvider>
    </Provider>
  );
}
