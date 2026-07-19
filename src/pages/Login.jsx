import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api/client';
import { Box, Button, TextField, Typography, Alert, Grid } from '@mui/material';
import Logo from '../components/atoms/Logo';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.success) {
        login(response.data.access_token, response.data.user);
        navigate('/');
      } else {
        setError(response.message || 'Login gagal.');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: { xs: '#f9fafb', md: '#ffffff' } }}>
      <Grid container>

        {/* Desktop Left Side */}
        <Grid 
          item 
          xs={12} 
          md={5} 
          sx={{ 
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            bgcolor: '#000000',
            color: '#ffffff',
            p: 6,
          }}
        >
          <Box>
            <Logo color="#ffffff" />
          </Box>
          <Box>
            <Typography variant="h3" fontWeight={700} sx={{ letterSpacing: '-0.03em', mb: 2, lineHeight: 1.2 }}>
              Akses cepat. <br />
              Kerja tepat.
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Masuk ke akun Anda untuk menemukan ribuan aset digital premium dan kelola transaksi dengan mudah.
            </Typography>
          </Box>
        </Grid>

        {/* Right Side (Form) */}
        <Grid 
          item 
          xs={12} 
          md={7} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            p: { xs: 2, sm: 6, md: 10 }
          }}
        >
          {/* Mobile Logo */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mb: 4, mt: 4 }}>
            <Logo color="#111827" />
          </Box>

          <Box sx={{ 
            width: '100%', 
            maxWidth: 440,
            bgcolor: '#ffffff',
            p: { xs: 4, md: 0 },
            borderRadius: { xs: '24px', md: 0 },
            boxShadow: { xs: '0 20px 40px -15px rgba(0,0,0,0.05)', md: 'none' },
            border: { xs: '1px solid #e5e7eb', md: 'none' }
          }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#111827', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="#6b7280" sx={{ mb: 4 }}>
              Masukkan detail akun Anda untuk melanjutkan.
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

            <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: '12px',
                    bgcolor: '#f9fafb',
                    '& fieldset': { borderColor: '#e5e7eb' },
                    '&:hover fieldset': { borderColor: '#d1d5db' },
                    '&.Mui-focused fieldset': { borderColor: '#4f46e5' },
                  }
                }}
              />
              <TextField
                label="Password"
                type="password"
                placeholder="Ketik password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: '12px',
                    bgcolor: '#f9fafb',
                    '& fieldset': { borderColor: '#e5e7eb' },
                    '&:hover fieldset': { borderColor: '#d1d5db' },
                    '&.Mui-focused fieldset': { borderColor: '#4f46e5' },
                  }
                }}
              />

              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                disabled={loading}
                disableElevation
                sx={{ 
                  mt: 1, 
                  py: 1.8, 
                  borderRadius: '12px',
                  bgcolor: '#111827',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#374151' }
                }}
              >
                {loading ? 'Memproses...' : 'Login'}
              </Button>

              <Typography variant="body2" sx={{ mt: 2, color: '#6b7280', textAlign: 'center' }}>
                Belum punya akun? <Link to="/register" style={{ textDecoration: 'none', color: '#4f46e5', fontWeight: 600 }}>Daftar di sini</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}
