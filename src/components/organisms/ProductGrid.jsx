import { Box, CircularProgress, Typography } from '@mui/material';
import ProductCard from '../molecules/ProductCard';

export default function ProductGrid({ products, loading, columns = 4 }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 4 }}>
        Belum ada produk.
      </Typography>
    );
  }

  const colMap = {
    3: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
    4: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: colMap[columns] || colMap[4],
        gap: 2.5,
      }}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </Box>
  );
}
