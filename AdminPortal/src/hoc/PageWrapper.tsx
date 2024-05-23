import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/header/Header";
import Sider from "../components/sidebar/Sider";
import { useAuth } from "../context/AuthProvider";
import { ChildrenProps, AuthContextProps } from "../types";

export default function PageWrapper({ children }: ChildrenProps) {
  const { user, setAuth } = useAuth() as AuthContextProps;

  // if (!user) return <Navigate to="/login" />;

  useEffect(() => {
    setAuth(user);
  }, []);

  return (
    <div>
      <Header />
      <div className="w-full flex gap-10">
        <Sider>{children}</Sider>
      </div>
    </div>
  );
}
