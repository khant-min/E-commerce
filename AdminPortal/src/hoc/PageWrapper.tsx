import { Navigate } from "react-router-dom";
import Header from "../components/header/Header";
import Sider from "../components/sidebar/Sider";
import { useData } from "../context/DataProvider";
import { ChildrenProps, DataContextProps } from "../types";

export default function PageWrapper({ children }: ChildrenProps) {
  const { user } = useData() as DataContextProps;
  console.log("user", user);
  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sider />
        <div style={{ width: "100%" }}>{children}</div>
      </div>
    </div>
  );
}
