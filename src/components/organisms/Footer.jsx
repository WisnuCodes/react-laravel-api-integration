import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, Container, Typography, Stack, IconButton, 
  Dialog, Button, Avatar, Grid, Divider, TextField
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';

export default function Footer() {
  const [open, setOpen] = useState(false);
  const year = new Date().getFullYear();

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          bgcolor: '#FAFAFA',
          color: '#4B5563',
          pt: { xs: 8, md: 10 },
          pb: 4,
          borderTop: '1px solid #E5E7EB',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
          <Grid container spacing={6} sx={{ mb: 8 }}>
            {/* Brand & Newsletter Section */}
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <AutoAwesomeIcon fontSize="small" sx={{ color: '#ffffff' }} />
                </Box>
                <Typography 
                  variant="h5" 
                  fontWeight={800} 
                  component={Link}
                  to="/"
                  sx={{ letterSpacing: '-0.04em', textDecoration: 'none', color: '#111827' }}
                >
                  Dibitech
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#6B7280', lineHeight: 1.7, mb: 4, maxWidth: 360, fontSize: '0.95rem' }}>
                Platform e-commerce modern untuk membeli dan menjual aset digital berkualitas dengan aman, cepat, dan mudah.
              </Typography>
              
              {/* Premium Newsletter Box */}
              <Box sx={{ display: 'flex', gap: 1, maxWidth: 360 }}>
                <TextField
                  placeholder="Masukkan email Anda"
                  size="small"
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#111827',
                      bgcolor: '#ffffff',
                      borderRadius: '8px',
                      '& fieldset': { borderColor: '#E5E7EB' },
                      '&:hover fieldset': { borderColor: '#D1D5DB' },
                      '&.Mui-focused fieldset': { borderColor: '#111827', borderWidth: '1px' },
                    },
                    '& .MuiInputBase-input::placeholder': { color: '#9CA3AF', opacity: 1 },
                  }}
                />
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    bgcolor: '#111827',
                    color: '#ffffff',
                    minWidth: '48px',
                    borderRadius: '8px',
                    p: 0,
                    '&:hover': { bgcolor: '#1F2937' }
                  }}
                >
                  <SendIcon sx={{ fontSize: 18 }} />
                </Button>
              </Box>
            </Grid>

            <Grid item xs={false} md={1} />

            {/* Links Section 1 */}
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', mb: 3, letterSpacing: '0.05em', fontSize: '0.85rem' }}>
                PLATFORM
              </Typography>
              <Stack spacing={2.5}>
                <Typography component={Link} to="/products" variant="body2" sx={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500, transition: 'all 0.2s', '&:hover': { color: '#111827', transform: 'translateX(4px)' } }}>
                  Katalog Produk
                </Typography>
                <Typography component={Link} to="/login" variant="body2" sx={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500, transition: 'all 0.2s', '&:hover': { color: '#111827', transform: 'translateX(4px)' } }}>
                  Masuk / Daftar
                </Typography>
                <Typography component={Link} to="/orders" variant="body2" sx={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500, transition: 'all 0.2s', '&:hover': { color: '#111827', transform: 'translateX(4px)' } }}>
                  Pesanan Saya
                </Typography>
              </Stack>
            </Grid>

            {/* Links Section 2 */}
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', mb: 3, letterSpacing: '0.05em', fontSize: '0.85rem' }}>
                PERUSAHAAN
              </Typography>
              <Stack spacing={2.5}>
                <Typography 
                  component="button" 
                  onClick={handleOpen} 
                  variant="body2" 
                  sx={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500, background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', '&:hover': { color: '#111827', transform: 'translateX(4px)' } }}
                >
                  Tentang Kreator
                </Typography>
                <Typography component={Link} to="#" variant="body2" sx={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500, transition: 'all 0.2s', '&:hover': { color: '#111827', transform: 'translateX(4px)' } }}>
                  Kebijakan Privasi
                </Typography>
                <Typography component={Link} to="#" variant="body2" sx={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500, transition: 'all 0.2s', '&:hover': { color: '#111827', transform: 'translateX(4px)' } }}>
                  Syarat & Ketentuan
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 4, borderColor: '#E5E7EB' }} />

          {/* Bottom Section */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
            <Typography variant="body2" sx={{ color: '#9CA3AF', fontWeight: 500 }}>
              © {year} Dibitech Inc. Designed by Wisnu.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <IconButton component="a" href="https://github.com/wisnunugraha" target="_blank" size="small" sx={{ color: '#6B7280', bgcolor: '#ffffff', borderRadius: '8px', border: '1px solid #E5E7EB', '&:hover': { color: '#111827', bgcolor: '#F3F4F6', borderColor: '#D1D5DB' } }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </IconButton>
              <IconButton component="a" href="#" size="small" sx={{ color: '#6B7280', bgcolor: '#ffffff', borderRadius: '8px', border: '1px solid #E5E7EB', '&:hover': { color: '#ffffff', bgcolor: '#1DA1F2', borderColor: '#1DA1F2' } }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </IconButton>
              <IconButton component="a" href="https://portofolio-wisnu-codes.vercel.app/" target="_blank" size="small" sx={{ color: '#6B7280', bgcolor: '#ffffff', borderRadius: '8px', border: '1px solid #E5E7EB', '&:hover': { color: '#ffffff', bgcolor: '#0A66C2', borderColor: '#0A66C2' } }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </IconButton>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Creator Profile Card Modal */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(0,0,0,0.05)',
            m: 2
          }
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(8px)'
          }
        }}
      >
        {/* Header / Cover */}
        <Box 
          sx={{ 
            height: 120, 
            backgroundColor: '#F8FAFC',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.08' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            position: 'relative'
          }}
        >
          <IconButton 
            onClick={handleClose}
            sx={{ 
              position: 'absolute', top: 16, right: 16, 
              backgroundColor: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              '&:hover': { backgroundColor: '#ffffff' },
              transition: 'all 0.2s'
            }}
            size="small"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </IconButton>
        </Box>

        <Box sx={{ px: 4, pb: 4, pt: 0, position: 'relative' }}>
          {/* Avatar Area */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: '-40px', mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                border: '4px solid #ffffff',
                backgroundColor: '#0F172A',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                fontSize: '1.75rem',
                fontWeight: 700
              }}
            >
              WN
            </Avatar>
          </Box>

          {/* Profile Info */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 0.75 }}>
              Wisnu Nugraha
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500, mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Indonesia
            </Typography>
            <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>
              Saya berfokus pada pengembangan web modern dengan performa tinggi. Berpengalaman membangun aplikasi berskala produksi yang mengutamakan desain UI/UX kelas atas.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} sx={{ width: '100%' }}>
            <Button
              component="a"
              href="https://portofolio-wisnu-codes.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
              variant="contained"
              disableElevation
              sx={{ 
                bgcolor: '#0F172A',
                color: '#ffffff', 
                textTransform: 'none', 
                fontWeight: 600,
                fontSize: '0.9rem',
                borderRadius: '12px',
                py: 1.2,
                transition: 'all 0.2s',
                '&:hover': { bgcolor: '#1E293B', transform: 'translateY(-2px)', boxShadow: '0 6px 16px rgba(15,23,42,0.2)' }
              }}
            >
              Lihat Portofolio
            </Button>
            <Button
              component="a"
              href="https://github.com/wisnunugraha"
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
              variant="outlined"
              sx={{ 
                color: '#0F172A', 
                borderColor: '#CBD5E1', 
                textTransform: 'none', 
                fontWeight: 600,
                fontSize: '0.9rem',
                borderRadius: '12px',
                py: 1.2,
                transition: 'all 0.2s',
                '&:hover': { bgcolor: '#F8FAFC', borderColor: '#94A3B8' }
              }}
            >
              Kunjungi GitHub
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
}
