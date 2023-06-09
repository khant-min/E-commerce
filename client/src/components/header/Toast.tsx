// icons
import { VscChromeClose } from "react-icons/vsc";

// custom hooks and types
import useAuth from "../../hooks/useAuth";
import { DataContextProps } from "../../data.types";

// components
import SearchBox from "./SearchBox";
import MenuBox from "./MenuBox";

const Toast = () => {
  const {
    isMobileSearch,
    setIsMobileSearch,
    isMobileMenu,
    setIsMobileMenu,
    setFilteredByCategory,
  } = useAuth() as DataContextProps;

  return (
    <div className="toast">
      {isMobileSearch && (
        <section className="toast-search">
          <SearchBox />
          <button onClick={() => setIsMobileSearch(false)}>
            <VscChromeClose />
          </button>
        </section>
      )}
      {isMobileMenu && (
        <section className="toast-menu">
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
              setFilteredByCategory((e.target as HTMLSelectElement).value); // a little weird here 😆
              setIsMobileMenu(false);
            }}
          >
            <MenuBox />
          </div>
          <button onClick={() => setIsMobileMenu(false)}>
            <VscChromeClose />
          </button>
        </section>
      )}
    </div>
  );
};

export default Toast;
