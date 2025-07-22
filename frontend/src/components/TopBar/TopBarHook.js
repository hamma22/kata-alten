import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

export const useTopBar = () => {
  const { cart } = useCart();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    navigate,
    handleClose,
    handleMenu,
    anchorEl,
    cartTotal: cart?.length ?? 0,
  };
};
