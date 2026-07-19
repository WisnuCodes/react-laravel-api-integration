import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Divider
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { useFollow } from '../context/FollowContext';
import { useAuth } from '../context/AuthContext';

export default function Following() {
  const { followedSellers, loading, toggleFollow, fetchFollows } = useFollow();
  const { isLoggedIn, user } = useAuth();
  const [unfollowLoading, setUnfollowLoading] = useState(null);

  useEffect(() => {
    if (isLoggedIn && user?.role === 'buyer') {
      fetchFollows();
    }
  }, [isLoggedIn, user, fetchFollows]);

  if (!isLoggedIn || user?.role !== 'buyer') {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#6B7280' }}>
          Silakan login sebagai buyer untuk melihat daftar kreator yang Anda ikuti.
        </Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#111827' }} />
      </Box>
    );
  }

  const handleUnfollow = async (sellerId) => {
    setUnfollowLoading(sellerId);
    try {
      await toggleFollow(sellerId);
    } catch (err) {
      console.error('Failed to unfollow:', err);
    } finally {
      setUnfollowLoading(null);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#111827', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: 2 }}>
          <PeopleOutlinedIcon sx={{ fontSize: '2rem' }} /> Kreator yang Diikuti
        </Typography>
        <Typography variant="body1" sx={{ color: '#6B7280', mt: 1 }}>
          {followedSellers.length} kreator yang Anda ikuti
        </Typography>
      </Box>

      <Divider sx={{ mb: 4, borderColor: '#F3F4F6' }} />

      {followedSellers.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#F9FAFB', borderRadius: '24px', border: '1px dashed #D1D5DB' }}>
          <PeopleOutlinedIcon sx={{ fontSize: 48, color: '#9CA3AF', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#111827', fontWeight: 800 }}>
            Belum mengikuti siapapun
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280', mt: 1, mb: 3 }}>
            Temukan kreator favorit Anda dan klik &quot;Ikuti Toko&quot; di halaman profil mereka.
          </Typography>
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            disableElevation
            sx={{ bgcolor: '#111827', color: '#ffffff', fontWeight: 700, borderRadius: '12px', textTransform: 'none', px: 4, '&:hover': { bgcolor: '#374151' } }}
          >
            Jelajahi Produk
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {followedSellers.map((item) => {
            const seller = item.seller || {};
            const sellerId = item.seller_id || seller.user_id;
            const sellerName = seller.name || 'Kreator';
            const sellerUsername = seller.username || '';

            return (
              <Box
                key={sellerId}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 3,
                  borderRadius: '16px',
                  border: '1px solid #F3F4F6',
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: '#E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' },
                  flexWrap: 'wrap',
                  gap: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                  <Avatar
                    sx={{ width: 56, height: 56, bgcolor: '#111827', color: '#ffffff', fontWeight: 800, fontSize: '1.5rem' }}
                  >
                    {sellerName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#111827', lineHeight: 1.3 }}>
                      {sellerName}
                    </Typography>
                    {sellerUsername && (
                      <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>
                        @{sellerUsername}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Button
                    component={RouterLink}
                    to={sellerUsername ? `/store/${sellerUsername}` : '#'}
                    variant="outlined"
                    startIcon={<StorefrontIcon />}
                    sx={{
                      borderColor: '#E5E7EB', color: '#111827', fontWeight: 700,
                      borderRadius: '12px', textTransform: 'none',
                      '&:hover': { borderColor: '#111827', bgcolor: '#F9FAFB' }
                    }}
                  >
                    Lihat Toko
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PersonRemoveIcon />}
                    disabled={unfollowLoading === sellerId}
                    onClick={() => handleUnfollow(sellerId)}
                    sx={{
                      borderColor: '#FCA5A5', color: '#EF4444', fontWeight: 700,
                      borderRadius: '12px', textTransform: 'none',
                      '&:hover': { borderColor: '#EF4444', bgcolor: '#FEF2F2' }
                    }}
                  >
                    {unfollowLoading === sellerId ? '...' : 'Berhenti Ikuti'}
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Container>
  );
}
