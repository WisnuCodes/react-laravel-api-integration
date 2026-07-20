import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Forbidden() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Box sx={{ bgcolor: '#FEF2F2', p: 3, borderRadius: '50%', mb: 3 }}>
          <LockOutlinedIcon sx={{ fontSize: 80, color: '#EF4444' }} />
        </Box>
        <Typography variant="h1" fontWeight="900" sx={{ color: '#111827', fontSize: { xs: '4rem', md: '6rem' }, letterSpacing: '-0.05em', lineHeight: 1 }}>
          403
        </Typography>
        <Typography variant="h5" fontWeight="700" sx={{ color: '#111827', mt: 2, mb: 1 }}>
          Akses Ditolak
        </Typography>
        <Typography variant="body1" sx={{ color: '#6B7280', mb: 5, maxWidth: '400px' }}>
          Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini mungkin khusus untuk peran (role) tertentu.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          disableElevation
          sx={{
            bgcolor: '#111827', color: '#ffffff', textTransform: 'none', fontWeight: 700, borderRadius: '99px', px: 4, py: 1.5, fontSize: '1rem',
            '&:hover': { bgcolor: '#000000' }
          }}
        >
          Kembali ke Tempat Aman
        </Button>
      </Box>
    </Container>
  );
}
