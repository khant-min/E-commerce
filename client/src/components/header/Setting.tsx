import { VscChromeClose } from "react-icons/vsc";
import { TbSettings } from "react-icons/tb";

import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { DataContextProps } from "../../data.types";

interface SettingProps {
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

const Setting = ({ setOpenSetting }: SettingProps) => {
  const { authName } = useAuth() as DataContextProps;
  return (
    <section className="setting-page  fixed inset-0 z-10 bg-[#0000009d] m-auto">
      <div className="absolute left-0 bg-white w-[300px] h-full p-2">
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-2 text-xl">
            <TbSettings className="text-blue-600" />
            <h1>Setting</h1>
          </div>
          <button className="x" onClick={() => setOpenSetting(false)}>
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
      </div>
    </section>
  );
};

export default Setting;
