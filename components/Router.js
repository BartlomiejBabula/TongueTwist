import React, { useEffect } from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
import SignUp from "../views/SignupView";
import SignUpInfo from "../views/SignupInfoView";
import SignIn from "../views/SigninView";
import Dashboard from "../views/Dashboard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { selectWordsList } from "../selectors/user";
import { getUserData } from "../actions/LoggingActions";
import * as NavigationBar from "expo-navigation-bar";
import LoadingView from "../views/LoadingView";
import { setTheme } from "../components/Theme";
import { useThemeMode } from "@rneui/themed";

LogBox.ignoreAllLogs();

const Router = () => {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const isLogged = useSelector(selectWordsList);
  const { mode, setMode } = useThemeMode();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    setTheme(setMode);
    if (isLogged !== undefined) {
      setLoading(false);
    }
  }, [isLogged]);

  NavigationBar.setVisibilityAsync("hidden");
  return loading ? (
    <LoadingView />
  ) : isLogged ? (
    <NativeRouter>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Routes>
          <Route path='/*' exact element={<Dashboard />} />
        </Routes>
      </GestureHandlerRootView>
    </NativeRouter>
  ) : (
    <NativeRouter>
      <Routes>
        <Route path='/' exact element={<SignIn />} />
        <Route path='/Register' exact element={<SignUp />} />
        <Route path='/CreatedAccountView' exact element={<SignUpInfo />} />
      </Routes>
    </NativeRouter>
  );
};

export default Router;
