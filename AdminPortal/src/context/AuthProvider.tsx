import { createContext, useMemo, useContext, useState } from "react";
import {
  ChildrenProps,
  AuthContextProps,
  UserCredentials,
  StoredUserCredentials,
} from "../types";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext<AuthContextProps | null>(null);

// This provider will have important and small providers e.g.. auth, theme
export const DataProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useLocalStorage<StoredUserCredentials | null>(
    "user",
    null
  );
  const [auth, setAuth] = useState<any>();
  const navigate = useNavigate();

  // show noti here...
  const login = async (data: UserCredentials) => {
    try {
      const response = await UserService.login(data);
      setUser(response.data);
      // setAuth(user);
      // console.log("user: ", user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      auth,
      setAuth,
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
