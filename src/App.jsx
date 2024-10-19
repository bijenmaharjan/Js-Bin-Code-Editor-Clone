import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SavedCode from "./pages/SavedCode";

import New from "./pages/New";
import Console from "./pages/Console";
import Blog from "./pages/Blog";
import Navbars from "./Components/Navbars";

const App = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/:projectId"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={isLoggedIn ? <NoPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/New"
            element={isLoggedIn ? <New /> : <Navigate to="/login" />}
          />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/saved/:projectId"
            element={isLoggedIn ? <SavedCode /> : <Navigate to="/login" />}
          />

          <Route path="/Console" element={<Console />} />
          <Route
            path="/Blog"
            element={isLoggedIn ? <Blog /> : <Navigate to="/login" />}
          />
          <Route path="/nav" element={<Navbars />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
