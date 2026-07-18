import { useState, useEffect } from 'react';
import { 
  Box, Typography, Container, Grid, Card, CardContent, 
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Dialog, DialogTitle, DialogContent, 
  DialogContentText, DialogActions, Button, Snackbar, Alert, Stack
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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
        setSnackbar({ open: true, message: 'Pengguna berhasil dihapus', severity: 'success' });
      } else if (deleteDialog.type === 'product') {
        await api.delete(`/admin/products/${deleteDialog.id}`);
        const newProducts = products.filter(p => p.product_id !== deleteDialog.id);
        setProductsRes(productsRes.data ? { ...productsRes, data: newProducts } : newProducts);
        setSnackbar({ open: true, message: 'Produk berhasil dihapus', severity: 'success' });
      }
    } catch (error) {
      console.error('Error deleting', error);
      setSnackbar({ open: true, message: error.response?.data?.message || 'Gagal menghapus data', severity: 'error' });
    } finally {
      setDeleteDialog({ open: false, type: '', id: null });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography variant="body2" color="text.secondary">Loading data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#FAFAFA', minHeight: '100vh', pb: 10 }}>
      {/* Vercel-like Header Section */}
      <Box sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', pt: { xs: 4, md: 5 }, pb: { xs: 3, md: 4 }, px: 3, mb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} sx={{ color: '#000000', mb: 0.5, letterSpacing: '-0.04em' }}>
            Overview
          </Typography>
          <Typography variant="body2" sx={{ color: '#666666' }}>
            Manage users and products across your platform.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Minimalist Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={4}>
            <Card 
              elevation={0} 
              sx={{ 
                border: '1px solid #EAEAEA', 
                borderRadius: '8px', 
                bgcolor: '#ffffff',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
            >
              <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#666666', fontWeight: 500 }}>Total Users</Typography>
                  <PeopleIcon sx={{ color: '#999999', fontSize: 20 }} />
                </Box>
                <Typography variant="h4" fontWeight={700} color="#000000" sx={{ letterSpacing: '-0.02em' }}>
                  {stats?.total_users || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card 
              elevation={0} 
              sx={{ 
                border: '1px solid #EAEAEA', 
                borderRadius: '8px', 
                bgcolor: '#ffffff',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
            >
              <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#666666', fontWeight: 500 }}>Total Products</Typography>
                  <StorefrontIcon sx={{ color: '#999999', fontSize: 20 }} />
                </Box>
                <Typography variant="h4" fontWeight={700} color="#000000" sx={{ letterSpacing: '-0.02em' }}>
                  {stats?.total_products || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card 
              elevation={0} 
              sx={{ 
                border: '1px solid #EAEAEA', 
                borderRadius: '8px', 
                bgcolor: '#ffffff',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
            >
              <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#666666', fontWeight: 500 }}>Total Orders</Typography>
                  <ShoppingBagIcon sx={{ color: '#999999', fontSize: 20 }} />
                </Box>
                <Typography variant="h4" fontWeight={700} color="#000000" sx={{ letterSpacing: '-0.02em' }}>
                  {stats?.total_orders || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Minimalist Underline Tabs */}
        <Box sx={{ borderBottom: '1px solid #EAEAEA', mb: 4 }}>
          <Tabs 
            value={tab} 
            onChange={(e, newValue) => setTab(newValue)}
            sx={{
              minHeight: 'auto',
              '& .MuiTabs-indicator': {
                backgroundColor: '#000000',
                height: 2,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.9rem',
                color: '#666666',
                minHeight: 'auto',
                py: 1.5,
                px: 2,
                '&:hover': { color: '#000000' },
                '&.Mui-selected': { color: '#000000' }
              }
            }}
          >
            <Tab label="Users" disableRipple />
            <Tab label="Products" disableRipple />
          </Tabs>
        </Box>

        {/* High Density Table */}
        <Box sx={{ bgcolor: '#ffffff', borderRadius: '8px', border: '1px solid #EAEAEA', overflow: 'hidden' }}>
          
          {tab === 0 && (
            <TableContainer 
              sx={{ 
                maxHeight: 600,
                '&::-webkit-scrollbar': { height: 6 },
                '&::-webkit-scrollbar-thumb': { bgcolor: '#EAEAEA', borderRadius: 4 },
              }}
            >
              <Table stickyHeader sx={{ minWidth: 600, borderCollapse: 'collapse' }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 500, color: '#666666', bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', py: 1.5, fontSize: '0.85rem' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 500, color: '#666666', bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', py: 1.5, fontSize: '0.85rem' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 500, color: '#666666', bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', py: 1.5, fontSize: '0.85rem' }}>Role</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 500, color: '#666666', bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', py: 1.5, fontSize: '0.85rem' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.user_id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#FAFAFA' } }}>
                      <TableCell sx={{ py: 1.5, borderBottom: '1px solid #EAEAEA' }}>
                        <Typography fontWeight={500} color="#111827" fontSize="0.875rem">{u.name}</Typography>
                      </TableCell>
                      <TableCell sx={{ color: '#666666', py: 1.5, borderBottom: '1px solid #EAEAEA', fontSize: '0.875rem' }}>
                        {u.email}
                      </TableCell>
                      <TableCell sx={{ py: 1.5, borderBottom: '1px solid #EAEAEA' }}>
                        <Box 
                          sx={{ 
                            display: 'inline-block',
                            px: 1.2, py: 0.3, 
                            borderRadius: '99px',
                            border: '1px solid #EAEAEA',
                            bgcolor: '#FAFAFA',
                            color: '#111827',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            textTransform: 'capitalize'
                          }}
                        >
                          {u.role}
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 1.5, borderBottom: '1px solid #EAEAEA' }}>
                        {u.role !== 'admin' ? (
                          <Button 
                            onClick={() => handleDeleteClick('user', u.user_id)} 
                            size="small"
                            sx={{ color: '#EF4444', textTransform: 'none', minWidth: 'auto', p: 0.5, '&:hover': { bgcolor: 'transparent', color: '#B91C1C' } }}
                          >
                            Remove
                          </Button>
                        ) : (
                          <Typography variant="caption" color="#999999" fontWeight={500}>Protected</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                        <Typography variant="body2" color="#999999">No users found.</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {tab === 1 && (
            <TableContainer 
              sx={{ 
                maxHeight: 600,
                '&::-webkit-scrollbar': { height: 6 },
                '&::-webkit-scrollbar-thumb': { bgcolor: '#EAEAEA', borderRadius: 4 },
              }}
            >
              <Table stickyHeader sx={{ minWidth: 800, borderCollapse: 'collapse' }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 500, color: '#666666', bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', py: 1.5, fontSize: '0.85rem' }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: 500, color: '#666666', bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', py: 1.5, fontSize: '0.85rem' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 500, color: '#666666', bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', py: 1.5, fontSize: '0.85rem' }}>Seller</TableCell>
                    <TableCell sx={{ fontWeight: 500, color: '#666666', bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', py: 1.5, fontSize: '0.85rem' }}>Price</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 500, color: '#666666', bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', py: 1.5, fontSize: '0.85rem' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.product_id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#FAFAFA' } }}>
                      <TableCell sx={{ py: 1.5, borderBottom: '1px solid #EAEAEA' }}>
                        <Typography fontWeight={500} color="#111827" noWrap sx={{ maxWidth: 250, fontSize: '0.875rem' }}>{p.name}</Typography>
                      </TableCell>
                      <TableCell sx={{ color: '#666666', py: 1.5, borderBottom: '1px solid #EAEAEA', fontSize: '0.875rem' }}>
                        {p.category?.name}
                      </TableCell>
                      <TableCell sx={{ color: '#666666', py: 1.5, borderBottom: '1px solid #EAEAEA', fontSize: '0.875rem' }}>
                        {p.seller?.name}
                      </TableCell>
                      <TableCell sx={{ color: '#111827', fontWeight: 500, py: 1.5, borderBottom: '1px solid #EAEAEA', fontSize: '0.875rem' }}>
                        Rp {Number(p.price).toLocaleString('id-ID')}
                      </TableCell>
                      <TableCell align="right" sx={{ py: 1.5, borderBottom: '1px solid #EAEAEA' }}>
                        <Button 
                          onClick={() => handleDeleteClick('product', p.product_id)} 
                          size="small"
                          sx={{ color: '#EF4444', textTransform: 'none', minWidth: 'auto', p: 0.5, '&:hover': { bgcolor: 'transparent', color: '#B91C1C' } }}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {products.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                        <Typography variant="body2" color="#999999">No products found.</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

        </Box>
      </Container>

      {/* Minimalist Dialog */}
      <Dialog 
        open={deleteDialog.open} 
        onClose={() => setDeleteDialog({ open: false, type: '', id: null })}
        PaperProps={{
          elevation: 0,
          sx: { borderRadius: '12px', p: 2, minWidth: 320, border: '1px solid #EAEAEA', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1rem', color: '#000000', p: 0, mb: 1 }}>Delete {deleteDialog.type}</DialogTitle>
        <DialogContent sx={{ p: 0, mb: 3 }}>
          <DialogContentText sx={{ color: '#666666', fontSize: '0.875rem' }}>
            Are you sure you want to delete this {deleteDialog.type}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 0, justifyContent: 'flex-end', gap: 1 }}>
          <Button 
            onClick={() => setDeleteDialog({ open: false, type: '', id: null })} 
            sx={{ color: '#000000', fontWeight: 500, textTransform: 'none', border: '1px solid #EAEAEA', px: 2, py: 0.5, borderRadius: '6px', '&:hover': { bgcolor: '#FAFAFA' } }}
            disableElevation
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained" 
            sx={{ bgcolor: '#000000', color: '#ffffff', fontWeight: 500, textTransform: 'none', px: 2, py: 0.5, borderRadius: '6px', '&:hover': { bgcolor: '#333333' } }}
            disableElevation
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%', borderRadius: '8px', fontWeight: 500, border: '1px solid #EAEAEA', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', bgcolor: '#ffffff', color: snackbar.severity === 'success' ? '#10B981' : '#EF4444' }} icon={false}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
