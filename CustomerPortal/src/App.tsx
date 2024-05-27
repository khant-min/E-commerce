import { Route, Router, Routes } from "react-router-dom";
import Register from "./containers/register/Register";
import Login from "./containers/login/Login";
import AppContainer from "./hoc/AppContainer";
import Home from "./containers/home/Home";
import Products from "./containers/products/Products";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppContainer />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </div>
  );
}
