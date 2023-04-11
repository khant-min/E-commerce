import { useContext } from "react";
import DataContext from "../context/DataContext";

const useAuth = () => {
  return useContext(DataContext);
};

export default useAuth;
