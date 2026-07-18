import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button, CircularProgress, Chip } from '@mui/material';
import { useFetch } from '../hooks/useFetch';
import DownloadIcon from '@mui/icons-material/Download';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

export default function Library() {
  const { data: library, loading, error } = useFetch('/buyer/library', []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress sx={{ color: '#111827' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography color="error">Gagal memuat library.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FolderOpenIcon sx={{ color: '#ffffff' }} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={800} color="#111827" letterSpacing="-0.02em">
              My Library
            </Typography>
            <Typography variant="body2" color="#6B7280">
              Koleksi aset digital dan source code yang telah Anda beli.
            </Typography>
          </Box>
        </Box>

        {library.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 12, bgcolor: '#ffffff', borderRadius: '24px', border: '1px dashed #E5E7EB' }}>
            <Typography variant="h6" color="#4B5563" fontWeight={600} mb={1}>Perpustakaan Anda masih kosong</Typography>
            <Typography variant="body2" color="#9CA3AF">Anda belum memiliki aset digital yang berhasil dibeli.</Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {library.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.transaction_id}>
                <Card 
                  elevation={0}
                  sx={{ 
                    borderRadius: '16px', 
                    border: '1px solid #E5E7EB',
                    bgcolor: '#ffffff',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#D1D5DB',
                      boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <CardMedia
                    sx={{ height: 180, bgcolor: '#F3F4F6', position: 'relative' }}
                    image={product.thumbnail && product.thumbnail.startsWith('http') ? product.thumbnail : ''}
                  >
                    {!product.thumbnail || !product.thumbnail.startsWith('http') ? (
                      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="caption" color="#9CA3AF">No Image</Typography>
                      </Box>
                    ) : null}
                    
                    <Chip 
                      label={product.category || 'Aset'} 
                      size="small"
                      sx={{ 
                        position: 'absolute', top: 12, left: 12, 
                        bgcolor: 'rgba(255,255,255,0.9)', 
                        backdropFilter: 'blur(4px)',
                        fontWeight: 600, fontSize: '0.7rem' 
                      }} 
                    />
                  </CardMedia>

                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" fontWeight={700} color="#111827" sx={{ mb: 1, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="caption" color="#9CA3AF">
                        Dibeli pada: {new Date(product.purchased_at).toLocaleDateString('id-ID')}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<DownloadIcon />}
                      disableElevation
                      onClick={() => {
                        // Simulate download or open actual URL
                        if (product.file_url) {
                          window.open(product.file_url, '_blank');
                        } else {
                          alert('File belum tersedia untuk diunduh.');
                        }
                      }}
                      sx={{
                        mt: 'auto',
                        bgcolor: '#111827',
                        color: '#ffffff',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '8px',
                        py: 1.2,
                        '&:hover': { bgcolor: '#000000' }
                      }}
                    >
                      Download Source
                    </Button>
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
