import { useState, useEffect } from 'react';
import { CartContext } from './cartContextObject';


const STORAGE_KEY = 'esencial_cart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem(STORAGE_KEY);
      return localCart ? JSON.parse(localCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const isInCart = (id) => cart.some((item) => item.id === id);

  const getQty = (id) => cart.find((item) => item.id === id)?.qty ?? 0;

  const addItem = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const newQty = (existing?.qty ?? 0) + qty;
      if (newQty > product.stock) return prev;

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: newQty, stock: product.stock } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeItem = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, clearCart, isInCart, getQty, totalQty, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
