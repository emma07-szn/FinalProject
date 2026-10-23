import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if product already exists in the cart
      const existingItem = prevItems.find((item) => item.product_id === product.product_id);
      
      if (existingItem) {
        // If it exists, increase the quantity
        return prevItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If it's a new item, add it with a quantity of 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Function to remove an item completely
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
  };

  // Calculate total price
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product_cost * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easy access
export const useCart = () => useContext(CartContext);
