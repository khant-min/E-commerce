import { VscChromeClose } from "react-icons/vsc";
import { TbSettings } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/DataContext";
import { DataContextProps } from "../../types";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

interface SettingProps {
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

const Setting = ({ openSetting, toggleSettingDrawer }: any) => {
  const { authName } = useAuth() as DataContextProps;
  return (
    <Drawer open={openSetting} onClose={toggleSettingDrawer} direction="left">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-2 text-xl">
          <TbSettings className="text-blue-600" />
          <h1>Setting</h1>
        </div>
        <button className="x" onClick={toggleSettingDrawer}>
          <VscChromeClose />
        </button>
      </div>
      <hr />

      <ul className="configurations">
        <li>
          {authName ? (
            <div>
              <Link to="profile">{authName}</Link>
              {/* here is profile */}
            </div>
          ) : (
            <Link to="account">Account</Link>
          )}
        </li>
        <li>Light Dark</li>
        <li>Global chat</li>
        <li>
          <Link to="mail">Contact Us</Link>
        </li>
      </ul>
    </Drawer>
  );
};

export default Setting;
