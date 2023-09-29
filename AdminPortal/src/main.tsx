import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageWrapper from "./hoc/PageWrapper.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper children={<App />} />} path="/*" />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
