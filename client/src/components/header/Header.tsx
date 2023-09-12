import { useAuth } from "../../context/DataContext";
import { DataContextProps } from "../../types";
import { useState } from "react";
import Toast from "./Toast";
import Search from "./Search";
import Menu from "./Menu";
import Cart from "./Cart";
import Home from "./Home";
import Slider from "./Slider";
import { TbSettings } from "react-icons/tb";
import Setting from "./Setting";
import "react-modern-drawer/dist/index.css";

const Header = () => {
  const { isMobileSearch, isMobileMenu } = useAuth() as DataContextProps;
  const [openSlider, setOpenSlider] = useState<boolean>(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const toggleDrawer = () => {
    setOpenSlider(prevState => !prevState);
  };

  const toggleSettingDrawer = () => {
    setOpenSetting(prevState => !prevState);
  };

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
          <Cart toggleDrawer={toggleDrawer} />
        </div>
      </header>
      <div>
        {
          <Setting
            toggleSettingDrawer={toggleSettingDrawer}
            openSetting={openSetting}
          />
        }
      </div>
      <div>
        {<Slider toggleDrawer={toggleDrawer} openSlider={openSlider} />}
      </div>
      <div>{(isMobileSearch || isMobileMenu) && <Toast />}</div>
    </div>
  );
};

export default Header;
