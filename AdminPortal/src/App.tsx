import { Routes, Route } from "react-router-dom";
import "./index.css";
import useRefreshToken from "./hooks/useRefreshToken";
import { Button } from "@mui/material";

const Home = () => {
  const refresh = useRefreshToken();
  return (
    <div>
      <Button
        onClick={() => {
          console.log("called");
          refresh();
          console.log("called 2");
        }}
      >
        Refresh!
      </Button>
    </div>
  );
};

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </section>
    </div>
  );
}
// #23B294
// #5FBD72
// #92C842
