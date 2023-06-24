import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./scenes/Home";
import Login from "./scenes/Login";
import Profile from "./scenes/Profile";
import { useSelector, useDispatch } from "react-redux";
import { setLogout, setLogin } from "./state";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import API from "./axiosConfig.js";
import Error from "./scenes/Error";
const App = () => {
  const mode = useSelector((state) => state.mode);
  const [isAuth, setAuth] = useState(null);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.token) {
      API.get("/auth/isAuthenticated")
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch(setLogin(res.data));
          setAuth(true);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            dispatch(setLogout());
            setAuth(false);
          }
        });
    }
  }, [isAuth]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {isAuth === true ? <NavBar /> : <></>}
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login isAuth={isAuth} />} />
            <Route
              path="/home"
              element={isAuth === true ? <Home /> : <Navigate to="/" />}
            />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route component={Error} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
