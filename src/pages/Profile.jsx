import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Box, Container, Typography, TextField, Button,
  Alert, CircularProgress, Divider, Avatar, Paper, Grid
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export default function Profile() {
  const { user, updateUser } = useAuth();

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '' // assuming there might be an avatar URL field later
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  // Common Input Styles
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: '#fcfcfd',
      transition: 'all 0.2s',
      '& fieldset': { borderColor: '#e4e4e7', borderWidth: '1px' },
      '&:hover fieldset': { borderColor: '#a1a1aa' },
      '&.Mui-focused fieldset': { borderColor: '#09090b', borderWidth: '2px' },
      '&.Mui-focused': { backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)' },
      '& input': {
        padding: '12px 14px',
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
      transform: 'translate(14px, 12px) scale(1)',
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

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage({ type: '', text: '' });

    try {
      // Mocking API call to /profile
      // In a real Laravel backend: await apiRequest('/profile', { method: 'PUT', body: JSON.stringify(profileForm) });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Update global user context immediately
      updateUser({ name: profileForm.name, email: profileForm.email });
      setProfileMessage({ type: 'success', text: 'Profil berhasil diperbarui.' });
    } catch (err) {
      setProfileMessage({ type: 'error', text: err.message || 'Gagal memperbarui profil.' });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage({ type: '', text: '' });

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setPasswordMessage({ type: 'error', text: 'Konfirmasi password baru tidak cocok.' });
      setPasswordLoading(false);
      return;
    }

    if (passwordForm.new_password.length < 8) {
      setPasswordMessage({ type: 'error', text: 'Password baru minimal 8 karakter.' });
      setPasswordLoading(false);
      return;
    }

    try {
      // Mocking API call to /password
      // await apiRequest('/password', { method: 'PUT', body: JSON.stringify(passwordForm) });
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setPasswordMessage({ type: 'success', text: 'Password berhasil diubah.' });
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      setPasswordMessage({ type: 'error', text: err.message || 'Gagal merubah password.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Box sx={{ bgcolor: '#FAFAFA', minHeight: '100vh', pb: 10 }}>
      {/* Header Section */}
      <Box sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', pt: { xs: 4, md: 5 }, pb: { xs: 3, md: 4 }, px: { xs: 2, md: 3 }, mb: { xs: 4, md: 6 } }}>
        <Container maxWidth="md" disableGutters sx={{ px: { xs: 1, sm: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar 
              sx={{ 
                width: 72, 
                height: 72, 
                bgcolor: '#09090b', 
                color: '#ffffff', 
                fontSize: '2rem', 
                fontWeight: 800,
                border: '4px solid #f4f4f5'
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={800} sx={{ color: '#09090b', mb: 0.5, letterSpacing: '-0.03em', fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
                Pengaturan Akun
              </Typography>
              <Typography variant="body1" sx={{ color: '#71717a' }}>
                Kelola informasi profil dan keamanan akun Anda.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={4}>
          
          {/* Bagian Profil */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #EAEAEA', bgcolor: '#ffffff', overflow: 'hidden' }}>
              <Box sx={{ p: { xs: 3, sm: 4 }, borderBottom: '1px solid #f4f4f5' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <PersonIcon sx={{ color: '#09090b' }} />
                  <Typography variant="h6" fontWeight={800} sx={{ color: '#09090b' }}>Data Personal</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#71717a' }}>
                  Perbarui nama dan email yang digunakan untuk masuk ke akun Anda.
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleProfileUpdate} sx={{ p: { xs: 3, sm: 4 } }}>
                {profileMessage.text && (
                  <Alert severity={profileMessage.type} sx={{ mb: 3, borderRadius: '8px' }}>
                    {profileMessage.text}
                  </Alert>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label="Nama Lengkap"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    required
                    fullWidth
                    disabled={profileLoading}
                    sx={inputStyles}
                  />
                  
                  <TextField
                    label="Email Address"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    required
                    fullWidth
                    disabled={profileLoading}
                    sx={inputStyles}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      disabled={profileLoading}
                      disableElevation
                      sx={{ 
                        bgcolor: '#09090b',
                        color: '#ffffff',
                        fontWeight: 600,
                        textTransform: 'none',
                        px: 4, py: 1.2,
                        borderRadius: '8px',
                        '&:hover': { bgcolor: '#27272a' },
                        '&.Mui-disabled': { bgcolor: '#e4e4e7', color: '#a1a1aa' }
                      }}
                    >
                      {profileLoading ? <CircularProgress size={24} color="inherit" /> : 'Simpan Perubahan'}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Bagian Keamanan (Password) */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #EAEAEA', bgcolor: '#ffffff', overflow: 'hidden' }}>
              <Box sx={{ p: { xs: 3, sm: 4 }, borderBottom: '1px solid #f4f4f5' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <VpnKeyIcon sx={{ color: '#09090b' }} />
                  <Typography variant="h6" fontWeight={800} sx={{ color: '#09090b' }}>Keamanan Akun</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#71717a' }}>
                  Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.
                </Typography>
              </Box>

              <Box component="form" onSubmit={handlePasswordUpdate} sx={{ p: { xs: 3, sm: 4 } }}>
                {passwordMessage.text && (
                  <Alert severity={passwordMessage.type} sx={{ mb: 3, borderRadius: '8px' }}>
                    {passwordMessage.text}
                  </Alert>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label="Password Saat Ini"
                    type="password"
                    value={passwordForm.current_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                    required
                    fullWidth
                    disabled={passwordLoading}
                    sx={inputStyles}
                  />
                  
                  <Divider sx={{ borderStyle: 'dashed', borderColor: '#e4e4e7' }} />
                  
                  <TextField
                    label="Password Baru"
                    type="password"
                    value={passwordForm.new_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                    required
                    fullWidth
                    disabled={passwordLoading}
                    sx={inputStyles}
                    helperText="Minimal 8 karakter."
                  />

                  <TextField
                    label="Konfirmasi Password Baru"
                    type="password"
                    value={passwordForm.confirm_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                    required
                    fullWidth
                    disabled={passwordLoading}
                    sx={inputStyles}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      disabled={passwordLoading || !passwordForm.current_password || !passwordForm.new_password || !passwordForm.confirm_password}
                      disableElevation
                      sx={{ 
                        bgcolor: '#09090b',
                        color: '#ffffff',
                        fontWeight: 600,
                        textTransform: 'none',
                        px: 4, py: 1.2,
                        borderRadius: '8px',
                        '&:hover': { bgcolor: '#27272a' },
                        '&.Mui-disabled': { bgcolor: '#e4e4e7', color: '#a1a1aa' }
                      }}
                    >
                      {passwordLoading ? <CircularProgress size={24} color="inherit" /> : 'Perbarui Password'}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
}
