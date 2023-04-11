// custom hooks and types
import useAuth from "../../hooks/useAuth";
import { DataContextProps } from "../../data.types";
import { useState } from "react";

// components
import Toast from "./Toast";
import Search from "./Search";
import Menu from "./Menu";
import Cart from "./Cart";
import Home from "./Home";
import Slider from "./Slider";

import { TbSettings } from "react-icons/tb";
import Setting from "./Setting";

const Header = () => {
  const { isMobileSearch, isMobileMenu } = useAuth() as DataContextProps;
  const [openSlider, setOpenSlider] = useState<boolean>(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  return (
    <div className="sticky top-0 bg-white z-10">
      <header className="shop-header">
        <div className="flex items-center gap-4">
          <Home />
          <div className="setting" onClick={() => setOpenSetting(true)}>
            <TbSettings />
          </div>
        </div>
        <div className="flex gap-4 md:gap-10 items-center">
          <Search />
          <Menu />
          <Cart setOpenSlider={setOpenSlider} />
        </div>
      </header>
      <div>{openSetting && <Setting setOpenSetting={setOpenSetting} />}</div>
      <div>{openSlider && <Slider setOpenSlider={setOpenSlider} />}</div>
      <div>{(isMobileSearch || isMobileMenu) && <Toast />}</div>
    </div>
  );
};

export default Header;
