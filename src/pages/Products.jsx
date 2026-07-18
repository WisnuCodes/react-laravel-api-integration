import { useState } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Chip, Stack } from '@mui/material';
import { useFetch } from '../hooks/useFetch';
import ProductCard from '../components/molecules/ProductCard';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: products, loading: productsLoading, error: productsError } = useFetch('/products', [], 3000);
  const { data: categories, loading: categoriesLoading } = useFetch('/categories', [], 60000);

  const loading = productsLoading || categoriesLoading;
  const error = productsError;

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => (p.category_id === selectedCategory) || (p.category?.id === selectedCategory));

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', pb: 12 }}>

      <Box 
        sx={{ 
          pt: { xs: 8, md: 12 }, 
          pb: { xs: 6, md: 8 }, 
          px: 3, 
          bgcolor: '#fafafa',
          borderBottom: '1px solid #f3f4f6',
          mb: 5
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight={800} 
            sx={{ 
              color: '#111827', 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-0.04em',
              mb: 2
            }}
          >
            Semua Aset Digital.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#6b7280', 
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: '600px' 
            }}
          >
            Temukan koleksi lengkap template UI, source code, dan aset 3D premium yang siap mempercepat alur kerja Anda.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">

        {!loading && !error && categories.length > 0 && (
          <Box sx={{ mb: 6, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 4 }, '&::-webkit-scrollbar-thumb': { bgcolor: '#e5e7eb', borderRadius: 4 } }}>
            <Stack direction="row" spacing={1.5} sx={{ minWidth: 'max-content' }}>
              <Chip 
                label="Semua Produk" 
                onClick={() => setSelectedCategory('all')}
                sx={{ 
                  bgcolor: selectedCategory === 'all' ? '#000000' : '#ffffff',
                  color: selectedCategory === 'all' ? '#ffffff' : '#4b5563',
                  border: '1px solid',
                  borderColor: selectedCategory === 'all' ? '#000000' : '#e5e7eb',
                  fontWeight: 600,
                  px: 1,
                  py: 2.5,
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: selectedCategory === 'all' ? '#333333' : '#f9fafb'
                  }
                }}
              />
              {categories.map((cat) => (
                <Chip 
                  key={cat.id}
                  label={cat.name} 
                  onClick={() => setSelectedCategory(cat.id)}
                  sx={{ 
                    bgcolor: selectedCategory === cat.id ? '#000000' : '#ffffff',
                    color: selectedCategory === cat.id ? '#ffffff' : '#4b5563',
                    border: '1px solid',
                    borderColor: selectedCategory === cat.id ? '#000000' : '#e5e7eb',
                    fontWeight: 500,
                    px: 1,
                    py: 2.5,
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: selectedCategory === cat.id ? '#333333' : '#f9fafb'
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: '#000000' }} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ borderRadius: '8px' }}>{error}</Alert>
        ) : filteredProducts.length === 0 ? (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography color="#9ca3af" fontSize="1.1rem">Tidak ada produk dalam kategori ini.</Typography>
          </Box>
        ) : (
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, 
              gap: 4 
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
