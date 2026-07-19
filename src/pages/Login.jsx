import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api/client';
import { Box, Button, TextField, Typography, Alert, InputAdornment, IconButton, CircularProgress, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from '../components/atoms/Logo';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: '#fcfcfd',
      transition: 'all 0.2s',
      '& fieldset': {
        borderColor: '#e4e4e7',
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: '#a1a1aa',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#09090b',
        borderWidth: '2px',
      },
      '&.Mui-focused': {
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
      },
      '& input': {
        padding: '13px 14px',
        fontSize: '0.95rem',
        fontWeight: 500,
        color: '#09090b',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
      }
    },
    '& .MuiInputLabel-root': {
      color: '#71717a',
      fontSize: '0.95rem',
      fontWeight: 500,
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      transform: 'translate(14px, 13px) scale(1)',
      '&.Mui-focused, &.MuiFormLabel-filled': {
        transform: 'translate(14px, -9px) scale(0.85)',
        color: '#09090b',
        fontWeight: 700,
        backgroundColor: '#ffffff',
        padding: '0 6px',
        borderRadius: '4px'
      }
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f4f4f5',
        position: 'relative',
        p: 3,
        overflow: 'hidden'
      }}
    >
      {/* Distinct Professional "Engineering" Grid Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(#d4d4d8 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: 0.6,
        pointerEvents: 'none'
      }} />

      <Box 
        sx={{ 
          width: '100%', 
          maxWidth: 440, 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#ffffff', px: 3, py: 1.5, borderRadius: '100px', border: '1px solid #e4e4e7', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <Logo color="#09090b" />
          <Divider orientation="vertical" flexItem sx={{ borderColor: '#e4e4e7', my: 0.5 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#09090b', letterSpacing: '0.05em' }}>
            PORTAL
          </Typography>
        </Box>

        <Box 
          sx={{ 
            width: '100%',
            bgcolor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e4e4e7',
            borderTop: '4px solid #09090b', // Bold brand accent line
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
            p: { xs: 4, sm: 5 },
            position: 'relative'
          }}
        >
          {/* Decorative Corner Element for Uniqueness */}
          <Box sx={{ position: 'absolute', top: 0, right: 0, p: 2, opacity: 0.2 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 0V24H0V0H24ZM2 22H22V2H2V22Z" fill="currentColor"/>
              <rect x="6" y="6" width="12" height="12" fill="currentColor"/>
            </svg>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h1" sx={{ 
              color: '#09090b', 
              fontWeight: 800, 
              letterSpacing: '-0.03em', 
              mb: 1,
              fontFamily: '"Plus Jakarta Sans", sans-serif'
            }}>
              Welcome back
            </Typography>
            <Typography variant="body2" sx={{ color: '#71717a', fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '0.95rem' }}>
              Please enter your details to sign in.
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                borderRadius: '8px',
                bgcolor: '#fef2f2',
                color: '#991b1b',
                border: '1px solid #fecaca',
                fontFamily: '"Plus Jakarta Sans", sans-serif'
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              disabled={loading}
              sx={inputStyles}
            />

            <Box>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#a1a1aa' }}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Link to="#" style={{ textDecoration: 'none', color: '#71717a', fontSize: '0.85rem', fontWeight: 600, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Forgot password?
                </Link>
              </Box>
            </Box>

            <Button 
              type="submit" 
              variant="contained" 
              disabled={loading}
              disableElevation
              sx={{ 
                mt: 1, 
                py: 1.5, 
                borderRadius: '8px',
                bgcolor: '#09090b',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                  bgcolor: '#27272a',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
                '&.Mui-disabled': {
                  bgcolor: '#e4e4e7',
                  color: '#a1a1aa',
                  boxShadow: 'none'
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center', p: 2, bgcolor: '#ffffff', borderRadius: '100px', border: '1px solid #e4e4e7', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <Typography variant="body2" sx={{ color: '#71717a', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ 
              textDecoration: 'none', 
              color: '#09090b', 
              fontWeight: 800,
            }}>
              Sign up now
            </Link>
          </Typography>
        </Box>
      </Box>

    </Box>
  );
}
