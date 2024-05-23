import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { Avatar } from "@mui/material";
import "./Header.css";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthProvider";
import { AuthContextProps } from "../../types";
import { Link } from "react-router-dom";

export default function Header() {
  const { logout } = useAuth() as AuthContextProps;

  const handleLogout = () => {
    console.log("Logout");
    logout();
  };

  return (
    <header className="py-2.5 px-4 shadow-lg">
      <div className="wrapper" style={{}}>
        <div className="left gap-20">
          <h2 className="ml-20 font-semibold text-xl">E-com</h2>
          <div>
            <div>
              {/* <SettingsOutlinedIcon /> */}
              {/* <Typography>Settings</Typography> */}
            </div>
          </div>
        </div>
        <div className="right gap-16">
          <div>
            <Link to="/profile">
              <PersonIcon />
            </Link>
          </div>
          <div>
            <button onClick={handleLogout} className="border-cyan-400">
              <LogoutIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
