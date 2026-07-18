import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Container, Typography, Box, CircularProgress, Alert,
  Paper, Avatar, Chip, TextField, InputAdornment, Pagination,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useFetch } from '../hooks/useFetch';
import { useSearch } from '../hooks/useSearch';
import { useAuth } from '../context/AuthContext';

export default function Users() {
  const { user, isLoggedIn } = useAuth();
  const [page, setPage] = useState(1);

  const { data: response, loading, error } = useFetch(`/users?page=${page}`, []);

  const users = Array.isArray(response) ? response : (response?.data || []);
  const totalPages = response?.last_page || 1;

  const { search, setSearch, filteredData: filteredUsers } = useSearch(users, ['name', 'email']);

  if (!isLoggedIn || user?.role !== 'admin') {
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
      <Container maxWidth="lg" sx={{ py: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1 }}>
          <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{
              color: 'primary.main',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              letterSpacing: '-0.025em',
            }}
          >
            Daftar User
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', fontSize: { xs: '0.95rem', md: '1.15rem' } }}>
          Jelajahi semua pengguna yang terdaftar di platform
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <TextField
          fullWidth
          placeholder="Cari berdasarkan nama atau email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              '& fieldset': { border: 'none' },
            },
          }}
        />
      </Paper>

      {filteredUsers.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 3 }}>Tidak ada user yang ditemukan.</Alert>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  User
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Role
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} align="right">
                  Saldo
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} align="center">
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((u) => (
                <TableRow
                  key={u.user_id}
                  sx={{
                    transition: 'background-color 0.2s',
                    '&:hover': { bgcolor: 'action.hover' },
                    '&:last-child td': { borderBottom: 0 },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 42,
                          height: 42,
                          bgcolor: 'primary.main',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 8px rgba(79,70,229,0.25)',
                        }}
                      >
                        {u.name?.charAt(0)?.toUpperCase() || '?'}
                      </Avatar>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {u.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {u.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={u.role?.charAt(0).toUpperCase() + u.role?.slice(1)}
                      color={roleColor(u.role)}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: 600, borderRadius: 2 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      Rp {Number(u.balance || 0).toLocaleString('id-ID')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Lihat Detail" arrow>
                      <IconButton
                        component={Link}
                        to={`/users/${u.user_id}`}
                        color="primary"
                        size="small"
                        sx={{
                          bgcolor: 'primary.50',
                          '&:hover': { bgcolor: 'primary.100' },
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
}
