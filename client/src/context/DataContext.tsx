// imports from react
import { createContext, useState, useEffect } from "react";
import axios from "axios";

// types
import { DataProviderProps, Data, DataContextProps } from "../data.types";

const DataContext = createContext<DataContextProps | null>(null);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<Data[]>([]);
  const [searchItem, setSearchItem] = useState<string>("");
  const [filteredByCategory, setFilteredByCategory] = useState<string>("");
  const [isMobileSearch, setIsMobileSearch] = useState<boolean>(false);
  const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detailId, setDetailId] = useState<number>(0);
  const [authName, setAuthName] = useState<string>("");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <DataContext.Provider
      value={{
        isLoading,
        data,
        setData,
        searchItem,
        setSearchItem,
        filteredByCategory,
        setFilteredByCategory,
        isMobileSearch,
        setIsMobileSearch,
        isMobileMenu,
        setIsMobileMenu,
        detailId,
        setDetailId,
        authName,
        setAuthName,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

// remember to use auth as another context using useReducer hook!!!
