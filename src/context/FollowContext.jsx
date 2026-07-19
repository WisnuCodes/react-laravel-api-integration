import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiRequest } from '../api/client';
import { useAuth } from './AuthContext';

const FollowContext = createContext(null);

export function FollowProvider({ children }) {
  const { isLoggedIn, user } = useAuth();
  const [followedSellers, setFollowedSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFollows = useCallback(async () => {
    if (!isLoggedIn || user?.role !== 'buyer') {
      setFollowedSellers([]);
      return;
    }
    try {
      setLoading(true);
      const res = await apiRequest('/follows');
      const data = res.data || res;
      setFollowedSellers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch follows:', error);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    fetchFollows();
  }, [fetchFollows]);

  const toggleFollow = async (sellerId) => {
    if (!isLoggedIn) throw new Error('Anda harus login untuk mengikuti seller');

    // Optimistic Update
    const previousItems = [...followedSellers];
    const isCurrentlyFollowing = followedSellers.some(item => item.seller_id === sellerId);

    if (isCurrentlyFollowing) {
      setFollowedSellers(prev => prev.filter(item => item.seller_id !== sellerId));
    } else {
      setFollowedSellers(prev => [...prev, { seller_id: sellerId }]);
    }

    try {
      const res = await apiRequest(`/follows/toggle/${sellerId}`, { method: 'POST' });
      fetchFollows();
      return res;
    } catch (error) {
      // Rollback jika gagal
      setFollowedSellers(previousItems);
      console.error('Failed to toggle follow:', error);
      throw error;
    }
  };

  const isFollowing = (sellerId) => {
    return followedSellers.some(item => item.seller_id === sellerId);
  };

  return (
    <FollowContext.Provider value={{ followedSellers, loading, toggleFollow, isFollowing, fetchFollows }}>
      {children}
    </FollowContext.Provider>
  );
}

export function useFollow() {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
}
