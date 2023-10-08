import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link } from "react-router-dom";

export default function Sider() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        className="app"
        style={{
          padding: "0rem",
          margin: "0rem",
        }}
        backgroundColor="inherith"
      >
        <Menu
        // menuItemStyles={{
        //   button: ({ level, active }) => {
        //     if (level === 0 || level === 1) {
        //       return {
        //         backgroundColor: active ? "white" : undefined,
        //         color: active ? "white" : undefined,
        //         "&:hover": {
        //           backgroundColor: "#F4FAFC",
        //           color: "white",
        //         },
        //       };
        //     }
        //   },
        // }}
        >
          {/* <MenuItem
            component={<Link to="/" className="link" />}
            className="menu1"
            suffix={<MenuRoundedIcon />}
          >
            <h2>E-STORE</h2>
          </MenuItem> */}
          <SubMenu label="Menu" icon={<WalletRoundedIcon />}>
            <MenuItem
              component={<Link to="dashboard" className="link" />}
              icon={<GridViewRoundedIcon />}
            >
              Dashboard
            </MenuItem>
            <MenuItem icon={<ReceiptRoundedIcon />}> Invoices </MenuItem>
          </SubMenu>

          <SubMenu label="Charts" icon={<BarChartRoundedIcon />}>
            <MenuItem icon={<TimelineRoundedIcon />}> Timeline Chart </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}>Bubble Chart</MenuItem>
          </SubMenu>
          <SubMenu label="Wallets" icon={<WalletRoundedIcon />}>
            <MenuItem icon={<AccountBalanceRoundedIcon />}>
              Current Wallet
            </MenuItem>
            <MenuItem icon={<SavingsRoundedIcon />}>Savings Wallet</MenuItem>
            <MenuItem
              component={<Link to="transactions" className="link" />}
              icon={<MonetizationOnRoundedIcon />}
            >
              Transactions
            </MenuItem>
          </SubMenu>
          <SubMenu label="Settings" icon={<SettingsApplicationsRoundedIcon />}>
            <MenuItem icon={<AccountCircleRoundedIcon />}> Account </MenuItem>
            <MenuItem icon={<ShieldRoundedIcon />}> Privacy </MenuItem>
            <MenuItem icon={<NotificationsRoundedIcon />}>
              Notifications
            </MenuItem>
            <MenuItem icon={<LogoutRoundedIcon />}> Logout </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}
