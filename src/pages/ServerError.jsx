import { Box, Typography, Button, Container } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function ServerError() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Box sx={{ bgcolor: '#FEF3C7', p: 3, borderRadius: '50%', mb: 3 }}>
          <WarningAmberRoundedIcon sx={{ fontSize: 80, color: '#F59E0B' }} />
        </Box>
        <Typography variant="h1" fontWeight="900" sx={{ color: '#111827', fontSize: { xs: '4rem', md: '6rem' }, letterSpacing: '-0.05em', lineHeight: 1 }}>
          500
        </Typography>
        <Typography variant="h5" fontWeight="700" sx={{ color: '#111827', mt: 2, mb: 1 }}>
          Terjadi Kesalahan Internal
        </Typography>
        <Typography variant="body1" sx={{ color: '#6B7280', mb: 5, maxWidth: '400px' }}>
          Ups! Ada yang salah dari sisi server kami. Tim teknis telah diberi tahu dan sedang memperbaikinya.
        </Typography>
        <Button
          onClick={() => window.location.reload()}
          variant="contained"
          startIcon={<RefreshIcon />}
          disableElevation
          sx={{
            bgcolor: '#111827', color: '#ffffff', textTransform: 'none', fontWeight: 700, borderRadius: '99px', px: 4, py: 1.5, fontSize: '1rem',
            '&:hover': { bgcolor: '#000000' }
          }}
        >
          Muat Ulang Halaman
        </Button>
      </Box>
    </Container>
  );
}
