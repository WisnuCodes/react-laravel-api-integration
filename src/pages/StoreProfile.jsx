import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Rating,
  CircularProgress,
  Button,
  Divider
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedIcon from '@mui/icons-material/Verified';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { apiRequest } from '../api/client';
import { useFollow } from '../context/FollowContext';
import { useAuth } from '../context/AuthContext';

function StoreProfile() {
  const { username } = useParams();
  const { isLoggedIn, user } = useAuth();
  const { isFollowing, toggleFollow } = useFollow();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [storeData, setStoreData] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(`/store/${username}`);
        setStoreData(data.data); // Based on ApiResponse trait structure
        setFollowersCount(data.data?.seller?.followers_count || 0);
      } catch (err) {
        setError(err.message || 'Toko tidak ditemukan.');
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [username]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: '#ffffff' }}>
        <CircularProgress sx={{ color: '#111827' }} />
      </Box>
    );
  }

  if (error || !storeData) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: '#EF4444', fontWeight: 600, mb: 2 }}>Oops!</Typography>
        <Typography sx={{ color: '#4B5563', mb: 4 }}>{error}</Typography>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          sx={{ color: '#111827', borderColor: '#E5E7EB', textTransform: 'none' }}
        >
          Kembali ke Beranda
        </Button>
      </Container>
    );
  }

  const { seller, products, total_products } = storeData;

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Cover Banner - Premium Black */}
      <Box 
        sx={{ 
          height: { xs: 200, md: 280 },
          bgcolor: '#000000',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle glowing orb effect in the background */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5, backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(255, 255, 255, 0.15), transparent 60%), radial-gradient(circle at 85% 30%, rgba(255, 255, 255, 0.05), transparent 50%)' }} />
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, pb: 12 }}>
        <Container maxWidth="lg">
          {/* Profile Section */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              alignItems: { xs: 'center', md: 'flex-end' }, 
              gap: 4, 
              mb: 6,
              position: 'relative',
              zIndex: 2
            }}
          >
            {/* Avatar with heavy white border */}
            <Box sx={{ position: 'relative', mt: { xs: -10, md: -12 } }}>
              <Avatar 
                sx={{ 
                  width: { xs: 130, md: 170 }, 
                  height: { xs: 130, md: 170 }, 
                  bgcolor: '#ffffff',
                  color: '#000000',
                  fontSize: { xs: '3.5rem', md: '5rem' }, 
                  fontWeight: 900,
                  border: '8px solid #ffffff',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)'
                }}
              >
                {seller.name.charAt(0).toUpperCase()}
              </Avatar>
              <VerifiedIcon sx={{ position: 'absolute', bottom: 12, right: 12, color: '#10B981', fontSize: '2.5rem', bgcolor: '#ffffff', borderRadius: '50%', border: '2px solid #ffffff' }} />
            </Box>

            <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' }, pb: { md: 2 } }}>
              <Typography variant="h2" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: '2.2rem', md: '3rem' }, color: '#111827', letterSpacing: '-0.03em' }}>
                {seller.name}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 2, mt: 0.5 }}>
                <Typography variant="subtitle1" sx={{ color: '#4B5563', fontWeight: 700 }}>
                  @{seller.username}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
                  <PeopleOutlinedIcon fontSize="small" /> {followersCount} Pengikut
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
                  <CalendarTodayOutlinedIcon fontSize="small" /> Bergabung sejak {seller.joined_at}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, pb: { md: 2 } }}>
              <Button 
                variant="outlined" 
                startIcon={<ShareOutlinedIcon />}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Tautan toko disalin ke clipboard!');
                }}
                sx={{ 
                  borderColor: '#E5E7EB', color: '#111827', fontWeight: 700, 
                  borderRadius: '12px', textTransform: 'none', px: 3, py: 1.5,
                  '&:hover': { borderColor: '#111827', bgcolor: '#F9FAFB' } 
                }}
              >
                Bagikan
              </Button>
              {isLoggedIn && user?.role === 'buyer' && (
                <Button 
                  variant={isFollowing(seller.id) ? 'outlined' : 'contained'}
                  disableElevation
                  disabled={followLoading}
                  startIcon={isFollowing(seller.id) ? <CheckIcon /> : null}
                  onClick={async () => {
                    setFollowLoading(true);
                    try {
                      const res = await toggleFollow(seller.id);
                      const data = res?.data || res;
                      if (data?.followers_count !== undefined) {
                        setFollowersCount(data.followers_count);
                      }
                    } catch (err) {
                      console.error('Failed to toggle follow:', err);
                    } finally {
                      setFollowLoading(false);
                    }
                  }}
                  sx={isFollowing(seller.id) ? { 
                    borderColor: '#D1D5DB', color: '#111827', fontWeight: 700, 
                    borderRadius: '12px', textTransform: 'none', px: 4, py: 1.5,
                    '&:hover': { borderColor: '#EF4444', color: '#EF4444', bgcolor: '#FEF2F2' } 
                  } : { 
                    bgcolor: '#000000', color: '#ffffff', fontWeight: 700, 
                    borderRadius: '12px', textTransform: 'none', px: 4, py: 1.5,
                    '&:hover': { bgcolor: '#374151' } 
                  }}
                >
                  {followLoading ? 'Memproses...' : isFollowing(seller.id) ? 'Mengikuti' : 'Ikuti Toko'}
                </Button>
              )}
            </Box>
          </Box>

          <Divider sx={{ mb: 6, borderColor: '#F3F4F6' }} />

          {/* Product List */}
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#111827', display: 'flex', alignItems: 'center', gap: 2, letterSpacing: '-0.03em' }}>
              Koleksi Produk <Chip label={total_products} sx={{ bgcolor: '#F3F4F6', color: '#111827', fontWeight: 800, fontSize: '1rem', height: 32, borderRadius: '10px' }} />
            </Typography>
          </Box>

          {products.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 12, bgcolor: '#F9FAFB', borderRadius: '24px', border: '1px dashed #D1D5DB' }}>
              <LocalOfferIcon sx={{ fontSize: 48, color: '#9CA3AF', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#111827', fontWeight: 800 }}>Belum ada produk aktif</Typography>
              <Typography variant="body1" sx={{ color: '#6B7280', mt: 1 }}>Kreator ini belum mengunggah produk apa pun.</Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card 
                    component={RouterLink} 
                    to={`/products/${product.id}`}
                    elevation={0}
                    sx={{ 
                      height: '100%',
                      display: 'flex', 
                      flexDirection: 'column',
                      textDecoration: 'none',
                      borderRadius: '24px',
                      bgcolor: '#ffffff',
                      border: '1px solid #F3F4F6',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: '#E5E7EB',
                        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.08)',
                        transform: 'translateY(-6px)'
                      }
                    }}
                  >
                    <Box sx={{ overflow: 'hidden', position: 'relative', height: 240, bgcolor: '#F9FAFB' }}>
                      <CardMedia
                        component="img"
                        image={product.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80'}
                        alt={product.title}
                        sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                        <Chip label={product.category?.name || 'Kategori'} sx={{ bgcolor: 'rgba(255, 255, 255, 0.95)', color: '#111827', fontWeight: 800, backdropFilter: 'blur(4px)', borderRadius: '10px' }} />
                      </Box>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" sx={{ color: '#111827', fontWeight: 800, mb: 1.5, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {product.title}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Rating value={product.rating} precision={0.1} readOnly size="small" sx={{ color: '#111827', mr: 1 }} />
                        <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 700 }}>
                          {Number(product.rating).toFixed(1)} ({product.reviews_count})
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2.5, borderTop: '1px solid #F3F4F6' }}>
                        <Typography variant="h6" sx={{ color: '#111827', fontWeight: 900, lineHeight: 1 }}>
                          Rp {Number(product.price).toLocaleString('id-ID')}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocalOfferIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> {product.download_count} Terjual
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default StoreProfile;
