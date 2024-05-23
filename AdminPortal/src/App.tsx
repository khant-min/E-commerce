import { Routes, Route } from "react-router-dom";
import "./index.css";
import User from "./__test__/User";
import { Dashboard, CustomersPage, ProductPage } from "./containers";
import CreateProduct from "./containers/NewProduct";

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <section className="w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/create" element={<CreateProduct />} />
        </Routes>
      </section>
    </div>
  );
}
// #23B294
// #5FBD72
// #92C842

// need to resolve token bugs later
