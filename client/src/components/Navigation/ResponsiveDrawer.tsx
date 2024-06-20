import { ReactNode, useContext, useState } from "react";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import AccountMenu from "./AccountMenu";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { PaletteMode } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { AppContext } from "../../store/StoreProvider";
import {
  NavBarItem,
  navBarItems,
  drawerPrivateItems,
  drawerPublicItems,
} from "./navItems";

const drawerWidth = 240;

interface Props {
  children?: ReactNode;
  setSelectedTheme: (theme: PaletteMode) => void;
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#8796A5",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export function ResponsiveDrawer(props: Props) {
  const { children, setSelectedTheme } = props;
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const { loggedIn } = state;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: "url(logo.jpg)",
        }}
      />
      <Divider />
      <List>
        {drawerPublicItems.map(({ value, path, icon }) => (
          <NavBarItem
            icon={icon}
            path={path}
            key={value}
            value={value}
            navigate={navigate}
            onClick={handleDrawerToggle}
          />
        ))}
      </List>
      <Divider />
      {loggedIn && (
        <List>
          {drawerPrivateItems.map(({ value, path, icon }) => (
            <NavBarItem
              key={value}
              path={path}
              icon={icon}
              value={value}
              navigate={navigate}
              onClick={handleDrawerToggle}
            />
          ))}
        </List>
      )}
    </div>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          ml: { sm: `${drawerWidth}px` },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navBarItems.map(({ value, path }) => (
              <Button
                key={value}
                onClick={() => navigate(path)}
                sx={{
                  color: "white",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                {value}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex" }}>
            <MaterialUISwitch
              sx={{ m: 1 }}
              size="small"
              onChange={(evt) =>
                setSelectedTheme(evt.target.checked ? "light" : "dark")
              }
            />
            {loggedIn ? (
              <AccountMenu />
            ) : (
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  color: "white",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                LOGIN
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        aria-label="general pages"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          open={mobileOpen}
          variant="temporary"
          disableScrollLock={true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          ml: { sm: `${drawerWidth}px` },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
