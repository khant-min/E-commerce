export interface DataProviderProps {
  children: React.ReactNode;
}

export interface Data {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface DataContextProps {
  isLoading: boolean;
  data: Data[];
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  searchItem: string;
  setSearchItem: React.Dispatch<React.SetStateAction<string>>;
  filteredByCategory: string;
  setFilteredByCategory: React.Dispatch<React.SetStateAction<string>>;
  isMobileSearch: boolean;
  setIsMobileSearch: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileMenu: boolean;
  setIsMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  detailId: number;
  setDetailId: React.Dispatch<React.SetStateAction<number>>;
  authName: string;
  setAuthName: React.Dispatch<React.SetStateAction<string>>;
}
