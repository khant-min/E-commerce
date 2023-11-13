import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { Avatar } from "@mui/material";
import "./Header.css";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../context/AuthProvider";
import { AuthContextProps } from "../../types";

export default function Header() {
  const { logout } = useAuth() as AuthContextProps;

  const handleLogout = () => {
    console.log("Logout");
    logout();
  };

  return (
    <header className="p-4 shadow-lg">
      <div className="wrapper" style={{}}>
        <div className="left gap-20">
          <div>
            <h2 className="font-bold text-2xl">Architect</h2>
          </div>
          <div>
            <MenuRoundedIcon />
          </div>
          <div>
            <div>
              <SettingsOutlinedIcon />
              <Typography>Settings</Typography>
            </div>
          </div>
        </div>
        <div className="right gap-20">
          <div>
            <button onClick={handleLogout} className="border-cyan-400">
              Logout
            </button>
          </div>
          <div>
            <Avatar alt="K" src="/static/images/avatar/1.jpg" />
          </div>
          <div>
            <NightlightIcon />
          </div>
          <div>
            <MenuRoundedIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
