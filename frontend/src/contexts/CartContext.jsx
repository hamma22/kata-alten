import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const CART_KEY = "cart";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    setCart((prevCart) => {
      if (!prevCart.includes(productId)) {
        return [...prevCart, productId];
      }
      return prevCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart?.filter((id) => id !== productId));
  };

  const toggleCart = (productId) => {
    if (cart?.includes(productId)) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }
  };

  return (
    <CartContext.Provider value={{ cart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
