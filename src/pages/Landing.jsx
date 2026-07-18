import { Link } from 'react-router-dom';
import {
  Container, Typography, Box, Button, Card, CardMedia,
  CardContent, Rating, CircularProgress, Chip, Grid
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';

export default function Landing() {
  const { isLoggedIn, user } = useAuth();
  const { data: allProducts, loading } = useFetch('/products', []);
  const products = allProducts.slice(0, 4);

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', color: '#111827', overflow: 'hidden' }}>

      {/* --- HERO SECTION (ULTRA MINIMALIST & PROFESSIONAL) --- */}
      <Box 
        sx={{ 
          pt: { xs: 10, md: 16 }, 
          pb: { xs: 8, md: 10 }, 
          position: 'relative',
          bgcolor: '#ffffff',
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: 'center top',
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 80%)', pointerEvents: 'none', zIndex: 0 }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
              lineHeight: 1.05,
              mb: 3,
              letterSpacing: '-0.05em',
              color: '#111827',
              maxWidth: 900,
              mx: 'auto'
            }}
          >
            Membangun masa depan. <br />
            <Box component="span" sx={{ color: '#9ca3af' }}>Baris demi baris.</Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#4b5563',
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6,
              mb: 5,
              maxWidth: 600,
              mx: 'auto',
              fontWeight: 400
            }}
          >
            Platform marketplace tingkat enterprise untuk aset digital premium. Temukan source code, template UI, dan modul backend siap pakai.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              disableElevation
              sx={{
                bgcolor: '#111827', color: '#ffffff', textTransform: 'none', fontWeight: 600, fontSize: '0.95rem',
                borderRadius: '8px', px: 4, py: 1.5, boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                '&:hover': { bgcolor: '#000000', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' },
                transition: 'all 0.2s ease'
              }}
            >
              Mulai Eksplorasi
            </Button>

            {!isLoggedIn && (
              <Button
                component={Link}
                to="/register"
                variant="outlined"
                disableElevation
                sx={{
                  color: '#4b5563', borderColor: '#e5e7eb', bgcolor: '#ffffff', textTransform: 'none', fontWeight: 600, fontSize: '0.95rem',
                  borderRadius: '8px', px: 4, py: 1.5,
                  '&:hover': { borderColor: '#d1d5db', bgcolor: '#f9fafb' },
                  transition: 'all 0.2s ease'
                }}
              >
                Buat Akun Gratis
              </Button>
            )}
          </Box>

          {/* CODE EDITOR MOCKUP (Replaces the floating glass 3D objects) */}
          <Box sx={{ 
            width: '100%', maxWidth: 1000, mx: 'auto', mt: { xs: 8, md: 10 }, 
            borderRadius: '12px', border: '1px solid #e5e7eb', 
            boxShadow: '0 30px 60px -20px rgba(0,0,0,0.15)', 
            overflow: 'hidden', bgcolor: '#ffffff',
            textAlign: 'left'
          }}>
            {/* Window Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, borderBottom: '1px solid #e5e7eb', bgcolor: '#fafafa' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                 <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444' }} />
                 <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#eab308' }} />
                 <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#22c55e' }} />
              </Box>
              <Typography sx={{ ml: 'auto', mr: 'auto', fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500, fontFamily: 'monospace' }}>
                App.tsx — Dibitech Workspace
              </Typography>
            </Box>
            
            {/* Window Content */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: { xs: 'auto', md: 450 } }}>
               
               {/* Left: Code Editor Panel */}
               <Box sx={{ 
                 flex: 1, borderRight: { md: '1px solid #e5e7eb' }, borderBottom: { xs: '1px solid #e5e7eb', md: 'none' }, 
                 bgcolor: '#ffffff', p: { xs: 3, md: 4 }, overflow: 'auto', 
                 fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace', 
                 fontSize: '0.85rem', color: '#374151', lineHeight: 1.8 
               }}>
                 <div style={{ color: '#9ca3af' }}>// 1. Install premium UI dashboard from Dibitech</div>
                 <div style={{ color: '#9ca3af', marginBottom: '16px' }}>// npm install @dibitech/enterprise-ui</div>
                 
                 <div><span style={{ color: '#ec4899' }}>import</span> {'{'} <span style={{ color: '#3b82f6' }}>Dashboard, AnalyticsWidget</span> {'}'} <span style={{ color: '#ec4899' }}>from</span> <span style={{ color: '#10b981' }}>'@dibitech/enterprise-ui'</span>;</div>
                 <br/>
                 <div><span style={{ color: '#ec4899' }}>export default function</span> <span style={{ color: '#8b5cf6' }}>AdminPanel</span>() {'{'}</div>
                 <div style={{ paddingLeft: '20px' }}>
                    <span style={{ color: '#ec4899' }}>return</span> (
                    <div style={{ paddingLeft: '20px' }}>
                      {'<'}<span style={{ color: '#3b82f6' }}>Dashboard</span> <span style={{ color: '#8b5cf6' }}>layout</span>=<span style={{ color: '#10b981' }}>"minimalist"</span>{'>'}<br/>
                      <div style={{ paddingLeft: '20px' }}>
                        {'<'}<span style={{ color: '#3b82f6' }}>AnalyticsWidget</span> <br/>
                        <div style={{ paddingLeft: '20px' }}>
                          <span style={{ color: '#8b5cf6' }}>realtime</span>={<span style={{ color: '#f59e0b' }}>true</span>}<br/>
                          <span style={{ color: '#8b5cf6' }}>metrics</span>={'{['}<span style={{ color: '#10b981' }}>"revenue"</span>, <span style={{ color: '#10b981' }}>"users"</span>{']}'}<br/>
                        </div>
                        {'/>'}<br/>
                      </div>
                      {'</'}<span style={{ color: '#3b82f6' }}>Dashboard</span>{'>'}<br/>
                    </div>
                    );
                 </div>
                 <div>{'}'}</div>
                 
                 {/* Blinking Cursor */}
                 <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <style>
                      {`
                        @keyframes blink {
                          0%, 100% { opacity: 1; }
                          50% { opacity: 0; }
                        }
                      `}
                    </style>
                    <Box sx={{ width: 8, height: 16, backgroundColor: '#3b82f6', animation: 'blink 1s step-end infinite' }} />
                 </Box>
               </Box>
               
               {/* Right: Live Preview Panel */}
               <Box sx={{ 
                 flex: 1, bgcolor: '#fafafa', p: { xs: 3, md: 4 }, 
                 display: 'flex', alignItems: 'center', justifyContent: 'center' 
               }}>
                  <Box sx={{ 
                    width: '100%', height: '100%', bgcolor: '#ffffff', borderRadius: '8px', 
                    border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', 
                    p: 3, display: 'flex', flexDirection: 'column', gap: 2 
                  }}>
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2, borderBottom: '1px solid #f3f4f6' }}>
                        <Typography fontWeight={600} fontSize="0.875rem" color="#111827">Overview</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Box sx={{ width: 20, height: 20, borderRadius: '4px', bgcolor: '#f3f4f6' }} />
                          <Box sx={{ width: 20, height: 20, borderRadius: '4px', bgcolor: '#f3f4f6' }} />
                        </Box>
                     </Box>
                     
                     <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flex: 1, p: 2, border: '1px solid #f3f4f6', borderRadius: '6px' }}>
                           <Typography fontSize="0.75rem" color="#6b7280" sx={{ mb: 0.5 }}>Revenue</Typography>
                           <Typography fontWeight={700} fontSize="1.25rem" color="#111827">$12,450</Typography>
                           <Typography fontSize="0.65rem" color="#10b981" sx={{ mt: 0.5 }}>+14.5% from last month</Typography>
                        </Box>
                        <Box sx={{ flex: 1, p: 2, border: '1px solid #f3f4f6', borderRadius: '6px' }}>
                           <Typography fontSize="0.75rem" color="#6b7280" sx={{ mb: 0.5 }}>Active Users</Typography>
                           <Typography fontWeight={700} fontSize="1.25rem" color="#111827">1,204</Typography>
                           <Typography fontSize="0.65rem" color="#10b981" sx={{ mt: 0.5 }}>+5.2% from last month</Typography>
                        </Box>
                     </Box>
                     
                     <Box sx={{ flex: 1, bgcolor: '#f9fafb', borderRadius: '6px', border: '1px dashed #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 40 }}>
                          <Box sx={{ width: 12, height: '40%', bgcolor: '#e5e7eb', borderRadius: '2px 2px 0 0' }} />
                          <Box sx={{ width: 12, height: '70%', bgcolor: '#e5e7eb', borderRadius: '2px 2px 0 0' }} />
                          <Box sx={{ width: 12, height: '50%', bgcolor: '#e5e7eb', borderRadius: '2px 2px 0 0' }} />
                          <Box sx={{ width: 12, height: '90%', bgcolor: '#3b82f6', borderRadius: '2px 2px 0 0' }} />
                          <Box sx={{ width: 12, height: '60%', bgcolor: '#e5e7eb', borderRadius: '2px 2px 0 0' }} />
                        </Box>
                     </Box>
                  </Box>
               </Box>

            </Box>
          </Box>
        </Container>
      </Box>


      {/* --- BENTO BOX FEATURES (Replaces the generic 3 column grid) --- */}
      <Box sx={{ py: { xs: 10, md: 16 }, px: 3, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight={800} color="#111827" sx={{ mb: 2, letterSpacing: '-0.04em', textAlign: 'center', fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Didesain untuk skala.
          </Typography>
          <Typography variant="body1" color="#6b7280" sx={{ mb: 8, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
            Infrastruktur, komponen UI, dan standar kode yang akan menghemat ribuan jam waktu pengembangan tim Anda.
          </Typography>

          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
            gridTemplateRows: { xs: 'auto', md: 'repeat(2, 280px)' },
            gap: 3 
          }}>
            
            {/* Feature 1: Large Panel */}
            <Box sx={{ 
              gridColumn: { md: 'span 2' }, bgcolor: '#fafafa', border: '1px solid #e5e7eb', 
              borderRadius: '20px', p: { xs: 4, md: 5 }, position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column'
            }}>
              <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 350 }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5, letterSpacing: '-0.02em', color: '#111827' }}>Kualitas Kode Kelas Dunia</Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.6 }}>Setiap baris kode di-review secara manual. Murni, tanpa dependensi berlebih, dan didesain agar mudah dimodifikasi oleh engineer manapun.</Typography>
              </Box>
              
              {/* Abstract decorative element */}
              <Box sx={{ position: 'absolute', bottom: -40, right: -20, width: 250, height: 250, border: '1px solid #e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: 180, height: 180, border: '1px solid #e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Box sx={{ width: 110, height: 110, border: '1px solid #e5e7eb', borderRadius: '50%', bgcolor: '#ffffff' }} />
                </Box>
              </Box>
            </Box>

            {/* Feature 2: Dark Panel */}
            <Box sx={{ 
              bgcolor: '#111827', color: '#ffffff', borderRadius: '20px', p: { xs: 4, md: 5 },
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
              <Box>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5, letterSpacing: '-0.02em' }}>Lisensi Aman</Typography>
                <Typography variant="body2" sx={{ color: '#9ca3af', lineHeight: 1.6 }}>Gunakan aset untuk proyek komersial klien Anda tanpa rasa khawatir. Legalitas terjamin 100%.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 4 }}>
                <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </Box>
                <Typography variant="caption" fontWeight={600} color="#e5e7eb" letterSpacing="0.05em">VERIFIED</Typography>
              </Box>
            </Box>

            {/* Feature 3: Small Panel */}
            <Box sx={{ 
              bgcolor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '20px', p: { xs: 4, md: 5 },
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
            }}>
              <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
              </Box>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1, letterSpacing: '-0.02em', color: '#111827' }}>Dokumentasi Lengkap</Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.6 }}>Integrasi dalam hitungan menit, bukan hari. Dokumentasi rapi dan mudah dibaca.</Typography>
            </Box>

            {/* Feature 4: Medium Panel */}
            <Box sx={{ 
              gridColumn: { md: 'span 2' }, bgcolor: '#ffffff', border: '1px solid #e5e7eb', 
              borderRadius: '20px', p: { xs: 4, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center'
            }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5, letterSpacing: '-0.02em', color: '#111827' }}>Teknologi Pilihan Industri</Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.6, maxWidth: 400, mb: 4 }}>
                Produk kami dibangun di atas ekosistem modern yang menjadi standar perusahaan teknologi top dunia.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                 <Chip label="React" sx={{ bgcolor: '#fafafa', border: '1px solid #e5e7eb', fontWeight: 500, color: '#4b5563', borderRadius: '6px' }} />
                 <Chip label="TailwindCSS" sx={{ bgcolor: '#fafafa', border: '1px solid #e5e7eb', fontWeight: 500, color: '#4b5563', borderRadius: '6px' }} />
                 <Chip label="Laravel" sx={{ bgcolor: '#fafafa', border: '1px solid #e5e7eb', fontWeight: 500, color: '#4b5563', borderRadius: '6px' }} />
                 <Chip label="TypeScript" sx={{ bgcolor: '#fafafa', border: '1px solid #e5e7eb', fontWeight: 500, color: '#4b5563', borderRadius: '6px' }} />
                 <Chip label="Next.js" sx={{ bgcolor: '#fafafa', border: '1px solid #e5e7eb', fontWeight: 500, color: '#4b5563', borderRadius: '6px' }} />
              </Box>
            </Box>

          </Box>
        </Container>
      </Box>

      {/* --- LATEST RELEASES SECTION --- */}
      <Box sx={{ py: { xs: 10, md: 14 }, px: 3, bgcolor: '#fafafa', borderTop: '1px solid #e5e7eb' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h3" fontWeight={800} sx={{ mb: 1.5, letterSpacing: '-0.03em', color: '#111827' }}>
                Katalog Produk.
              </Typography>
              <Typography variant="body1" color="#6b7280">
                Aset digital premium yang baru saja dirilis.
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
                color: '#111827',
                px: 2.5, py: 1.2,
                border: '1px solid #e5e7eb',
                bgcolor: '#ffffff',
                borderRadius: '8px',
                '&:hover': { bgcolor: '#f3f4f6' }
              }}
            >
              Lihat semua
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={30} sx={{ color: '#111827' }} />
            </Box>
          ) : products.length === 0 ? (
            <Typography color="#9ca3af" sx={{ py: 6, textAlign: 'center' }}>Belum ada produk dirilis.</Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 3,
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
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)',
                      borderColor: '#d1d5db'
                    },
                  }}
                >
                  <CardMedia
                    className="product-img"
                    component="div"
                    sx={{
                      height: 220,
                      background: '#F3F4F6',
                      borderRadius: '12px',
                      position: 'relative',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s ease',
                      mb: 2,
                      overflow: 'hidden'
                    }}
                  >
                    {p.thumbnail && p.thumbnail.startsWith('http') ? (
                      <Box component="img" src={p.thumbnail} alt={p.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="caption" color="#9ca3af">No Image</Typography>
                      </Box>
                    )}
                  </CardMedia>

                  <CardContent sx={{ p: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4, mb: 0.5, letterSpacing: '-0.01em', color: '#111827' }}>
                      {p.title || 'Tanpa Judul'}
                    </Typography>

                    {p.category?.name && (
                      <Typography variant="body2" sx={{ color: '#6b7280', mb: 2, fontSize: '0.8rem' }}>{p.category.name}</Typography>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                      <Typography variant="body2" fontWeight={700} color="#111827">
                        Rp {Number(p.price).toLocaleString('id-ID')}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating value={Number(p.rating)} precision={0.1} readOnly size="small" sx={{ fontSize: '0.8rem', '& .MuiRating-iconFilled': { color: '#111827' }, '& .MuiRating-iconEmpty': { color: '#e5e7eb' } }} />
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
