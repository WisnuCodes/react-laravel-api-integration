import { useState, useEffect } from 'react';
import { apiRequest } from '../api/client';
import { Box, Typography, CircularProgress, Alert, Card, CardContent, CardMedia, CardActions, Button, Chip } from '@mui/material';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: {
    id: number;
    name: string;
  };
  seller: {
    id: number;
    name: string;
  };
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await apiRequest('/products');
      if (response.success && response.data) {
        setProducts(response.data);
      } else {
        setError(response.message || 'Gagal mengambil data produk.');
      }
    } catch (err: any) {
      console.error("Fetch products error:", err);
      setError(err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Katalog Produk
      </Typography>
      
      {products.length === 0 ? (
        <Alert severity="info" sx={{ justifyContent: 'center' }}>
          Belum ada produk yang tersedia saat ini.
        </Alert>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {products.map((product) => (
            <Box key={product.id}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%', // 16:9 aspect ratio
                      bgcolor: 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    <Typography variant="body2">No Image</Typography>
                  </CardMedia>
                  <Chip 
                    label={product.category.name} 
                    color="primary" 
                    size="small" 
                    sx={{ position: 'absolute', top: 8, right: 8, fontWeight: 'bold' }} 
                  />
                </Box>
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Oleh: {product.seller.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold' }}>
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'warning.main' }}>
                      ⭐ {product.rating.toFixed(1)}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {product.description}
                  </Typography>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button variant="contained" fullWidth>
                    Lihat Detail
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
