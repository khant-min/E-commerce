import { Route, Routes } from "react-router-dom";
import Home from "./containers/home/Home";
import Login from "./containers/login/Login";
import ProductDetail from "./containers/products/ProductDetail";
import Products from "./containers/products/Products";
import Register from "./containers/register/Register";
import AppContainer from "./hoc/AppContainer";
import Checkout from "./containers/checkout/Checkout";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppContainer />}>
          {/* these guys will be rendered in the place of Outlet */}
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}
