import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Register from "./containers/register/Register";
import Login from "./containers/login/Login";

export default function App() {
  return (
    <div style={{ margin: "20px" }}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
