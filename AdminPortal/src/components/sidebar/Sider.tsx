import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import {
  Home,
  TrendingUp,
  Explore,
  Star,
  Settings,
  Menu,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PeopleIcon from "@mui/icons-material/People";

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const drawerWidth = isOpen ? 240 : 60;

  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <Drawer
        variant="permanent"
        open={isOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: 0.5,
            justifyContent: "space-between",
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          }}
        >
          <IconButton onClick={toggleDrawer}>
            {isOpen ? <MenuOpenIcon /> : <Menu />}
          </IconButton>
          {isOpen && <h2 className="ml-20 font-semibold text-xl">E-com</h2>}
        </Box>
        <List>
          <Link to="/">
            <NavItem icon={<Home />} label="Home" isOpen={isOpen} />
          </Link>
          <Link to="/users">
            <NavItem icon={<TrendingUp />} label="Trending" isOpen={isOpen} />
          </Link>
          <Link to="/customers">
            <NavItem icon={<PeopleIcon />} label="Customers" isOpen={isOpen} />
          </Link>
          <Link to="/explore">
            <NavItem icon={<Explore />} label="Explore" isOpen={isOpen} />
          </Link>
          <Link to="/create">
            <NavItem icon={<Explore />} label="Add New" isOpen={isOpen} />
          </Link>
          <Link to="/products">
            <NavItem icon={<Star />} label="Products" isOpen={isOpen} />
          </Link>
          <Link to="/settings">
            <NavItem icon={<Settings />} label="Settings" isOpen={isOpen} />
          </Link>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <div>{children}</div>
      </Box>
    </Box>
  );
};

type NavItemProps = {
  icon: React.ReactElement;
  label: string;
  isOpen: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, isOpen }) => {
  return (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      {isOpen && <ListItemText primary={label} />}
    </ListItem>
  );
};

export default Sidebar;
