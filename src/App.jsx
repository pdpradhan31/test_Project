import React from "react";
import { Signup, Login, Homepage } from "./pages";
import { Routes, Route } from "react-router-dom";
import './App.css'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/homepage"} element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
