import { useState, useEffect } from 'react';
import { 
  Box, Typography, Container, Grid, Card, CardContent, 
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Chip, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
  Avatar, Stack
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
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', pb: 10 }}>
      {/* Header Section */}
      <Box sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #E5E7EB', pt: { xs: 4, md: 6 }, pb: { xs: 4, md: 6 }, px: 3, mb: 5 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight={800} sx={{ color: '#111827', mb: 1, letterSpacing: '-0.03em', fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Halo, {user?.name?.split(' ')[0]} 👋
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280', fontSize: '1.1rem' }}>
            Berikut adalah ringkasan performa platform Anda hari ini.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={4}>
            <Card 
              elevation={0} 
              sx={{ 
                border: '1px solid #E5E7EB', 
                borderRadius: '24px', 
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)', borderColor: '#0ea5e9' } 
              }}
            >
              <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ bgcolor: '#e0f2fe', color: '#0ea5e9', width: 48, height: 48, mr: 2 }}>
                    <PeopleIcon />
                  </Avatar>
                  <Typography variant="overline" sx={{ color: '#6B7280', fontWeight: 700, letterSpacing: '0.05em' }}>TOTAL USERS</Typography>
                </Box>
                <Typography variant="h3" fontWeight={800} color="#111827">{stats?.total_users || 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card 
              elevation={0} 
              sx={{ 
                border: '1px solid #E5E7EB', 
                borderRadius: '24px',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)', borderColor: '#10b981' }  
              }}
            >
              <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ bgcolor: '#d1fae5', color: '#10b981', width: 48, height: 48, mr: 2 }}>
                    <StorefrontIcon />
                  </Avatar>
                  <Typography variant="overline" sx={{ color: '#6B7280', fontWeight: 700, letterSpacing: '0.05em' }}>TOTAL PRODUK</Typography>
                </Box>
                <Typography variant="h3" fontWeight={800} color="#111827">{stats?.total_products || 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card 
              elevation={0} 
              sx={{ 
                border: '1px solid #E5E7EB', 
                borderRadius: '24px',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)', borderColor: '#8b5cf6' }  
              }}
            >
              <CardContent sx={{ p: 4, '&:last-child': { pb: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ bgcolor: '#ede9fe', color: '#8b5cf6', width: 48, height: 48, mr: 2 }}>
                    <ShoppingBagIcon />
                  </Avatar>
                  <Typography variant="overline" sx={{ color: '#6B7280', fontWeight: 700, letterSpacing: '0.05em' }}>TOTAL PESANAN</Typography>
                </Box>
                <Typography variant="h3" fontWeight={800} color="#111827">{stats?.total_orders || 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Pill Tabs */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
          <Box sx={{ bgcolor: '#ffffff', p: 0.5, borderRadius: '99px', border: '1px solid #E5E7EB', display: 'inline-flex' }}>
            <Tabs 
              value={tab} 
              onChange={(e, newValue) => setTab(newValue)}
              TabIndicatorProps={{ style: { display: 'none' } }} // Hide default underline
              sx={{
                minHeight: 'auto',
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: '#6B7280',
                  minHeight: 'auto',
                  py: 1,
                  px: 3,
                  borderRadius: '99px',
                  transition: 'all 0.2s',
                  '&:hover': { color: '#111827' },
                  '&.Mui-selected': { 
                    color: '#ffffff',
                    bgcolor: '#111827',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }
                }
              }}
            >
              <Tab label="Manajemen User" disableRipple />
              <Tab label="Manajemen Produk" disableRipple />
            </Tabs>
          </Box>
        </Box>

        {/* Data Tables Container */}
        <Box sx={{ bgcolor: '#ffffff', borderRadius: '24px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
          
          {tab === 0 && (
            <TableContainer 
              sx={{ 
                maxHeight: 600,
                '&::-webkit-scrollbar': { height: 8 },
                '&::-webkit-scrollbar-thumb': { bgcolor: '#D1D5DB', borderRadius: 4 },
              }}
            >
              <Table stickyHeader sx={{ minWidth: 600 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#4B5563', bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', py: 2 }}>Nama Pengguna</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#4B5563', bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', py: 2 }}>Alamat Email</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#4B5563', bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', py: 2 }}>Role (Peran)</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: '#4B5563', bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', py: 2 }}>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.user_id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ py: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: '#F3F4F6', color: '#111827', fontSize: '0.9rem', fontWeight: 700 }}>
                            {u.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography fontWeight={600} color="#111827">{u.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: '#6B7280' }}>{u.email}</TableCell>
                      <TableCell>
                        <Chip 
                          label={u.role.toUpperCase()} 
                          size="small" 
                          sx={{ 
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: '0.05em',
                            bgcolor: u.role === 'admin' ? '#fee2e2' : (u.role === 'seller' ? '#e0e7ff' : '#dcfce3'),
                            color: u.role === 'admin' ? '#991b1b' : (u.role === 'seller' ? '#3730a3' : '#166534'),
                            borderRadius: '6px'
                          }} 
                        />
                      </TableCell>
                      <TableCell align="right">
                        {u.role !== 'admin' ? (
                          <IconButton 
                            onClick={() => handleDeleteClick('user', u.user_id)} 
                            sx={{ color: '#EF4444', bgcolor: '#FEF2F2', '&:hover': { bgcolor: '#FEE2E2' }, borderRadius: '8px' }} 
                            size="small"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        ) : (
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>RESTRICTED</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow><TableCell colSpan={4} align="center" sx={{ py: 6, color: '#9CA3AF' }}>Belum ada data user terdaftar</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {tab === 1 && (
            <TableContainer 
              sx={{ 
                maxHeight: 600,
                '&::-webkit-scrollbar': { height: 8 },
                '&::-webkit-scrollbar-thumb': { bgcolor: '#D1D5DB', borderRadius: 4 },
              }}
            >
              <Table stickyHeader sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#4B5563', bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', py: 2 }}>Nama Produk</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#4B5563', bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', py: 2 }}>Kategori</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#4B5563', bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', py: 2 }}>Seller / Penjual</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#4B5563', bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', py: 2 }}>Harga (Rp)</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: '#4B5563', bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', py: 2 }}>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.product_id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ py: 2 }}>
                        <Typography fontWeight={600} color="#111827" noWrap sx={{ maxWidth: 250 }}>{p.name}</Typography>
                      </TableCell>
                      <TableCell sx={{ color: '#6B7280' }}>
                        <Chip label={p.category?.name} size="small" sx={{ bgcolor: '#F3F4F6', color: '#4B5563', fontWeight: 600, borderRadius: '6px' }} />
                      </TableCell>
                      <TableCell sx={{ color: '#6B7280' }}>{p.seller?.name}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#111827' }}>
                        Rp {Number(p.price).toLocaleString('id-ID')}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          onClick={() => handleDeleteClick('product', p.product_id)} 
                          sx={{ color: '#EF4444', bgcolor: '#FEF2F2', '&:hover': { bgcolor: '#FEE2E2' }, borderRadius: '8px' }} 
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {products.length === 0 && (
                    <TableRow><TableCell colSpan={5} align="center" sx={{ py: 6, color: '#9CA3AF' }}>Belum ada data produk</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

        </Box>
      </Container>

      {/* Modern Delete Dialog */}
      <Dialog 
        open={deleteDialog.open} 
        onClose={() => setDeleteDialog({ open: false, type: '', id: null })}
        PaperProps={{
          elevation: 0,
          sx: { borderRadius: '20px', p: 1, minWidth: 320, border: '1px solid #E5E7EB' }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#111827', textAlign: 'center', pt: 3 }}>Konfirmasi Hapus</DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 1 }}>
          <DialogContentText sx={{ color: '#6B7280' }}>
            Apakah Anda yakin ingin menghapus <b>{deleteDialog.type === 'user' ? 'pengguna' : 'produk'}</b> ini? Data yang dihapus tidak dapat dikembalikan.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2, justifyContent: 'center', gap: 1 }}>
          <Button 
            onClick={() => setDeleteDialog({ open: false, type: '', id: null })} 
            sx={{ color: '#4B5563', fontWeight: 600, bgcolor: '#F3F4F6', px: 3, py: 1, borderRadius: '99px', '&:hover': { bgcolor: '#E5E7EB' } }}
            disableElevation
          >
            Batal
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained" 
            sx={{ bgcolor: '#EF4444', color: '#ffffff', fontWeight: 600, px: 3, py: 1, borderRadius: '99px', '&:hover': { bgcolor: '#DC2626' } }}
            disableElevation
          >
            Ya, Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
