import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiRequest } from '../api/client';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');
  let userRole = null;
  try {
    userRole = savedUser ? JSON.parse(savedUser)?.role : null;
  } catch { /* ignore */ }

  const fetchCart = useCallback(async () => {
    if (!token || userRole !== 'buyer') {
      setItems([]);
      return;
    }
    try {
      setLoading(true);
      const res = await apiRequest('/cart');
      setItems(res.data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [token, userRole]);

  useEffect(() => {
    fetchCart();
    
    const interval = setInterval(() => {
      fetchCart();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    const res = await apiRequest('/cart', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity }),
    });
    await fetchCart();
    return res;
  };

  const updateQuantity = async (cartId, quantity) => {
    await apiRequest(`/cart/${cartId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
    await fetchCart();
  };

  const removeFromCart = async (cartId) => {
    await apiRequest(`/cart/${cartId}`, { method: 'DELETE' });
    await fetchCart();
  };

  const checkout = async () => {
    const res = await apiRequest('/cart/checkout', { method: 'POST' });
    setItems([]);
    return res;
  };

  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const total = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);

  const value = {
    items,
    loading,
    itemCount,
    total,
    addToCart,
    updateQuantity,
    removeFromCart,
    checkout,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart harus dipakai di dalam <CartProvider>');
  }
  return context;
}
