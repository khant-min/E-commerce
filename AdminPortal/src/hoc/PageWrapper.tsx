import { useEffect } from "react";
import Header from "../components/header/Header";
import Sider from "../components/sidebar/Sider";
import { ChildrenProps } from "../types";
import AuthService from "../services/AuthService";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store/store";

export default function PageWrapper({ children }: ChildrenProps) {
  const accessToken = useAppSelector(state => state.auth.accessToken);

  const handleRefresh = async () => {
    try {
      await AuthService.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin === "Y") {
      console.log("res");
      handleRefresh();
    }
  }, []);

  // if (!accessToken) {
  //   return <Navigate to={"/login"} />;
  // }

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
