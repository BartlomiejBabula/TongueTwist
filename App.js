import { StatusBar } from "expo-status-bar";
import Router from "./components/Router";
import { Provider } from "react-redux";
import { store } from "./store/AppStore";
import "react-native-gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar animated={true} />
      <Router />
    </Provider>
  );
}
