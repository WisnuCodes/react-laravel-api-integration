import { useState, useEffect } from 'react';
import { 
  Box, Typography, Container, Grid, Card, CardContent, 
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Dialog, DialogTitle, DialogContent, 
  DialogContentText, DialogActions, Button, Snackbar, Alert, Stack,
  Divider, TextField, MenuItem
} from '@mui/material';
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
  const [categoryDialog, setCategoryDialog] = useState({ open: false, id: null, name: '' });
  const [userDialog, setUserDialog] = useState({ open: false, user_id: null, name: '', email: '', role: 'buyer', balance: 0 });
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
  const { data: categoriesRes, loading: loadingCategories, setData: setCategoriesRes } = useFetch(
    isLoggedIn && user?.role === 'admin' ? '/categories' : null, 
    [], 3000
  );

  const stats = statsRes?.data || statsRes;
  const users = usersRes?.data || usersRes || [];
  const products = productsRes?.data || productsRes || [];
  const categories = categoriesRes?.data || categoriesRes || [];
  const loading = loadingStats || loadingUsers || loadingProducts || loadingCategories;

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
      } else if (deleteDialog.type === 'category') {
        await api.delete(`/categories/${deleteDialog.id}`);
        const newCategories = categories.filter(c => (c.category_id || c.id) !== deleteDialog.id);
        setCategoriesRes(categoriesRes.data ? { ...categoriesRes, data: newCategories } : newCategories);
        setSnackbar({ open: true, message: 'Kategori berhasil dihapus', severity: 'success' });
      }
    } catch (error) {
      console.error('Error deleting', error);
      setSnackbar({ open: true, message: error.response?.data?.message || 'Gagal menghapus data', severity: 'error' });
    } finally {
      setDeleteDialog({ open: false, type: '', id: null });
    }
  };

  const handleSaveCategory = async () => {
    try {
      if (categoryDialog.id) {
        await api.put(`/categories/${categoryDialog.id}`, { name: categoryDialog.name });
        setSnackbar({ open: true, message: 'Kategori berhasil diupdate', severity: 'success' });
      } else {
        await api.post(`/categories`, { name: categoryDialog.name });
        setSnackbar({ open: true, message: 'Kategori berhasil ditambahkan', severity: 'success' });
      }
      const newCats = await api.get('/categories');
      setCategoriesRes(newCats.data || newCats);
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || 'Gagal menyimpan kategori', severity: 'error' });
    } finally {
      setCategoryDialog({ open: false, id: null, name: '' });
    }
  };

  const handleSaveUser = async () => {
    try {
      if (userDialog.user_id) {
        await api.put(`/admin/users/${userDialog.user_id}`, {
          name: userDialog.name,
          email: userDialog.email,
          role: userDialog.role,
          balance: Number(userDialog.balance)
        });
        setSnackbar({ open: true, message: 'User berhasil diupdate', severity: 'success' });
        const newUsers = await api.get('/admin/users');
        setUsersRes(newUsers.data || newUsers);
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || 'Gagal menyimpan user', severity: 'error' });
    } finally {
      setUserDialog({ open: false, user_id: null, name: '', email: '', role: 'buyer', balance: 0 });
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
      <Box sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', pt: { xs: 4, md: 5 }, pb: { xs: 3, md: 4 }, px: { xs: 2, md: 3 }, mb: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 1, sm: 2 } }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: '#000000', mb: 0.5, letterSpacing: '-0.04em', fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Overview
          </Typography>
          <Typography variant="body2" sx={{ color: '#666666' }}>
            Manage users and products across your platform.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Minimalist Stats Cards */}
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 4, md: 6 } }}>
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
        <Box sx={{ borderBottom: '1px solid #EAEAEA', mb: { xs: 3, md: 4 } }}>
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
                px: { xs: 1.5, md: 2 },
                '&:hover': { color: '#000000' },
                '&.Mui-selected': { color: '#000000' }
              }
            }}
          >
            <Tab label="Users" disableRipple />
            <Tab label="Products" disableRipple />
            <Tab label="Categories" disableRipple />
          </Tabs>
        </Box>

        {/* Dynamic Data Views (Table for Desktop, Cards for Mobile) */}
        <Box sx={{ bgcolor: { xs: 'transparent', md: '#ffffff' }, borderRadius: '8px', border: { xs: 'none', md: '1px solid #EAEAEA' }, overflow: 'hidden' }}>
          
          {/* TAB 0: USERS */}
          {tab === 0 && (
            <>
              {/* Desktop Table (Hidden on Mobile) */}
              <TableContainer 
                sx={{ 
                  display: { xs: 'none', md: 'block' },
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
                          <Button 
                            onClick={() => setUserDialog({ open: true, user_id: u.user_id, name: u.name, email: u.email, role: u.role, balance: u.balance || 0 })}
                            size="small"
                            sx={{ color: '#3B82F6', textTransform: 'none', minWidth: 'auto', p: 0.5, mr: 1, '&:hover': { bgcolor: 'transparent', color: '#2563EB' } }}
                          >
                            Edit
                          </Button>
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

              {/* Mobile Card List (Hidden on Desktop) */}
              <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1.5 }}>
                {users.map((u) => (
                  <Box key={u.user_id} sx={{ p: 2, bgcolor: '#ffffff', border: '1px solid #EAEAEA', borderRadius: '8px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography fontWeight={600} color="#111827" fontSize="0.9rem">{u.name}</Typography>
                      <Box sx={{ px: 1, py: 0.2, borderRadius: '99px', border: '1px solid #EAEAEA', bgcolor: '#FAFAFA', color: '#111827', fontSize: '0.7rem', fontWeight: 600, textTransform: 'capitalize' }}>
                        {u.role}
                      </Box>
                    </Box>
                    <Typography fontSize="0.8rem" color="#666666" sx={{ mb: 2 }}>{u.email}</Typography>
                    
                    <Divider sx={{ mb: 1.5, borderColor: '#F5F5F5' }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Button 
                        onClick={() => setUserDialog({ open: true, user_id: u.user_id, name: u.name, email: u.email, role: u.role, balance: u.balance || 0 })}
                        size="small"
                        sx={{ color: '#3B82F6', textTransform: 'none', minWidth: 'auto', p: 0.5, fontSize: '0.8rem' }}
                      >
                        Edit
                      </Button>
                      {u.role !== 'admin' ? (
                        <Button 
                          onClick={() => handleDeleteClick('user', u.user_id)} 
                          size="small"
                          sx={{ color: '#EF4444', textTransform: 'none', minWidth: 'auto', p: 0.5, fontSize: '0.8rem' }}
                        >
                          Remove
                        </Button>
                      ) : (
                        <Typography variant="caption" color="#999999" fontWeight={500} sx={{ py: 0.5 }}>Protected</Typography>
                      )}
                    </Box>
                  </Box>
                ))}
                {users.length === 0 && (
                  <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#ffffff', borderRadius: '8px', border: '1px solid #EAEAEA' }}>
                    <Typography variant="body2" color="#999999">No users found.</Typography>
                  </Box>
                )}
              </Box>
            </>
          )}

          {/* TAB 1: PRODUCTS */}
          {tab === 1 && (
            <>
              {/* Desktop Table (Hidden on Mobile) */}
              <TableContainer 
                sx={{ 
                  display: { xs: 'none', md: 'block' },
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

              {/* Mobile Card List (Hidden on Desktop) */}
              <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1.5 }}>
                {products.map((p) => (
                  <Box key={p.product_id} sx={{ p: 2, bgcolor: '#ffffff', border: '1px solid #EAEAEA', borderRadius: '8px' }}>
                    <Typography fontWeight={600} color="#111827" fontSize="0.9rem" sx={{ mb: 0.5 }}>{p.name}</Typography>
                    
                    <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
                      <Typography fontSize="0.75rem" color="#999999">Category:</Typography>
                      <Typography fontSize="0.75rem" color="#666666" fontWeight={500}>{p.category?.name}</Typography>
                    </Stack>
                    
                    <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                      <Typography fontSize="0.75rem" color="#999999">Seller:</Typography>
                      <Typography fontSize="0.75rem" color="#666666" fontWeight={500}>{p.seller?.name}</Typography>
                    </Stack>
                    
                    <Divider sx={{ mb: 1.5, borderColor: '#F5F5F5' }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography fontWeight={600} fontSize="0.9rem" color="#111827">Rp {Number(p.price).toLocaleString('id-ID')}</Typography>
                      <Button 
                        onClick={() => handleDeleteClick('product', p.product_id)} 
                        size="small"
                        sx={{ color: '#EF4444', textTransform: 'none', minWidth: 'auto', p: 0.5, fontSize: '0.8rem' }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                ))}
                {products.length === 0 && (
                  <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#ffffff', borderRadius: '8px', border: '1px solid #EAEAEA' }}>
                    <Typography variant="body2" color="#999999">No products found.</Typography>
                  </Box>
                )}
              </Box>
            </>
          )}

          {/* TAB 2: CATEGORIES */}
          {tab === 2 && (
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>Categories</Typography>
                <Button 
                  variant="contained" 
                  onClick={() => setCategoryDialog({ open: true, id: null, name: '' })}
                  sx={{ bgcolor: '#000000', color: '#ffffff', textTransform: 'none', px: 3, borderRadius: '6px', '&:hover': { bgcolor: '#333333' } }}
                  disableElevation
                >
                  Add Category
                </Button>
              </Box>

              <TableContainer sx={{ border: '1px solid #EAEAEA', borderRadius: '8px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 500, color: '#666666', bgcolor: '#FAFAFA' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 500, color: '#666666', bgcolor: '#FAFAFA' }}>Category Name</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 500, color: '#666666', bgcolor: '#FAFAFA' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories.map((c) => (
                      <TableRow key={c.category_id || c.id}>
                        <TableCell>{c.category_id || c.id}</TableCell>
                        <TableCell fontWeight={500}>{c.name}</TableCell>
                        <TableCell align="right">
                          <Button 
                            onClick={() => setCategoryDialog({ open: true, id: c.category_id || c.id, name: c.name })}
                            size="small"
                            sx={{ color: '#3B82F6', textTransform: 'none', mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button 
                            onClick={() => handleDeleteClick('category', c.category_id || c.id)} 
                            size="small"
                            sx={{ color: '#EF4444', textTransform: 'none' }}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {categories.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                          <Typography color="text.secondary">No categories found.</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
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

      {/* Category Dialog */}
      <Dialog 
        open={categoryDialog.open} 
        onClose={() => setCategoryDialog({ open: false, id: null, name: '' })}
        maxWidth="sm"
        fullWidth
        PaperProps={{ 
          elevation: 0, 
          sx: { 
            borderRadius: '20px', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #EAEAEA',
            p: 1
          } 
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 800, 
          fontSize: '1.5rem', 
          color: '#111827',
          p: 3, pb: 1
        }}>
          {categoryDialog.id ? 'Edit Kategori' : 'Tambah Kategori Baru'}
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 2 }}>
          <Typography variant="body2" sx={{ mb: 3, color: '#666666' }}>
            {categoryDialog.id 
              ? 'Silakan perbarui nama kategori di bawah ini.' 
              : 'Tambahkan kategori baru untuk mempermudah organisasi produk.'}
          </Typography>
          <TextField
            fullWidth
            label="Nama Kategori"
            variant="outlined"
            placeholder="Contoh: Plugin WordPress"
            value={categoryDialog.name}
            onChange={(e) => setCategoryDialog({ ...categoryDialog, name: e.target.value })}
            InputProps={{ sx: { borderRadius: '12px' } }}
            InputLabelProps={{ shrink: true }}
            autoFocus
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 0, gap: 1 }}>
          <Button 
            onClick={() => setCategoryDialog({ open: false, id: null, name: '' })}
            sx={{ 
              color: '#666666', 
              textTransform: 'none', 
              fontWeight: 600,
              px: 3, py: 1,
              borderRadius: '99px',
              '&:hover': { bgcolor: '#F5F5F5' }
            }}
          >
            Batal
          </Button>
          <Button 
            onClick={handleSaveCategory}
            variant="contained"
            disabled={!categoryDialog.name}
            disableElevation
            sx={{ 
              bgcolor: '#111827', 
              color: '#ffffff', 
              textTransform: 'none', 
              fontWeight: 600,
              px: 4, py: 1,
              borderRadius: '99px',
              '&:hover': { bgcolor: '#000000' }, 
              '&.Mui-disabled': { bgcolor: '#F3F4F6', color: '#9CA3AF' }
            }}
          >
            Simpan Kategori
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Dialog */}
      <Dialog 
        open={userDialog.open} 
        onClose={() => setUserDialog({ open: false, user_id: null, name: '', email: '', role: 'buyer', balance: 0 })}
        maxWidth="sm"
        fullWidth
        PaperProps={{ 
          elevation: 0, 
          sx: { 
            borderRadius: '20px', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #EAEAEA',
            p: 1
          } 
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem', color: '#111827', p: 3, pb: 1 }}>
          Edit User
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={userDialog.name}
            onChange={(e) => setUserDialog({ ...userDialog, name: e.target.value })}
            InputProps={{ sx: { borderRadius: '12px' } }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={userDialog.email}
            onChange={(e) => setUserDialog({ ...userDialog, email: e.target.value })}
            InputProps={{ sx: { borderRadius: '12px' } }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            fullWidth
            label="Role"
            value={userDialog.role}
            onChange={(e) => setUserDialog({ ...userDialog, role: e.target.value })}
            InputProps={{ sx: { borderRadius: '12px' } }}
          >
            <MenuItem value="buyer">Buyer</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Balance (Saldo)"
            variant="outlined"
            type="number"
            value={userDialog.balance}
            onChange={(e) => setUserDialog({ ...userDialog, balance: e.target.value })}
            InputProps={{ sx: { borderRadius: '12px' } }}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 0, gap: 1 }}>
          <Button 
            onClick={() => setUserDialog({ open: false, user_id: null, name: '', email: '', role: 'buyer', balance: 0 })}
            sx={{ color: '#666666', textTransform: 'none', fontWeight: 600, px: 3, py: 1, borderRadius: '99px', '&:hover': { bgcolor: '#F5F5F5' } }}
          >
            Batal
          </Button>
          <Button 
            onClick={handleSaveUser}
            variant="contained"
            disableElevation
            sx={{ bgcolor: '#111827', color: '#ffffff', textTransform: 'none', fontWeight: 600, px: 4, py: 1, borderRadius: '99px', '&:hover': { bgcolor: '#000000' } }}
          >
            Simpan Perubahan
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
