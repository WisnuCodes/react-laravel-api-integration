import { Link } from 'react-router-dom';
import {
  Container, Typography, Box, Button, Card, CardMedia,
  CardContent, Rating, CircularProgress, Chip
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CodeIcon from '@mui/icons-material/Code';
import DiamondIcon from '@mui/icons-material/Diamond';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';

export default function Landing() {
  const { isLoggedIn, user } = useAuth();

  const { data: allProducts, loading } = useFetch('/products', []);
  const products = allProducts.slice(0, 4);

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', color: '#111827', overflow: 'hidden' }}>

      <Box 
        sx={{ 
          pt: { xs: 6, md: 12 }, 
          pb: { xs: 10, md: 14 }, 
          px: 3, 
          position: 'relative',
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to bottom, transparent, #ffffff)',
            zIndex: 0,
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>

          {isLoggedIn ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Chip 
                label={`Welcome back, ${user?.name}`} 
                size="small"
                sx={{ 
                  bgcolor: '#ffffff', color: '#000000', border: '1px solid #e5e7eb',
                  fontWeight: 600, px: 1, letterSpacing: '0.02em', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                }} 
              />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Chip 
                label="🎉 Platform Kreator No. 1" 
                size="small"
                sx={{ 
                  bgcolor: '#000000', color: '#ffffff',
                  fontWeight: 600, px: 1, letterSpacing: '0.02em'
                }} 
              />
            </Box>
          )}

          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              lineHeight: 1.1,
              mb: 3,
              letterSpacing: '-0.04em',
              color: '#000000',
            }}
          >
            Membangun Ide <br/>
            Lebih Cepat.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#6b7280',
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6,
              mb: 6,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Temukan ribuan template premium, source code, dan aset desain UI/UX. Mulai proyek Anda berikutnya dengan standar industri terbaik.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              disableElevation
              endIcon={<ArrowForwardIcon fontSize="small" />}
              sx={{
                bgcolor: '#000000',
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: '12px',
                px: 4,
                py: 1.8,
                transition: 'all 0.2s ease',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
                '&:hover': {
                  bgcolor: '#333333',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 30px -5px rgba(0,0,0,0.3)',
                }
              }}
            >
              Mulai Jelajahi
            </Button>

            {!isLoggedIn && (
              <Button
                component={Link}
                to="/register"
                variant="outlined"
                disableElevation
                sx={{
                  color: '#000000',
                  borderColor: '#000000',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: '12px',
                  px: 4,
                  py: 1.8,
                  transition: 'all 0.2s ease',
                  borderWidth: '2px',
                  '&:hover': {
                    borderColor: '#000000',
                    bgcolor: '#f9fafb',
                    borderWidth: '2px',
                  }
                }}
              >
                Buat Akun
              </Button>
            )}
          </Box>
        </Container>

        <Container maxWidth="md" sx={{ mt: 8, mb: -4, position: 'relative', zIndex: 1 }}>
          <Box 
            sx={{ 
              bgcolor: '#ffffff', 
              borderRadius: '24px', 
              p: { xs: 3, md: 5 },
              border: '1px solid #e5e7eb',
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 4
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#000000', mb: 0.5 }}>15K+</Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Kreator Aktif</Typography>
            </Box>
            <Box sx={{ width: '1px', height: '60px', bgcolor: '#e5e7eb', display: { xs: 'none', sm: 'block' } }} />
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#000000', mb: 0.5 }}>50K+</Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Aset Premium</Typography>
            </Box>
            <Box sx={{ width: '1px', height: '60px', bgcolor: '#e5e7eb', display: { xs: 'none', sm: 'block' } }} />
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#000000', mb: 0.5 }}>99%</Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Kepuasan Klien</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 10, px: 3, bgcolor: '#fafafa' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight={800} color="#000" sx={{ mb: 6, letterSpacing: '-0.04em', textAlign: 'center', fontSize: { xs: '2rem', md: '3rem' } }}>
            Kenapa memilih kami.
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>

            <Box sx={{ gridColumn: { md: 'span 2' }, bgcolor: '#000000', color: '#ffffff', borderRadius: '24px', p: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <AutoFixHighIcon sx={{ fontSize: 40, mb: 2, color: '#f3f4f6' }} />
                <Typography variant="h4" fontWeight={700} sx={{ mb: 2, letterSpacing: '-0.02em' }}>Desain Premium</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 400 }}>Setiap aset yang diunggah melewati proses kurasi ketat untuk memastikan kualitas desain dan kode terbaik untuk proyek Anda.</Typography>
              </Box>

              <Box sx={{ position: 'absolute', right: -20, bottom: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)' }} />
            </Box>

            <Box sx={{ bgcolor: '#ffffff', borderRadius: '24px', p: 5, border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
              <DiamondIcon sx={{ fontSize: 40, mb: 2, color: '#000' }} />
              <Typography variant="h5" fontWeight={700} sx={{ mb: 2, letterSpacing: '-0.02em' }}>Lisensi Aman</Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>Semua aset dilengkapi dengan lisensi komersial yang jelas, Anda bebas menggunakannya untuk klien.</Typography>
            </Box>

            <Box sx={{ bgcolor: '#ffffff', borderRadius: '24px', p: 5, border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
              <CodeIcon sx={{ fontSize: 40, mb: 2, color: '#000' }} />
              <Typography variant="h5" fontWeight={700} sx={{ mb: 2, letterSpacing: '-0.02em' }}>Source Code</Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>React, Vue, Laravel, hingga Tailwind. Kode bersih yang siap dimodifikasi kapanpun.</Typography>
            </Box>

             <Box sx={{ gridColumn: { md: 'span 2' }, bgcolor: '#f3f4f6', borderRadius: '24px', p: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" fontWeight={700} sx={{ mb: 2, letterSpacing: '-0.02em', color: '#000' }}>Tumbuh Bersama Komunitas</Typography>
              <Typography variant="body1" sx={{ color: '#4b5563', maxWidth: 400 }}>Lebih dari 50+ kreator aktif membagikan aset terbaik mereka setiap harinya. Jadilah bagian dari revolusi kreatif.</Typography>
            </Box>

          </Box>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 }, px: 3 }}>
        <Container maxWidth="lg">

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h3" fontWeight={800} sx={{ mb: 1, letterSpacing: '-0.03em', color: '#000' }}>
                Rilisan Terbaru.
              </Typography>
              <Typography variant="body1" color="#6b7280">
                Koleksi aset digital yang baru saja ditambahkan.
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/products"
              endIcon={<ArrowForwardIcon fontSize="small" />}
              disableRipple
              sx={{ 
                textTransform: 'none', 
                fontWeight: 600, 
                color: '#000000',
                px: 2, py: 1,
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                '&:hover': { bgcolor: '#f9fafb' }
              }}
            >
              Lihat semua
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={30} sx={{ color: '#000' }} />
            </Box>
          ) : products.length === 0 ? (
            <Typography color="#9ca3af" sx={{ py: 6, textAlign: 'center' }}>Belum ada produk dirilis.</Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
                gap: 3.5,
              }}
            >
              {products.map((p) => (
                <Card
                  key={p.id}
                  component={Link}
                  to={`/products/${p.id}`}
                  elevation={0}
                  sx={{
                    textDecoration: 'none',
                    bgcolor: 'transparent',
                    overflow: 'visible', 
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#111827',
                    '&:hover .product-img': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardMedia
                    className="product-img"
                    component="div"
                    sx={{
                      height: 220,
                      background: '#f3f4f6',
                      borderRadius: '16px',
                      position: 'relative',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s ease',
                      mb: 2,
                      overflow: 'hidden'
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

                  <CardContent sx={{ p: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
                        color: '#000000'
                      }}
                    >
                      {p.title || 'Tanpa Judul'}
                    </Typography>

                    {p.category?.name && (
                      <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                        {p.category.name}
                      </Typography>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                      <Typography variant="body1" fontWeight={700} color="#000000">
                        Rp {Number(p.price).toLocaleString('id-ID')}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating 
                          value={Number(p.rating)} 
                          precision={0.1} 
                          readOnly 
                          size="small" 
                          sx={{ 
                            fontSize: '0.9rem',
                            '& .MuiRating-iconFilled': { color: '#000000' },
                            '& .MuiRating-iconEmpty': { color: '#e5e7eb' }
                          }} 
                        />
                        <Typography variant="caption" color="#000000" fontWeight={700}>
                          {Number(p.rating).toFixed(1)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Container>
      </Box>

    </Box>
  );
}
