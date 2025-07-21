import { useState } from "react";
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
  const { navigate, handleClose, handleMenu, anchorEl } = useTopBar();

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            to={ROUTES.HOME}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            KatAlten
          </Link>
        </Typography>
        <Grid container spacing={1}>
          <IconButton
            size="medium"
            color="inherit"
            onClick={() => navigate(ROUTES.FAVORITES)}
          >
            <Badge badgeContent={6} color="secondary">
              <Heart size={25} />
            </Badge>
          </IconButton>
          <IconButton
            size="medium"
            color="inherit"
            onClick={() => navigate(ROUTES.CART)}
          >
            <Badge badgeContent={2} color="secondary">
              <ShoppingCart size={25} />
            </Badge>
          </IconButton>
        </Grid>
        <Box sx={{ ml: 2 }}>
          <IconButton size="medium" onClick={handleMenu} color="inherit">
            <Avatar alt="User Avatar" src="" />
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
            <MenuItem onClick={handleClose}>Se déconnecter</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
