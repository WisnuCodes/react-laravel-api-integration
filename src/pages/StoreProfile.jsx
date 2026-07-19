import React, { useState, useEffect } from 'react';
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
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { apiRequest } from '../api/client';

function StoreProfile() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(`/store/${username}`);
        setStoreData(data.data); // Based on ApiResponse trait structure
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: '#F9FAFB' }}>
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
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', pb: 8 }}>
      {/* Banner / Store Header */}
      <Box sx={{ bgcolor: '#111827', color: 'white', py: { xs: 6, md: 8 }, mb: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
            <Avatar 
              sx={{ 
                width: 120, height: 120, 
                bgcolor: '#374151', fontSize: '3rem', 
                border: '4px solid rgba(255,255,255,0.1)' 
              }}
            >
              {seller.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                {seller.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#9CA3AF', mb: 2 }}>
                @{seller.username} • Bergabung sejak {seller.joined_at}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Chip 
                  icon={<StorefrontIcon sx={{ color: '#9CA3AF' }} />} 
                  label={`${total_products} Produk Digital`} 
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }} 
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Product List */}
      <Container maxWidth="lg">
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalOfferIcon /> Semua Produk dari {seller.name}
        </Typography>

        {products.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'white', borderRadius: 2, border: '1px solid #F3F4F6' }}>
            <Typography sx={{ color: '#6B7280' }}>Penjual ini belum memiliki produk yang aktif.</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card 
                  component={RouterLink} 
                  to={`/product/${product.id}`}
                  sx={{ 
                    height: '100%',
                    display: 'flex', 
                    flexDirection: 'column',
                    textDecoration: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #F3F4F6',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80'}
                    alt={product.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {product.category?.name || 'Uncategorized'}
                      </Typography>
                    </Box>
                    
                    <Typography variant="h6" sx={{ color: '#111827', fontWeight: 700, mb: 1, lineHeight: 1.3 }}>
                      {product.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={product.rating} precision={0.5} readOnly size="small" sx={{ mr: 1 }} />
                      <Typography variant="caption" sx={{ color: '#6B7280' }}>
                        ({product.reviews_count})
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 1.5, borderColor: '#F3F4F6' }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" sx={{ color: '#111827', fontWeight: 800 }}>
                        Rp {Number(product.price).toLocaleString('id-ID')}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                        {product.download_count} terjual
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
  );
}

export default StoreProfile;
