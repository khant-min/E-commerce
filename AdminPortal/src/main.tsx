import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageWrapper from "./hoc/PageWrapper.tsx";
import LoginPage from "./containers/LoginPage/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
import { DataProvider } from "./context/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DataProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PageWrapper children={<App />} />} path="/*" />
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
