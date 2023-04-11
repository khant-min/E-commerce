// icons
import { ImSearch } from "react-icons/im";

// custom hooks and types
import useAuth from "../../hooks/useAuth";
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
