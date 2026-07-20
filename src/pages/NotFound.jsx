import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Box sx={{ bgcolor: '#F3F4F6', p: 3, borderRadius: '50%', mb: 3 }}>
          <ErrorOutlinedIcon sx={{ fontSize: 80, color: '#9CA3AF' }} />
        </Box>
        <Typography variant="h1" fontWeight="900" sx={{ color: '#111827', fontSize: { xs: '4rem', md: '6rem' }, letterSpacing: '-0.05em', lineHeight: 1 }}>
          404
        </Typography>
        <Typography variant="h5" fontWeight="700" sx={{ color: '#111827', mt: 2, mb: 1 }}>
          Halaman Tidak Ditemukan
        </Typography>
        <Typography variant="body1" sx={{ color: '#6B7280', mb: 5, maxWidth: '400px' }}>
          Maaf, halaman yang Anda cari mungkin telah dihapus, namanya diubah, atau sementara tidak tersedia.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<HomeOutlinedIcon />}
          disableElevation
          sx={{
            bgcolor: '#111827', color: '#ffffff', textTransform: 'none', fontWeight: 700, borderRadius: '99px', px: 4, py: 1.5, fontSize: '1rem',
            '&:hover': { bgcolor: '#000000' }
          }}
        >
          Kembali ke Beranda
        </Button>
      </Box>
    </Container>
  );
}
