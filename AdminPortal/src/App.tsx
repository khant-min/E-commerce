import { Routes, Route } from "react-router-dom";
import "./index.css";
import User from "./__test__/User";
import { HomePage, CustomersPage } from "./containers";

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/users" element={<User />} />
        </Routes>
      </section>
    </div>
  );
}
// #23B294
// #5FBD72
// #92C842
