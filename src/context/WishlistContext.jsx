import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiRequest } from '../api/client';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { isLoggedIn, user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!isLoggedIn || user?.role !== 'buyer') {
      setWishlistItems([]);
      return;
    }
    try {
      setLoading(true);
      const res = await apiRequest('/wishlists');
      setWishlistItems(res.data || res);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggleWishlist = async (productId) => {
    if (!isLoggedIn) throw new Error('Anda harus login untuk menyimpan favorit');

    // Optimistic Update: Langsung ubah state sebelum API selesai agar UI responsif
    const previousItems = [...wishlistItems];
    const isCurrentlyWishlisted = wishlistItems.some(item => item.product_id === productId);

    if (isCurrentlyWishlisted) {
      setWishlistItems(prev => prev.filter(item => item.product_id !== productId));
    } else {
      setWishlistItems(prev => [...prev, { product_id: productId }]);
    }

    try {
      const res = await apiRequest(`/wishlists/toggle/${productId}`, { method: 'POST' });
      // Lakukan fetch sinkronisasi di background tanpa nge-block
      fetchWishlist(); 
      return res;
    } catch (error) {
      // Kembalikan ke state semula jika API gagal
      setWishlistItems(previousItems);
      console.error('Failed to toggle wishlist:', error);
      throw error;
    }
  };

  const isWishlisted = (productId) => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, loading, toggleWishlist, isWishlisted, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
