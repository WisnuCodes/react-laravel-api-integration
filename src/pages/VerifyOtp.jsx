import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, Container, Typography, Button, 
  Alert, CircularProgress, Paper, Stack 
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import Logo from '../components/atoms/Logo';

export default function VerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(0);
  
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUser } = useAuth();
  
  const email = location.state?.email;

  useEffect(() => {
    // Jika tidak ada email dari state (akses langsung URL), kembalikan ke register
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Fokus ke input berikutnya otomatis
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Hapus dan pindah ke input sebelumnya jika backspace
    if (e.key === 'Backspace') {
      if (otp[index] === '' && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.some(isNaN)) return;
    
    const newOtp = [...otp];
    pastedData.forEach((value, index) => {
      newOtp[index] = value;
    });
    setOtp(newOtp);
    
    // Fokus ke input terakhir yang terisi
    const lastFilledIndex = pastedData.length - 1;
    if (inputRefs.current[lastFilledIndex]) {
      inputRefs.current[lastFilledIndex].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Mohon masukkan 6 digit kode OTP secara lengkap.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/verify-otp', {
        email: email,
        otp: otpString
      });

      const { access_token, user } = response.data.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      updateUser(user);

      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Kode OTP salah atau telah kedaluwarsa.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/resend-otp', { email: email });
      setSuccess(response.data.message || 'Kode OTP baru telah dikirim ke email Anda.');
      setCountdown(60); // Cooldown 60 detik
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengirim ulang OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  if (!email) return null;

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      bgcolor: '#FAFAFA',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decor (Matching Login/Register) */}
      <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }} />
      <Box sx={{ position: 'absolute', bottom: -100, left: -50, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }} />

      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, py: 4 }}>
        <Paper 
          elevation={0}
          sx={{
            width: '100%',
            p: { xs: 4, sm: 6 },
            borderRadius: '24px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}
        >
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <Logo color="#0F172A" />
          </Box>

          <Typography variant="h4" fontWeight={800} color="#0F172A" sx={{ mb: 1, letterSpacing: '-0.5px' }}>
            Cek Email Anda
          </Typography>
          <Typography variant="body1" color="#64748B" sx={{ mb: 4, lineHeight: 1.6 }}>
            Kami telah mengirimkan 6 digit kode OTP ke email <br/>
            <strong style={{ color: '#0F172A' }}>{email}</strong>
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px', '& .MuiAlert-icon': { mt: '2px' } }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: '12px', '& .MuiAlert-icon': { mt: '2px' } }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 4 }} onPaste={handlePaste}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  ref={el => inputRefs.current[index] = el}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  style={{
                    width: '45px',
                    height: '55px',
                    fontSize: '24px',
                    fontWeight: '700',
                    textAlign: 'center',
                    borderRadius: '12px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#F8FAFC',
                    color: '#0F172A',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                  }}
                  onFocusCapture={(e) => {
                    e.target.style.borderColor = '#3B82F6';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59,130,246,0.1)';
                    e.target.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlurCapture={(e) => {
                    e.target.style.borderColor = '#CBD5E1';
                    e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)';
                    e.target.style.backgroundColor = '#F8FAFC';
                  }}
                />
              ))}
            </Stack>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || otp.join('').length !== 6}
              sx={{
                py: 1.8,
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                bgcolor: '#0F172A',
                boxShadow: '0 4px 6px -1px rgba(15,23,42,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: '#1E293B',
                  boxShadow: '0 10px 15px -3px rgba(15,23,42,0.2)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s',
                '&.Mui-disabled': {
                  bgcolor: '#E2E8F0',
                  color: '#94A3B8'
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Verifikasi & Masuk'}
            </Button>
          </form>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="#64748B">
              Belum menerima kode?{' '}
              <Button
                variant="text"
                disabled={countdown > 0 || resendLoading}
                onClick={handleResend}
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600, 
                  p: 0, 
                  minWidth: 'auto',
                  color: '#3B82F6',
                  '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                }}
              >
                {resendLoading ? (
                  <CircularProgress size={12} sx={{ mr: 1 }} />
                ) : null}
                {countdown > 0 ? `Kirim ulang dalam ${countdown}s` : 'Kirim Ulang'}
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
