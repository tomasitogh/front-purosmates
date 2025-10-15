import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart_items") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.id === product.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
        return copy;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const decQty = (id) => {
    setItems(prev => prev.flatMap(p => {
      if (p.id !== id) return [p];
      const next = p.qty - 1;
      return next <= 0 ? [] : [{ ...p, qty: next }];
    }));
  };

  const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id));
  const clearCart = () => setItems([]);

  const totalQty = useMemo(() => items.reduce((a,b)=>a+b.qty,0), [items]);
  const totalPrice = useMemo(() => items.reduce((a,b)=>a+(b.price||0)*b.qty,0), [items]);

  return (
    <CartCtx.Provider value={{ open, setOpen, items, addToCart, decQty, removeItem, clearCart, totalQty, totalPrice }}>
      {children}
    </CartCtx.Provider>
  );
}
