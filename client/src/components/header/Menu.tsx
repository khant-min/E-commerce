import { HiMenuAlt1 } from "react-icons/hi";
import { useAuth } from "../../context/DataContext";
import { DataContextProps } from "../../data.types";
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
