import { Link } from 'react-router-dom';
import {
  Container, Typography, Box, Button, Card, CardMedia,
  CardContent, Rating, CircularProgress, Chip, Grid,
  Avatar, AvatarGroup, Switch, Alert, Paper,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { NextJsIcon, ReactIcon, LaravelIcon, TailwindIcon, ViteIcon, TypeScriptIcon, VercelIcon } from '../components/atoms/TechIcons';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';

export default function Landing() {
  const { isLoggedIn } = useAuth();
  const { data: allProducts, loading } = useFetch('/products', []);
  const { data: latestReviews, loading: loadingReviews } = useFetch('/reviews/latest', []);
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
                 fontSize: '0.85rem', color: '#374151', lineHeight: 1.8,
                 msOverflowStyle: 'none',
                 scrollbarWidth: 'none',
                 '&::-webkit-scrollbar': {
                   display: 'none'
                 }
               }}>
                 <div style={{ color: '#9ca3af' }}>// 1. Install premium UI dashboard from Dibitech</div>
                 <div style={{ color: '#9ca3af', marginBottom: '16px' }}>// npm install @dibitech/enterprise-ui</div>
                 
                 <div><span style={{ color: '#ec4899' }}>import</span> {'{'} <span style={{ color: '#3b82f6' }}>Dashboard, AnalyticsWidget</span> {'}'} <span style={{ color: '#ec4899' }}>from</span></div>
                 <div><span style={{ color: '#10b981' }}>'@dibitech/enterprise-ui'</span>;</div>
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

      {/* --- TRUSTED BY MARQUEE --- */}
      <Box sx={{ py: 6, bgcolor: '#ffffff', borderBottom: '1px solid #f3f4f6', overflow: 'hidden' }}>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', mb: 4 }}>
          Dipercaya oleh ribuan developer dari ekosistem modern
        </Typography>
        <Box sx={{ display: 'flex', gap: 8, px: 4, width: 'max-content', animation: 'scroll 40s linear infinite' }}>
          <style>
            {`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}
          </style>
          {/* Repeat logos to make infinite scroll effect */}
          {[...Array(2)].map((_, i) => (
            <Box key={i} sx={{ display: 'flex', gap: { xs: 6, md: 10 } }}>
              {[
                { name: 'NEXT.JS', icon: <NextJsIcon size={28} color="#000000" /> },
                { name: 'REACT', icon: <ReactIcon size={28} color="#61DAFB" /> },
                { name: 'LARAVEL', icon: <LaravelIcon size={28} color="#FF2D20" /> },
                { name: 'TAILWIND', icon: <TailwindIcon size={28} color="#06B6D4" /> },
                { name: 'VITE', icon: <ViteIcon size={28} color="#646CFF" /> },
                { name: 'TYPESCRIPT', icon: <TypeScriptIcon size={28} color="#3178C6" /> },
                { name: 'VERCEL', icon: <VercelIcon size={28} color="#000000" /> },
              ].map((tech, j) => (
                <Box key={j} sx={{ 
                  display: 'flex', alignItems: 'center', gap: 1.5, 
                  opacity: 0.85, transition: 'all 0.3s ease', cursor: 'default',
                  '&:hover': { opacity: 1, transform: 'scale(1.05)' }
                }}>
                  {tech.icon}
                  <Typography variant="h6" fontWeight={800} letterSpacing="0.02em" sx={{ color: '#4b5563', '&:hover': { color: '#111827' } }}>{tech.name}</Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      {/* --- INTERACTIVE STATS --- */}
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 10, md: 12 }, px: 3, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 }, maxWidth: 700, mx: 'auto' }}>
            <Typography variant="h2" fontWeight={800} color="#111827" sx={{ mb: 3, letterSpacing: '-0.04em', fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              Angka tidak pernah bohong.
            </Typography>
            <Typography variant="body1" color="#6b7280" sx={{ fontSize: '1.125rem', lineHeight: 1.6 }}>
              Dibitech telah menjadi fondasi bagi ratusan startup dan enterprise di seluruh dunia. Skalakan aplikasi Anda dengan aman dan terpercaya bersama ekosistem kami.
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: 4 
          }}>
            {[
              { value: '10K+', label: 'Unduhan Aktif', icon: <CloudDownloadOutlinedIcon /> },
              { value: '99.9%', label: 'Uptime Server', icon: <DnsOutlinedIcon /> },
              { value: '24/7', label: 'Support Teknis', icon: <SupportAgentOutlinedIcon /> },
              { value: '100%', label: 'Kode Bebas Error', icon: <VerifiedOutlinedIcon /> }
            ].map((stat, i) => (
              <Box key={i} sx={{ 
                flex: { xs: '1 1 100%', sm: '1 1 40%', md: '1 1 20%' },
                maxWidth: { md: '260px' },
                width: '100%',
                p: 4, borderRadius: '24px', border: '1px solid #e5e7eb', 
                bgcolor: '#ffffff', transition: 'all 0.3s ease',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                '&:hover': { 
                  transform: 'translateY(-4px)', 
                  boxShadow: '0 20px 40px -12px rgba(0,0,0,0.05)'
                }
              }}>
                <Box sx={{ 
                  width: 48, height: 48, borderRadius: '12px', mb: 3, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#f8fafc', border: '1px solid #e5e7eb',
                  color: '#111827',
                  '& svg': { fontSize: '1.5rem' }
                }}>
                  {stat.icon}
                </Box>
                <Typography variant="h3" fontWeight={800} sx={{ 
                  mb: 1, letterSpacing: '-0.03em', fontSize: '2.5rem',
                  color: '#111827',
                  display: 'inline-block'
                }}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" fontWeight={600} color="#6b7280" sx={{ letterSpacing: '0.01em' }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
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
                display: { xs: 'flex', sm: 'grid' },
                gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                flexDirection: { xs: 'row', sm: 'unset' },
                overflowX: { xs: 'auto', sm: 'visible' },
                gap: 3,
                pb: { xs: 2, sm: 0 }, 
                mx: { xs: -3, sm: 0 }, 
                px: { xs: 3, sm: 0 }, 
                scrollSnapType: { xs: 'x mandatory', sm: 'none' },
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '& > *': {
                  flex: { xs: '0 0 85%', sm: 'unset' },
                  scrollSnapAlign: { xs: 'start', sm: 'none' }
                }
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

      {/* --- TESTIMONIALS SECTION --- */}
      <Box sx={{ py: { xs: 12, md: 16 }, px: 3, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight={800} color="#111827" sx={{ mb: 2, letterSpacing: '-0.04em', textAlign: 'center', fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Didukung oleh engineer top.
          </Typography>
          <Typography variant="body1" color="#6b7280" sx={{ mb: 8, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
            Jangan hanya mendengar dari kami. Inilah kata mereka yang telah menggunakan produk Dibitech untuk men-scale aplikasi mereka.
          </Typography>
          
          {loadingReviews ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={30} sx={{ color: '#111827' }} />
            </Box>
          ) : latestReviews.length === 0 ? (
            <Typography color="#9ca3af" sx={{ py: 6, textAlign: 'center' }}>Belum ada testimoni.</Typography>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {latestReviews.map((review, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Box sx={{ 
                    p: 4, borderRadius: '24px', border: '1px solid #e5e7eb', 
                    bgcolor: '#fafafa', height: '100%', display: 'flex', flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px -10px rgba(0,0,0,0.05)', borderColor: '#d1d5db', bgcolor: '#ffffff' }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Rating value={Number(review.rating)} precision={0.1} readOnly size="small" sx={{ '& .MuiRating-iconFilled': { color: '#F59E0B' } }} />
                      {review.product?.title && (
                        <Chip label={review.product.title} size="small" sx={{ fontSize: '0.65rem', fontWeight: 600, bgcolor: '#f3f4f6', color: '#6b7280', borderRadius: '6px' }} />
                      )}
                    </Box>
                    <Typography variant="body1" color="#374151" sx={{ mb: 4, fontStyle: 'italic', flexGrow: 1, lineHeight: 1.6 }}>
                      "{review.comment || 'Sangat puas dengan produk ini. Pelayanan memuaskan.'}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #111827 0%, #374151 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                        {review.buyer?.name ? review.buyer.name.charAt(0).toUpperCase() : 'U'}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700} color="#111827">{review.buyer?.name || 'Pengguna Anonim'}</Typography>
                        <Typography variant="caption" color="#6b7280" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <VerifiedOutlinedIcon sx={{ fontSize: '12px', color: '#10B981' }} /> Pembeli Terverifikasi
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* --- HOW IT WORKS (WORKFLOW) SECTION --- */}
      <Box sx={{ py: { xs: 12, md: 16 }, px: 3, bgcolor: '#ffffff', position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '100%', background: 'radial-gradient(ellipse at top, rgba(59,130,246,0.03) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 16 } }}>
            <Chip label="Cara Kerja" size="small" sx={{ mb: 3, bgcolor: 'rgba(59,130,246,0.1)', color: '#3b82f6', fontWeight: 700, borderRadius: '8px' }} />
            <Typography variant="h2" fontWeight={800} color="#111827" sx={{ mb: 2, letterSpacing: '-0.04em', fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              Dari ide hingga <Box component="span" sx={{ color: '#3b82f6' }}>production.</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: '#6b7280', maxWidth: 600, mx: 'auto', fontSize: '1.125rem' }}>
              Alur kerja terintegrasi yang didesain untuk mempercepat proses pengembangan aplikasi Anda secara drastis.
            </Typography>
          </Box>

          <Box sx={{ position: 'relative' }}>
            {/* Horizontal Line for Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', top: '40px', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.2) 20%, rgba(59,130,246,0.2) 80%, rgba(59,130,246,0) 100%)', zIndex: 0 }} />

            <Box 
              sx={{ 
                position: 'relative', 
                zIndex: 1,
                display: { xs: 'flex', md: 'grid' },
                gridTemplateColumns: { md: 'repeat(3, 1fr)' },
                gap: { xs: 4, md: 6 },
                overflowX: { xs: 'auto', md: 'visible' },
                pb: { xs: 4, md: 0 }, 
                mx: { xs: -3, md: 0 }, 
                px: { xs: 3, md: 0 }, 
                scrollSnapType: { xs: 'x mandatory', md: 'none' },
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '& > *': {
                  flex: { xs: '0 0 85%', md: 'unset' },
                  scrollSnapAlign: { xs: 'center', md: 'none' }
                }
              }}
            >
              {[
                { num: '01', title: 'Eksplorasi', desc: 'Temukan ratusan template UI, komponen, dan boilerplate backend yang sesuai dengan kebutuhan spesifik startup Anda.', icon: <SearchOutlinedIcon fontSize="large" sx={{ color: '#3b82f6' }} /> },
                { num: '02', title: 'Checkout', desc: 'Selesaikan pembayaran dengan aman dan dapatkan akses instan ke source code tanpa proses review berbelit.', icon: <ShoppingBagOutlinedIcon fontSize="large" sx={{ color: '#3b82f6' }} /> },
                { num: '03', title: 'Integrasi', desc: 'Integrasikan kode yang bersih ke sistem Anda. Lakukan deploy dan nikmati hasilnya dalam hitungan jam, bukan minggu.', icon: <CodeOutlinedIcon fontSize="large" sx={{ color: '#3b82f6' }} /> }
              ].map((step, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
                    {/* Number Badge Background */}
                    <Typography variant="h1" fontWeight={900} sx={{ position: 'absolute', top: -50, right: { xs: '10%', md: '10%' }, fontSize: { xs: '6rem', md: '8rem' }, color: '#f3f4f6', opacity: 0.8, zIndex: -1, pointerEvents: 'none' }}>
                      {step.num}
                    </Typography>

                    {/* Icon Circle */}
                    <Box sx={{ 
                      width: 80, height: 80, borderRadius: '50%', bgcolor: '#ffffff', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      mb: 4, 
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.15)',
                      transition: 'all 0.3s ease',
                      '&:hover': { transform: 'scale(1.05) translateY(-5px)', boxShadow: '0 20px 30px -10px rgba(59, 130, 246, 0.2)', borderColor: '#3b82f6' }
                    }}>
                      {step.icon}
                    </Box>

                    <Typography variant="h5" fontWeight={800} color="#111827" sx={{ mb: 2 }}>{step.title}</Typography>
                    <Typography variant="body1" color="#6b7280" sx={{ lineHeight: 1.7, maxWidth: 300 }}>{step.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* --- FAQ SECTION (STANDARD MUI & CLEAN) --- */}
      <Box sx={{ py: { xs: 12, md: 16 }, px: 3, bgcolor: '#fafafa', borderTop: '1px solid #e5e7eb' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Chip label="Pertanyaan Populer" size="small" sx={{ mb: 3, bgcolor: '#e5e7eb', color: '#4b5563', fontWeight: 600, borderRadius: '6px' }} />
            <Typography variant="h2" fontWeight={800} color="#111827" sx={{ mb: 2, letterSpacing: '-0.04em', fontSize: { xs: '2rem', md: '3rem' } }}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="body1" color="#6b7280" sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.125rem' }}>
              Semua yang perlu Anda ketahui tentang produk dan lisensi kami. Tidak menemukan jawaban? Hubungi tim support kami.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              {
                q: 'Apakah saya bisa menggunakan template ini untuk project klien?',
                a: 'Tentu saja! Lisensi komersial kami mengizinkan Anda menggunakan template ini untuk jumlah project klien yang tidak terbatas. Anda bebas memodifikasi dan menyesuaikan source code sesuai kebutuhan spesifik mereka.'
              },
              {
                q: 'Apakah ada biaya langganan bulanan?',
                a: 'Tidak. Sistem kami adalah one-time payment (bayar sekali di awal). Anda akan mendapatkan akses seumur hidup ke produk yang Anda beli, termasuk semua update minor dan major di masa mendatang secara gratis.'
              },
              {
                q: 'Framework dan bahasa pemrograman apa saja yang didukung?',
                a: 'Mayoritas komponen UI kami dibangun menggunakan React, Next.js, dan TailwindCSS. Untuk produk backend, kami menyediakan boilerplate dengan Laravel dan Express.js (TypeScript). Pastikan membaca deskripsi setiap produk.'
              },
              {
                q: 'Bagaimana jika saya menemukan bug pada source code?',
                a: 'Kualitas kode adalah prioritas utama kami. Jika Anda menemukan bug, Anda dapat langsung melaporkannya melalui platform kami, dan tim engineer kami akan merilis patch dalam waktu 1-2 hari kerja.'
              },
              {
                q: 'Apakah saya mendapatkan bantuan teknis (support)?',
                a: 'Ya, setiap pembelian produk premium mencakup dukungan teknis prioritas selama 6 bulan. Tim kami siap membantu Anda menyelesaikan masalah integrasi atau konfigurasi awal.'
              }
            ].map((faq, index) => (
              <Accordion 
                key={index}
                disableGutters
                elevation={0}
                sx={{
                  bgcolor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px !important',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { margin: 0, mt: index > 0 ? 2 : 0, mb: 2, borderColor: '#d1d5db' }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#9ca3af' }} />}
                  sx={{ p: { xs: 2, md: 3 }, '& .MuiAccordionSummary-content': { my: 0 } }}
                >
                  <Typography variant="subtitle1" fontWeight={600} color="#111827" sx={{ fontSize: '1rem' }}>
                    {faq.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 }, pt: 0 }}>
                  <Typography variant="body2" color="#6b7280" sx={{ lineHeight: 1.7 }}>
                    {faq.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* --- FINAL CTA BANNER (CLEAN WHITE & MUI COMPONENTS) --- */}
      <Box sx={{ py: { xs: 8, md: 10 }, px: 3, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            borderRadius: '32px', 
            background: '#ffffff', 
            border: '1px solid #e5e7eb',
            p: 0, 
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)'
          }}>
            {/* Subtle Gradient Glows for White Theme */}
            <Box sx={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '40%', height: '100%', background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />

            {/* Left Content */}
            <Box sx={{ p: { xs: 4, sm: 6, md: 8 }, flex: 1, position: 'relative', zIndex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h2" fontWeight={800} color="#111827" sx={{ mb: 3, letterSpacing: '-0.04em', fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1.1 }}>
                Mulai bangun <br/>
                <Box component="span" sx={{ color: '#3B82F6' }}>
                  produk impianmu.
                </Box>
              </Typography>
              <Typography variant="body1" color="#4b5563" sx={{ mb: 5, maxWidth: 500, fontSize: '1.125rem', lineHeight: 1.6, mx: { xs: 'auto', md: 0 } }}>
                Bergabunglah dengan ribuan developer yang telah mempercayakan proyek mereka pada aset digital dan komponen UI premium dari Dibitech.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button component={Link} to="/register" variant="contained" disableElevation sx={{ bgcolor: '#111827', color: '#ffffff', fontWeight: 700, borderRadius: '12px', px: 4, py: 1.5, textTransform: 'none', fontSize: '1.05rem', '&:hover': { bgcolor: '#374151', transform: 'translateY(-2px)' }, transition: 'all 0.3s ease' }}>
                  Eksplorasi Sekarang
                </Button>
                <Button component={Link} to="/products" variant="outlined" sx={{ borderColor: '#e5e7eb', color: '#111827', fontWeight: 600, borderRadius: '12px', px: 4, py: 1.5, textTransform: 'none', fontSize: '1.05rem', '&:hover': { borderColor: '#d1d5db', bgcolor: '#f9fafb' } }}>
                  Lihat Katalog
                </Button>
              </Box>
            </Box>

            {/* Right Side: Authentic MUI Components (Hidden on very small screens) */}
            <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', position: 'relative', height: '100%', minHeight: 400, width: '100%' }}>
              <Box sx={{ 
                width: '120%', 
                position: 'absolute', 
                right: '-5%', 
                top: '50%',
                background: '#fafafa',
                borderLeft: '1px solid #e5e7eb',
                borderTop: '1px solid #e5e7eb',
                borderRadius: '32px 0 0 32px',
                p: 5,
                transform: 'translateY(-50%) rotate(-4deg)',
                boxShadow: '-20px 20px 60px rgba(0,0,0,0.05)',
              }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  
                  {/* Actual MUI Component 1: Paper with Avatar and Switch */}
                  <Paper elevation={2} sx={{ p: 2.5, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#ffffff', border: '1px solid #f3f4f6' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src="https://i.pravatar.cc/150?img=32" sx={{ width: 48, height: 48 }} />
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700} color="#111827" sx={{ fontSize: '1rem' }}>Notifikasi Sistem</Typography>
                        <Typography variant="caption" color="#6b7280" sx={{ fontSize: '0.8rem' }}>Pembaruan real-time</Typography>
                      </Box>
                    </Box>
                    <Switch defaultChecked color="primary" />
                  </Paper>

                  {/* Actual MUI Component 2: Alert */}
                  <Alert severity="success" elevation={2} variant="filled" sx={{ borderRadius: '16px', fontWeight: 600, alignItems: 'center', py: 1, bgcolor: '#10b981', color: '#fff' }}>
                    Pembayaran sebesar Rp 450.000 berhasil!
                  </Alert>

                  {/* Actual MUI Component 3: Paper with AvatarGroup */}
                  <Paper elevation={2} sx={{ p: 2.5, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#ffffff', border: '1px solid #f3f4f6' }}>
                     <Box>
                        <Typography variant="subtitle2" fontWeight={700} color="#111827" sx={{ mb: 1, fontSize: '0.95rem' }}>Tim Proyek (Dibitech)</Typography>
                        <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 36, height: 36, fontSize: '0.875rem', border: '2px solid #fff' } }}>
                          <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/150?img=11" />
                          <Avatar alt="Travis Howard" src="https://i.pravatar.cc/150?img=12" />
                          <Avatar alt="Cindy Baker" src="https://i.pravatar.cc/150?img=13" />
                          <Avatar alt="Agnes Walker" src="https://i.pravatar.cc/150?img=14" />
                          <Avatar alt="Trevor Henderson" src="https://i.pravatar.cc/150?img=15" />
                        </AvatarGroup>
                     </Box>
                     <Button variant="outlined" size="small" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 700, color: '#111827', borderColor: '#e5e7eb', '&:hover': { bgcolor: '#f9fafb', borderColor: '#d1d5db' } }}>
                       Undang
                     </Button>
                  </Paper>

                </Box>
              </Box>
            </Box>

          </Box>
        </Container>
      </Box>

    </Box>
  );
}
