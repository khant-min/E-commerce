import { createContext, useState, useMemo, useContext } from "react";
import { ChildrenProps } from "../types";

const DataContext = createContext({});

// This provider will have important and small providers e.g.. auth, theme
export const DataProvider = ({ children }: ChildrenProps) => {
  const [auth, setAuth] = useState({});

  const value = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    []
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useAuth = () => useContext(DataContext);
export default DataContext;
