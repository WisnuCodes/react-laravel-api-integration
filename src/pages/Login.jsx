import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api/client';
import { Box, Button, TextField, Typography, Alert, Grid } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: '#ffffff' }}>
      <Grid container>

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
            <Typography 
              variant="h5" 
              fontWeight="bold" 
              component={Link}
              to="/"
              sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }}
            >
              <AutoAwesomeIcon /> Dibitech
            </Typography>
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

        <Grid 
          item 
          xs={12} 
          md={7} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: { xs: 3, sm: 6, md: 10 }
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#000000', fontWeight: 700, letterSpacing: '-0.03em' }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="#6b7280" sx={{ mb: 4, fontSize: '0.95rem' }}>
              Masukkan detail akun Anda untuk melanjutkan.
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>{error}</Alert>}

            <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="Email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
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
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />

              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                disabled={loading}
                disableElevation
                sx={{ 
                  mt: 1, 
                  py: 1.5, 
                  borderRadius: '8px',
                  bgcolor: '#000000',
                  color: '#ffffff',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#333333' }
                }}
              >
                {loading ? 'Memproses...' : 'Login'}
              </Button>

              <Typography variant="body2" sx={{ mt: 2, color: '#6b7280', textAlign: 'center' }}>
                Belum punya akun? <Link to="/register" style={{ textDecoration: 'none', color: '#000000', fontWeight: 600 }}>Daftar di sini</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}
