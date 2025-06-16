import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import LayoutContainer from "./Pages/ChatPage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import "./functions/firebase/index";
import "./functions/firebase/index";
import { getAuth } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import { HashRouter, Route, Routes } from "react-router";
import Otp from "./Pages/Otp";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  useEffect(() => {
    getAuth().useDeviceLanguage();
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ToastContainer />
        <HashRouter>
          <Routes>
            <Route
              path="/sign-up"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path=""
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/otp"
              element={
                <PublicRoute>
                  <Otp />
                </PublicRoute>
              }
            />
            <Route
              path="/chat"
              element={<PrivateRoute Component={<LayoutContainer />} />}
            />
          </Routes>
        </HashRouter>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
