import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ChildrenProps } from "@/types";

interface CartContextProps {
  cart: Product[];
  cartCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: ChildrenProps) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    // Calculate the total cart count
    const totalCount = cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setCartCount(totalCount);
  }, [cart]); // Update cartCount whenever cart changes

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        return [...prevCart, product];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
