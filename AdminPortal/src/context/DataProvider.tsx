import { createContext, useMemo, useContext } from "react";
import { ChildrenProps, DataContextProps, UserCredentials } from "../types";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const DataContext = createContext<DataContextProps | null>(null);

// This provider will have important and small providers e.g.. auth, theme
export const DataProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useLocalStorage("user", null);
  console.log("user in provider: ", user);
  // const [auth, setAuth] = useState({}) // for refresh token case
  const navigate = useNavigate();

  // show noti here...
  const login = async (data: UserCredentials) => {
    try {
      const response = await UserService.login(data);
      console.log("response user", response);
      setUser(response.data);
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
    }),
    []
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
export default DataContext;
