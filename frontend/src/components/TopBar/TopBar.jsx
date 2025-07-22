import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

import { ROUTES } from "../../constants/routes";
import { useTopBar } from "./TopBarHook";

const TopBar = () => {
  const {
    navigate,
    handleClose,
    handleMenu,
    anchorEl,
    cartTotal,
    handleLogout,
    isAdmin,
    userData,
  } = useTopBar();

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            to={ROUTES.PRODUCTS}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            KatAlten
          </Link>
        </Typography>
        {!isAdmin && (
          <Grid container spacing={1}>
            <IconButton
              size="medium"
              color="inherit"
              onClick={() => navigate(ROUTES.FAVORITES)}
              disabled
            >
              <Heart size={25} />
            </IconButton>
            <IconButton
              size="medium"
              color="inherit"
              // onClick={() => navigate(ROUTES.CART)}
            >
              <Badge badgeContent={cartTotal} color="secondary">
                <ShoppingCart size={25} />
              </Badge>
            </IconButton>
          </Grid>
        )}
        <Box sx={{ ml: 2 }}>
          <IconButton size="medium" onClick={handleMenu} color="inherit">
            <Avatar alt="User Avatar">
              {`${userData?.firstName?.[0] || ""}${
                userData?.lastName?.[0] || ""
              }`}
            </Avatar>
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleClose}>Mon profile</MenuItem>
            <MenuItem onClick={handleClose}>Mon Compte</MenuItem>
            {!isAdmin && <MenuItem onClick={handleClose}>Contact</MenuItem>}
            <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
