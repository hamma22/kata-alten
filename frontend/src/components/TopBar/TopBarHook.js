import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useCart } from "../../context/CartContext";
import { ROUTES } from "../../constants/routes";
import {
  clearUser,
  selectUserRoleAdmin,
  selectUser,
} from "../../store/slices/userSlice";

export const useTopBar = () => {
  const { cart } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector(selectUserRoleAdmin);
  const userData = useSelector(selectUser);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("kata-app-token");
    dispatch(clearUser());
    navigate(ROUTES.LOGIN);
  };

  return {
    navigate,
    handleClose,
    handleMenu,
    anchorEl,
    cartTotal: cart?.length ?? 0,
    handleLogout,
    isAdmin,
    userData,
  };
};
