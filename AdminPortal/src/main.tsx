import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageWrapper from "./hoc/PageWrapper.tsx";
import Login from "./containers/LoginPage/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
import { DataProvider } from "./context/DataProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PageWrapper children={<App />} />} path="/*" />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </Provider>
  </React.StrictMode>
);
