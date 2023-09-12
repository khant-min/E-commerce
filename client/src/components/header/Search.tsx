import { ImSearch } from "react-icons/im";
import { useAuth } from "../../context/DataContext";
import { DataContextProps } from "../../data.types";

//components
import SearchBox from "./SearchBox";

const Search = () => {
  const { setIsMobileSearch } = useAuth() as DataContextProps;

  return (
    <div className="search">
      <SearchBox />
      <div className="search-icon" onClick={() => setIsMobileSearch(true)}>
        <ImSearch />
      </div>
    </div>
  );
};

export default Search;
