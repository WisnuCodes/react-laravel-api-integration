import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Alert, CircularProgress, Pagination } from '@mui/material';

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const fetchUsers = async (page: number = 1) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await apiRequest(`/users?page=${page}`);
      
      if (response.success && response.data) {
        setUsers(response.data.data);
        setPagination({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          total: response.data.total
        });
      } else {
        setError(response.message || 'Gagal memuat data pengguna');
      }
    } catch (err: any) {
      console.error("Fetch users error:", err);
      setError(err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    fetchUsers(value);
  };

  if (loading && users.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Daftar Pengguna
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Total: {pagination.total} User
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <TableContainer component={Paper} elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nama</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.user_id} hover>
                  <TableCell>#{user.user_id}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role.toUpperCase()} 
                      size="small"
                      color={user.role === 'admin' ? 'primary' : 'default'}
                      variant={user.role === 'admin' ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => navigate(`/users/${user.user_id}`)}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  Tidak ada data pengguna.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination.last_page > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={pagination.last_page} 
            page={pagination.current_page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      )}
    </Box>
  );
}
