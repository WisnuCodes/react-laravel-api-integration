import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api/client';
import { Box, Button, TextField, Typography, Alert, Paper, MenuItem } from '@mui/material';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // default role
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiRequest('/register', {
        method: 'POST',
        body: JSON.stringify({ 
          name, 
          email, 
          password,
          role 
        }),
      });

      if (response.success) {
        // Auto login after register
        login(response.data.access_token, response.data.user);
        navigate('/users');
      } else {
        setError(response.message || 'Registrasi gagal.');
      }
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 450, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Silakan isi data diri Anda.
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nama Lengkap"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />

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
            placeholder="Buat password Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            slotProps={{ htmlInput: { minLength: 8 } }}
          />

          <TextField
            select
            label="Daftar Sebagai"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            required
          >
            <MenuItem value="buyer">Pembeli (Buyer)</MenuItem>
            <MenuItem value="seller">Penjual (Seller)</MenuItem>
          </TextField>

          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            disabled={loading}
            sx={{ mt: 1, py: 1.5, borderRadius: 2 }}
          >
            {loading ? 'Loading...' : 'Register'}
          </Button>
          
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Sudah punya akun? <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 600 }}>Login di sini</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
