import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { Box, Button, Typography, CircularProgress, Alert, Card, CardContent, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await apiRequest(`/users/${id}`);
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          setError(response.message || 'Gagal memuat detail pengguna');
        }
      } catch (err: any) {
        console.error("Fetch user detail error:", err);
        setError(err.message || 'Terjadi kesalahan jaringan.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Alert severity="error" sx={{ mb: 3 }}>{error || 'Data pengguna tidak ditemukan'}</Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/users')}>
          Kembali ke Daftar
        </Button>
      </Box>
    );
  }

  // Helper untuk format Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(number);
  };

  const balance = user.balance ? formatRupiah(user.balance) : 'Rp 0';
  const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  }) : '-';
  const initials = user.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/users')}
          sx={{ mb: 2 }}
        >
          Kembali ke Daftar Pengguna
        </Button>
      </Box>

      <Card elevation={3} sx={{ borderRadius: 3, overflow: 'visible', mt: 4 }}>
        <Box sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          height: 100, 
          borderTopLeftRadius: 12, 
          borderTopRightRadius: 12,
          position: 'relative'
        }}>
          <Box sx={{
            width: 80,
            height: 80,
            bgcolor: 'white',
            color: 'primary.main',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            position: 'absolute',
            bottom: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: 3
          }}>
            {initials}
          </Box>
        </Box>
        
        <CardContent sx={{ pt: 7, textAlign: 'center' }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            {user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {user.email}
          </Typography>
          
          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, textAlign: 'left' }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                User ID
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                #{user.user_id}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Role Akses
              </Typography>
              <Typography variant="body1" sx={{ textTransform: 'capitalize', fontWeight: 'medium' }}>
                {user.role}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Saldo Akun
              </Typography>
              <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
                {balance}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Terdaftar Sejak
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {joinDate}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
