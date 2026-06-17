"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CatalogItem } from "@/types";

export interface CartItem {
  item: CatalogItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CatalogItem) => void;
  removeFromCart: (skuCode: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CatalogItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((i) => i.item.skuCode === item.skuCode);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (skuCode: string) => {
    setCart((prevCart) =>
      prevCart
        .map((i) => (i.item.skuCode === skuCode ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, current) => total + current.item.currentPrice * current.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, current) => count + current.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}