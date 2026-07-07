import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api/client';
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
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
        navigate('/users');
      } else {
        setError(response.message || 'Login gagal.');
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Login untuk melanjutkan
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            placeholder="Ketik password Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            disabled={loading}
            sx={{ mt: 1, py: 1.5, borderRadius: 2 }}
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
          
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Belum punya akun? <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 600 }}>Daftar di sini</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
