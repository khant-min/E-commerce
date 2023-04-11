// icons
import { HiMenuAlt1 } from "react-icons/hi";

// custom hooks and types
import useAuth from "../../hooks/useAuth";
import { DataContextProps } from "../../data.types";

// components
import MenuBox from "./MenuBox";

const Menu = () => {
  const { setIsMobileMenu, setFilteredByCategory } =
    useAuth() as DataContextProps;

  return (
    <div className="select">
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
          setFilteredByCategory(e.target.value)
        }
      >
        <MenuBox />
      </select>
      <div className="menu-icon" onClick={() => setIsMobileMenu(true)}>
        <HiMenuAlt1 />
      </div>
    </div>
  );
};

export default Menu;
