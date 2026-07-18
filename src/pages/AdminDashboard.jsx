import { useState, useEffect } from 'react';
import { 
  Box, Typography, Container, Grid, Card, CardContent, 
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Chip, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

export default function AdminDashboard() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, type: '', id: null });

  const { data: statsRes, loading: loadingStats } = useFetch(
    isLoggedIn && user?.role === 'admin' ? '/admin/stats' : null, 
    null, 3000
  );
  const { data: usersRes, loading: loadingUsers, setData: setUsersRes } = useFetch(
    isLoggedIn && user?.role === 'admin' ? '/admin/users' : null, 
    [], 3000
  );
  const { data: productsRes, loading: loadingProducts, setData: setProductsRes } = useFetch(
    isLoggedIn && user?.role === 'admin' ? '/admin/products' : null, 
    [], 3000
  );

  const stats = statsRes?.data || statsRes;
  const users = usersRes?.data || usersRes || [];
  const products = productsRes?.data || productsRes || [];
  const loading = loadingStats || loadingUsers || loadingProducts;

  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'admin') {
      navigate('/');
    }
  }, [isLoggedIn, user, navigate]);

  const handleDeleteClick = (type, id) => {
    setDeleteDialog({ open: true, type, id });
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteDialog.type === 'user') {
        await api.delete(`/admin/users/${deleteDialog.id}`);
        const newUsers = users.filter(u => u.user_id !== deleteDialog.id);
        setUsersRes(usersRes.data ? { ...usersRes, data: newUsers } : newUsers);
      } else if (deleteDialog.type === 'product') {
        await api.delete(`/admin/products/${deleteDialog.id}`);
        const newProducts = products.filter(p => p.product_id !== deleteDialog.id);
        setProductsRes(productsRes.data ? { ...productsRes, data: newProducts } : newProducts);
      }
    } catch (error) {
      console.error('Error deleting', error);
      alert(error.response?.data?.message || 'Gagal menghapus data');
    } finally {
      setDeleteDialog({ open: false, type: '', id: null });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#111827' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: '#111827', mb: 4, letterSpacing: '-0.02em' }}>
        Dashboard Admin
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '16px' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ bgcolor: '#f3f4f6', p: 1.5, borderRadius: '12px', mr: 2 }}>
                <PeopleIcon sx={{ color: '#111827' }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600, letterSpacing: '0.05em' }}>TOTAL USERS</Typography>
                <Typography variant="h5" fontWeight={700}>{stats?.total_users || 0}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '16px' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ bgcolor: '#f3f4f6', p: 1.5, borderRadius: '12px', mr: 2 }}>
                <StorefrontIcon sx={{ color: '#111827' }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600, letterSpacing: '0.05em' }}>TOTAL PRODUK</Typography>
                <Typography variant="h5" fontWeight={700}>{stats?.total_products || 0}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '16px' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ bgcolor: '#f3f4f6', p: 1.5, borderRadius: '12px', mr: 2 }}>
                <ShoppingBagIcon sx={{ color: '#111827' }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600, letterSpacing: '0.05em' }}>TOTAL PESANAN</Typography>
                <Typography variant="h5" fontWeight={700}>{stats?.total_orders || 0}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tab} 
          onChange={(e, newValue) => setTab(newValue)}
          TabIndicatorProps={{ style: { backgroundColor: '#111827' } }}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              color: '#6b7280',
              '&.Mui-selected': { color: '#111827' }
            }
          }}
        >
          <Tab label="Manajemen User" />
          <Tab label="Manajemen Produk" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      {tab === 0 && (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '16px' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f9fafb' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Nama</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Role</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#4b5563' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.user_id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={u.role} 
                      size="small" 
                      sx={{ 
                        fontWeight: 600,
                        bgcolor: u.role === 'admin' ? '#fee2e2' : (u.role === 'seller' ? '#e0e7ff' : '#dcfce3'),
                        color: u.role === 'admin' ? '#991b1b' : (u.role === 'seller' ? '#3730a3' : '#166534')
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    {u.role !== 'admin' && (
                      <IconButton onClick={() => handleDeleteClick('user', u.user_id)} color="error" size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow><TableCell colSpan={4} align="center" sx={{ py: 3, color: '#6b7280' }}>Belum ada data user</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tab === 1 && (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '16px' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f9fafb' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Produk</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Kategori</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Seller</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Harga</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#4b5563' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.product_id}>
                  <TableCell sx={{ fontWeight: 500 }}>{p.name}</TableCell>
                  <TableCell>{p.category?.name}</TableCell>
                  <TableCell>{p.seller?.name}</TableCell>
                  <TableCell>Rp {Number(p.price).toLocaleString('id-ID')}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDeleteClick('product', p.product_id)} color="error" size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow><TableCell colSpan={5} align="center" sx={{ py: 3, color: '#6b7280' }}>Belum ada data produk</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, type: '', id: null })}>
        <DialogTitle sx={{ fontWeight: 700 }}>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus {deleteDialog.type === 'user' ? 'pengguna' : 'produk'} ini? Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setDeleteDialog({ open: false, type: '', id: null })} sx={{ color: '#6b7280', fontWeight: 600 }}>
            Batal
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error" sx={{ fontWeight: 600, borderRadius: '8px', boxShadow: 'none' }}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
