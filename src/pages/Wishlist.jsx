import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default function Wishlist() {
  const { wishlistItems, loading, toggleWishlist } = useWishlist();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: '#111827' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', pb: 12 }}>
      <Box 
        sx={{ 
          pt: { xs: 6, md: 8 }, 
          pb: { xs: 4, md: 6 }, 
          px: 3, 
          bgcolor: '#fafafa',
          borderBottom: '1px solid #f3f4f6',
          mb: 5
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h1" 
            fontWeight={800} 
            sx={{ 
              color: '#111827', 
              fontSize: { xs: '2rem', md: '2.8rem' },
              letterSpacing: '-0.04em',
              mb: 1
            }}
          >
            Koleksi Favorit
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: '#6b7280', fontSize: '1.1rem' }}
          >
            Produk-produk incaran yang telah Anda simpan.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {wishlistItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <StorefrontIcon sx={{ fontSize: 80, color: '#E5E7EB', mb: 2 }} />
            <Typography variant="h6" sx={{ color: '#111827', fontWeight: 700, mb: 1 }}>
              Belum ada favorit
            </Typography>
            <Typography variant="body1" sx={{ color: '#6B7280' }}>
              Mulai jelajahi produk dan temukan aset digital favorit Anda.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {wishlistItems.map((item) => {
              const p = item.product;
              if (!p) return null;
              
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card
                    elevation={0}
                    sx={{
                      textDecoration: 'none',
                      bgcolor: 'transparent',
                      overflow: 'visible',
                      display: 'flex',
                      flexDirection: 'column',
                      color: '#111827',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    <Box component={Link} to={`/products/${p.product_id || p.id}`} sx={{ textDecoration: 'none' }}>
                      <CardMedia
                        className="product-img"
                        component="div"
                        sx={{
                          height: 200,
                          background: '#f3f4f6',
                          borderRadius: '16px',
                          position: 'relative',
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.3s ease',
                          mb: 2,
                          overflow: 'hidden',
                          '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                          }
                        }}
                      >
                        {p.thumbnail && p.thumbnail.startsWith('http') ? (
                          <Box
                            component="img"
                            src={p.thumbnail}
                            alt={p.title}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="caption" color="#9ca3af">No Image</Typography>
                          </Box>
                        )}
                      </CardMedia>
                    </Box>
                    
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(p.product_id || p.id);
                      }}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: '#ffffff',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        color: '#EF4444',
                        '&:hover': { bgcolor: '#FEE2E2' },
                        zIndex: 2
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>

                    <CardContent sx={{ p: 0, flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.4,
                          mb: 0.5,
                          letterSpacing: '-0.01em',
                          color: '#111827'
                        }}
                      >
                        {p.title}
                      </Typography>
                      <Typography variant="body1" fontWeight={700} color="#111827">
                        Rp {Number(p.price).toLocaleString('id-ID')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
