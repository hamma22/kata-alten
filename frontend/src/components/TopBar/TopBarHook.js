import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useTopBar = () => {
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
  };
};
