import { Routes, Route } from "react-router-dom";
import "./index.css";

const Home = () => {
  return (
    <>
      <h1 className="header">WELCOME TO QUICKPAY</h1>
      <h3>Bank of the free</h3>
      <p>Lorem ipsum dolor sit amet...</p>
    </>
  );
};

const Dashboard = () => {
  return (
    <>
      <h1 className="header">DASHBOARD PAGE</h1>
      <h3>Welcome User</h3>
      <p>Lorem ipsum dolor sit amet...</p>
    </>
  );
};

const Transactions = () => {
  return (
    <>
      <h1 className="header">KEEP TRACK OF YOUR SPENDINGS</h1>
      <h3>Seamless Transactions</h3>
      <p>Lorem ipsum dolor sit amet...</p>
    </>
  );
};

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
        </Routes>
      </section>
    </div>
  );
}
// #23B294
// #5FBD72
// #92C842
