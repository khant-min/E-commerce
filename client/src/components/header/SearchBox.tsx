import { useAuth } from "../../context/DataContext";
import { DataContextProps } from "../../types";

const SearchBox = () => {
  const { searchItem, setSearchItem } = useAuth() as DataContextProps;

  return (
    <>
      <label htmlFor="search">Search Items</label>
      <input
        type="text"
        id="search"
        placeholder="Search"
        value={searchItem}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setSearchItem(e.target.value)
        }
      />
    </>
  );
};

export default SearchBox;
