import React, { useEffect } from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
import SignUp from "../views/SignupView";
import SignIn from "../views/SigninView";
import Dashboard from "../views/Dashboard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { selectUser } from "../selectors/user";
import { getUserData } from "../actions/LoggingActions";

LogBox.ignoreAllLogs();

const Router = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(async () => {
    dispatch(getUserData());
  }, [dispatch]);

  const isLogged = useSelector((state) => state.user.isLogged);
  return !isLogged ? (
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
      </Routes>
    </NativeRouter>
  );
};

export default Router;
