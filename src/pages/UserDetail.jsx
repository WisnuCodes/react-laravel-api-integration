import { useParams, useNavigate, Navigate } from 'react-router-dom';
import {
  Container, Typography, Box, CircularProgress, Alert,
  Paper, Avatar, Chip, Button, Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';

export default function UserDetail() {
  const { user: authUser, isLoggedIn } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, loading, error } = useFetch(`/users/${id}`, null);

  if (!isLoggedIn || authUser?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const roleColor = (role) => {
    switch (role) {
      case 'seller': return 'primary';
      case 'buyer': return 'success';
      case 'admin': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress sx={{ color: '#000000' }} />
      </Container>
    );
  }

  if (error || !user) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error || 'User tidak ditemukan.'}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/users')}
          sx={{ textTransform: 'none', fontWeight: 600, color: '#000000' }}
        >
          Kembali
        </Button>
      </Container>
    );
  }

  const roleLabel = user.role?.charAt(0).toUpperCase() + user.role?.slice(1);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/users')}
        sx={{ mb: 3, textTransform: 'none', fontWeight: 600, color: '#000000' }}
      >
        Kembali
      </Button>

      {/* Profile Card */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        {/* Profile Header */}
        <Box
          sx={{
            px: { xs: 3, sm: 4 },
            pt: { xs: 4, sm: 5 },
            pb: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            bgcolor: '#fafafa',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Avatar
            sx={{
              width: 72,
              height: 72,
              bgcolor: '#000000',
              fontSize: '1.75rem',
              fontWeight: 700,
              mb: 2,
            }}
          >
            {user.name?.charAt(0)?.toUpperCase()}
          </Avatar>

          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ letterSpacing: '-0.025em', mb: 0.5 }}
          >
            {user.name}
          </Typography>

          <Typography variant="body2" sx={{ color: '#6b7280', mb: 1.5 }}>
            {user.email}
          </Typography>

          <Chip
            label={roleLabel}
            color={roleColor(user.role)}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 600, borderRadius: 2 }}
          />
        </Box>

        {/* Info Rows */}
        <Box sx={{ px: { xs: 3, sm: 4 }, py: 0 }}>
          <InfoRow
            label="Saldo"
            value={`Rp ${Number(user.balance || 0).toLocaleString('id-ID')}`}
            bold
          />
          <InfoRow
            label="Bergabung"
            value={new Date(user.created_at).toLocaleDateString('id-ID', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          />
          <InfoRow
            label="Terakhir diupdate"
            value={new Date(user.updated_at).toLocaleDateString('id-ID', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
            last
          />
        </Box>
      </Paper>
    </Container>
  );
}

function InfoRow({ label, value, bold = false, last = false }) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#6b7280',
            fontWeight: 500,
            fontSize: '0.85rem',
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: bold ? 700 : 500,
            color: '#111827',
            fontSize: bold ? '0.95rem' : '0.85rem',
          }}
        >
          {value}
        </Typography>
      </Box>
      {!last && <Divider />}
    </>
  );
}
