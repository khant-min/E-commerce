import { Routes, Route } from "react-router-dom";
import "./index.css";
import User from "./__test__/User";

const Home = () => {
  return <div>home</div>;
};
const Customers = () => {
  return (
    <div>
      <User />
    </div>
  );
};

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </section>
    </div>
  );
}
// #23B294
// #5FBD72
// #92C842
