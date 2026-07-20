import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Box, Container, Typography, TextField, Button,
  Alert, CircularProgress, Divider, Avatar, Grid,
  Tabs, Tab, Card, CardHeader, CardContent, CardActions, IconButton,
  Stack, InputAdornment
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentIcon from '@mui/icons-material/Payment';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockResetIcon from '@mui/icons-material/LockReset';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage({ type: '', text: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      updateUser({ name: profileForm.name, email: profileForm.email });
      setProfileMessage({ type: 'success', text: 'Profil berhasil diperbarui dengan sukses.' });
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
      setPasswordMessage({ type: 'error', text: 'Konfirmasi kata sandi baru tidak cocok.' });
      setPasswordLoading(false);
      return;
    }

    if (passwordForm.new_password.length < 8) {
      setPasswordMessage({ type: 'error', text: 'Kata sandi baru minimal 8 karakter.' });
      setPasswordLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setPasswordMessage({ type: 'success', text: 'Kata sandi akun Anda telah diperbarui.' });
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      setPasswordMessage({ type: 'error', text: err.message || 'Gagal merubah kata sandi.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', py: { xs: 4, md: 8 } }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: { xs: 4, md: 6 }, px: { xs: 1, md: 0 } }}>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#0F172A', mb: 1, letterSpacing: '-0.02em' }}>
            Pengaturan Akun
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B' }}>
            Kelola preferensi, keamanan, dan informasi profil publik Anda.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Navigation Tabs - Modern Pill Style */}
          <Grid item xs={12} md={3.5}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                borderRight: { xs: 0, md: 0 },
                '& .MuiTab-root': {
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  minHeight: 50,
                  color: '#64748B',
                  borderRadius: '12px',
                  mb: 1,
                  px: 3,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: '#F1F5F9',
                    color: '#0F172A'
                  },
                  '&.Mui-selected': {
                    color: 'primary.main',
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                  }
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                }
              }}
            >
              <Tab icon={<PersonIcon sx={{ mr: 1.5, fontSize: '1.25rem' }} />} iconPosition="start" label="Profil Publik" />
              <Tab icon={<SecurityIcon sx={{ mr: 1.5, fontSize: '1.25rem' }} />} iconPosition="start" label="Keamanan & Sandi" />
              <Tab icon={<NotificationsIcon sx={{ mr: 1.5, fontSize: '1.25rem' }} />} iconPosition="start" label="Notifikasi" disabled />
              <Tab icon={<PaymentIcon sx={{ mr: 1.5, fontSize: '1.25rem' }} />} iconPosition="start" label="Pembayaran" disabled />
            </Tabs>
          </Grid>

          {/* Forms Area */}
          <Grid item xs={12} md={8.5}>
            
            {/* PROFIL TAB */}
            <TabPanel value={tabValue} index={0}>
              <Card elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', bgcolor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)' }}>
                <CardHeader 
                  title="Profil Publik" 
                  titleTypographyProps={{ fontWeight: 800, fontSize: '1.25rem', color: '#0F172A' }}
                  subheader="Informasi ini akan ditampilkan secara publik di akun Anda."
                  subheaderTypographyProps={{ color: '#64748B', mt: 0.5 }}
                  sx={{ p: 4, pb: 3 }}
                />
                <Divider sx={{ borderColor: '#F1F5F9' }} />
                
                <Box component="form" onSubmit={handleProfileUpdate}>
                  <CardContent sx={{ p: 4 }}>
                    {profileMessage.text && (
                      <Alert severity={profileMessage.type} sx={{ mb: 4, borderRadius: '8px', '& .MuiAlert-message': { fontWeight: 500 } }}>
                        {profileMessage.text}
                      </Alert>
                    )}

                    <Stack spacing={5}>
                      {/* Avatar Upload */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box sx={{ position: 'relative' }}>
                          <Avatar sx={{ width: 88, height: 88, bgcolor: 'primary.main', fontSize: '2.5rem', fontWeight: 700, boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.15)' }}>
                            {user.name?.charAt(0).toUpperCase()}
                          </Avatar>
                          <IconButton 
                            sx={{ 
                              position: 'absolute', bottom: -4, right: -4, 
                              bgcolor: 'background.paper', border: '1px solid #E2E8F0',
                              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                              '&:hover': { bgcolor: '#F8FAFC' }
                            }}
                            size="small"
                          >
                            <PhotoCameraIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                          </IconButton>
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="700" color="text.primary" sx={{ mb: 0.5 }}>Foto Profil</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                            Direkomendasikan rasio 1:1, maksimal 2MB.
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1.5 }}>
                            <Button 
                              size="small" 
                              variant="outlined" 
                              sx={{ 
                                textTransform: 'none', fontWeight: 600, borderRadius: '8px', 
                                borderColor: '#e4e4e7', color: '#18181b', bgcolor: '#ffffff',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                '&:hover': { bgcolor: '#f4f4f5', borderColor: '#d4d4d8' }
                              }}>
                              Ubah
                            </Button>
                            <Button 
                              size="small" 
                              color="error" 
                              sx={{ 
                                textTransform: 'none', fontWeight: 600, borderRadius: '8px', color: '#ef4444',
                                '&:hover': { bgcolor: '#fef2f2' }
                              }}>
                              Hapus
                            </Button>
                          </Box>
                        </Box>
                      </Box>

                      {/* Inputs */}
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Nama Lengkap"
                            variant="outlined"
                            fullWidth
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            required
                            disabled={profileLoading}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <BadgeIcon sx={{ color: '#94A3B8' }} />
                                </InputAdornment>
                              ),
                              sx: { borderRadius: '10px', bgcolor: '#F8FAFC', '&:hover': { bgcolor: '#ffffff' } }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Alamat Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            required
                            disabled={profileLoading}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon sx={{ color: '#94A3B8' }} />
                                </InputAdornment>
                              ),
                              sx: { borderRadius: '10px', bgcolor: '#F8FAFC', '&:hover': { bgcolor: '#ffffff' } }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Stack>
                  </CardContent>
                  
                  <Divider sx={{ borderColor: '#F1F5F9' }} />
                  <CardActions sx={{ p: { xs: 3, md: 4 }, justifyContent: 'flex-end', bgcolor: '#F8FAFC', borderRadius: '0 0 16px 16px' }}>
                    <Button 
                      type="submit" 
                      variant="contained"
                      disabled={profileLoading}
                      disableElevation
                      sx={{ 
                        bgcolor: '#09090b', color: '#fafafa', px: 4, py: 1.2, textTransform: 'none', fontWeight: 600, borderRadius: '8px',
                        border: '1px solid #000000',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': { 
                          bgcolor: '#27272a',
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
                        },
                        '&:active': { transform: 'scale(0.97)' },
                        '&.Mui-disabled': { bgcolor: '#e4e4e7', color: '#a1a1aa', border: 'none', boxShadow: 'none' }
                      }}
                    >
                      {profileLoading ? <CircularProgress size={24} color="inherit" /> : 'Simpan Profil'}
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </TabPanel>

            {/* SECURITY TAB */}
            <TabPanel value={tabValue} index={1}>
              <Card elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', bgcolor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)' }}>
                <CardHeader 
                  title="Keamanan Akun" 
                  titleTypographyProps={{ fontWeight: 800, fontSize: '1.25rem', color: '#0F172A' }}
                  subheader="Perbarui kata sandi Anda untuk memastikan akun tetap aman dari akses tidak sah."
                  subheaderTypographyProps={{ color: '#64748B', mt: 0.5 }}
                  sx={{ p: 4, pb: 3 }}
                />
                <Divider sx={{ borderColor: '#F1F5F9' }} />
                
                <Box component="form" onSubmit={handlePasswordUpdate}>
                  <CardContent sx={{ p: 4 }}>
                    {passwordMessage.text && (
                      <Alert severity={passwordMessage.type} sx={{ mb: 4, borderRadius: '8px', '& .MuiAlert-message': { fontWeight: 500 } }}>
                        {passwordMessage.text}
                      </Alert>
                    )}

                    <Stack spacing={3} sx={{ maxWidth: 500 }}>
                      <TextField
                        label="Kata Sandi Saat Ini"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={passwordForm.current_password}
                        onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                        required
                        disabled={passwordLoading}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyIcon sx={{ color: '#94A3B8' }} />
                            </InputAdornment>
                          ),
                          sx: { borderRadius: '10px', bgcolor: '#F8FAFC', '&:hover': { bgcolor: '#ffffff' } }
                        }}
                      />
                      
                      <Divider sx={{ my: 1, borderStyle: 'dashed', borderColor: '#E2E8F0' }} />
                      
                      <TextField
                        label="Kata Sandi Baru"
                        variant="outlined"
                        type="password"
                        fullWidth
                        helperText="Minimal 8 karakter."
                        FormHelperTextProps={{ sx: { ml: 0 } }}
                        value={passwordForm.new_password}
                        onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                        required
                        disabled={passwordLoading}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockResetIcon sx={{ color: '#94A3B8' }} />
                            </InputAdornment>
                          ),
                          sx: { borderRadius: '10px', bgcolor: '#F8FAFC', '&:hover': { bgcolor: '#ffffff' } }
                        }}
                      />
                      
                      <TextField
                        label="Konfirmasi Kata Sandi Baru"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={passwordForm.confirm_password}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                        required
                        disabled={passwordLoading}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockResetIcon sx={{ color: '#94A3B8' }} />
                            </InputAdornment>
                          ),
                          sx: { borderRadius: '10px', bgcolor: '#F8FAFC', '&:hover': { bgcolor: '#ffffff' } }
                        }}
                      />
                    </Stack>
                  </CardContent>
                  
                  <Divider sx={{ borderColor: '#F1F5F9' }} />
                  <CardActions sx={{ p: { xs: 3, md: 4 }, justifyContent: 'flex-start', bgcolor: '#F8FAFC', borderRadius: '0 0 16px 16px' }}>
                    <Button 
                      type="submit" 
                      variant="contained"
                      disabled={passwordLoading || !passwordForm.current_password || !passwordForm.new_password || !passwordForm.confirm_password}
                      disableElevation
                      sx={{ 
                        bgcolor: '#09090b', color: '#fafafa', px: 4, py: 1.2, textTransform: 'none', fontWeight: 600, borderRadius: '8px',
                        border: '1px solid #000000',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': { 
                          bgcolor: '#27272a',
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
                        },
                        '&:active': { transform: 'scale(0.97)' },
                        '&.Mui-disabled': { bgcolor: '#e4e4e7', color: '#a1a1aa', border: 'none', boxShadow: 'none' }
                      }}
                    >
                      {passwordLoading ? <CircularProgress size={24} color="inherit" /> : 'Perbarui Kata Sandi'}
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </TabPanel>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
