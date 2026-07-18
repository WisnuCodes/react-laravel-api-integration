import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Typography, Box, CircularProgress, Alert,
  Paper, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, TextField, MenuItem
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api/client';

export default function SellerDashboard() {
  const { user } = useAuth();
  const { data: allProducts, loading, error, setData: setProducts } = useFetch('/products', [], 3000);
  const { data: categories } = useFetch('/categories', [], 60000);

  // Filter products owned by current seller
  const myProducts = Array.isArray(allProducts)
    ? allProducts.filter(p => p.seller?.id === user?.user_id)
    : [];

  const totalRevenue = myProducts.reduce((sum, p) => sum + (Number(p.price) * (p.download_count || 0)), 0);

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    title: '', description: '', price: '', rating: '0',
    category_id: '', file_path: '', thumbnail: '', status: 'active'
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const resetForm = () => {
    setForm({ title: '', description: '', price: '', rating: '0', category_id: '', file_path: '', thumbnail: '', status: 'active' });
    setEditingProduct(null);
    setSubmitError('');
    setSubmitSuccess('');
  };

  const openAddDialog = () => {
    resetForm();
    setOpenDialog(true);
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title || '',
      description: product.description || '',
      price: String(product.price || ''),
      rating: String(product.rating || '0'),
      category_id: product.category?.id || '',
      file_path: product.file_path || '',
      thumbnail: product.thumbnail || '',
      status: product.status || 'active',
    });
    setSubmitError('');
    setSubmitSuccess('');
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    setSubmitError('');
    setSubmitSuccess('');

    const body = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      rating: Number(form.rating),
      category_id: Number(form.category_id),
      file_path: form.file_path,
      thumbnail: form.thumbnail || null,
      status: form.status,
    };

    try {
      if (editingProduct) {
        await apiRequest(`/products/${editingProduct.id}`, {
          method: 'PUT',
          body: JSON.stringify(body),
        });
        setSubmitSuccess('Produk berhasil diupdate!');
      } else {
        await apiRequest('/products', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        setSubmitSuccess('Produk berhasil ditambahkan!');
      }

      // Refresh products
      const res = await apiRequest('/products');
      setProducts(res.data || res);

      setTimeout(() => {
        setOpenDialog(false);
        resetForm();
      }, 1200);
    } catch (err) {
      setSubmitError(err.message || 'Gagal menyimpan produk.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Yakin ingin menghapus produk ini?')) return;
    try {
      await apiRequest(`/products/${productId}`, { method: 'DELETE' });
      const res = await apiRequest('/products');
      setProducts(res.data || res);
    } catch (err) {
      alert(err.message || 'Gagal menghapus produk.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress sx={{ color: '#000000' }} />
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

      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <DashboardIcon sx={{ fontSize: 40, color: '#000000' }} />
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              sx={{
                color: '#000000',
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                letterSpacing: '-0.025em',
              }}
            >
              Dashboard Seller
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: '#6b7280', fontSize: { xs: '0.95rem', md: '1.15rem' } }}>
            Kelola semua produk yang Anda jual
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddDialog}
          sx={{
            bgcolor: '#000000',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            '&:hover': { bgcolor: '#333333' },
          }}
        >
          Tambah Produk
        </Button>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 4 }}>
        <StatCard label="Total Produk" value={myProducts.length} />
        <StatCard label="Produk Aktif" value={myProducts.filter(p => p.status === 'active').length} />
        <StatCard label="Estimasi Pendapatan" value={`Rp ${totalRevenue.toLocaleString('id-ID')}`} />
      </Box>

      {/* Products Table */}
      {myProducts.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            py: 8,
            textAlign: 'center',
          }}
        >
          <DashboardIcon sx={{ fontSize: 48, color: '#d1d5db', mb: 2 }} />
          <Typography sx={{ color: '#6b7280', mb: 2 }}>Belum ada produk.</Typography>
          <Button
            variant="outlined"
            onClick={openAddDialog}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              borderColor: '#e5e7eb',
              color: '#000000',
            }}
          >
            Tambah Produk Pertama
          </Button>
        </Paper>
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
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Produk
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Kategori
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} align="right">
                  Harga
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} align="center">
                  Rating
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} align="center">
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myProducts.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{
                    transition: 'background-color 0.2s',
                    '&:hover': { bgcolor: 'action.hover' },
                    '&:last-child td': { borderBottom: 0 },
                  }}
                >
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {product.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {product.category?.name || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      Rp {Number(product.price).toLocaleString('id-ID')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      ⭐ {Number(product.rating).toFixed(1)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={product.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      color={product.status === 'active' ? 'success' : 'default'}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: 600, borderRadius: 2 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      <Tooltip title="Lihat" arrow>
                        <IconButton
                          component={Link}
                          to={`/products/${product.id}`}
                          size="small"
                          sx={{ bgcolor: '#f3f4f6', '&:hover': { bgcolor: '#e5e7eb' } }}
                        >
                          <VisibilityIcon fontSize="small" sx={{ color: '#000000' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          size="small"
                          onClick={() => openEditDialog(product)}
                          sx={{ bgcolor: '#f3f4f6', '&:hover': { bgcolor: '#e5e7eb' } }}
                        >
                          <EditIcon fontSize="small" sx={{ color: '#000000' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Hapus" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(product.id)}
                          sx={{ bgcolor: '#fef2f2', '&:hover': { bgcolor: '#fee2e2' } }}
                        >
                          <DeleteIcon fontSize="small" sx={{ color: '#ef4444' }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => { setOpenDialog(false); resetForm(); }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ 
          sx: { 
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          } 
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 800, 
          pb: 2, pt: 3, px: 4,
          fontSize: '1.5rem',
          color: '#111827',
          borderBottom: '1px solid #f3f4f6'
        }}>
          {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{submitError}</Alert>}
          {submitSuccess && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>{submitSuccess}</Alert>}

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            <TextField
              fullWidth
              label="Judul Produk"
              variant="outlined"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              InputProps={{ sx: { borderRadius: '12px' } }}
            />
            <TextField
              fullWidth
              label="Deskripsi Lengkap"
              multiline
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              InputProps={{ sx: { borderRadius: '12px' } }}
            />
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
              <TextField
                label="Harga (Rp)"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                InputProps={{ sx: { borderRadius: '12px' } }}
              />
              <TextField
                select
                label="Kategori"
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                InputProps={{ sx: { borderRadius: '12px' } }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id || cat.category_id} value={cat.id || cat.category_id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <TextField
              fullWidth
              label="Tautan Berkas (File Path)"
              placeholder="https://gdrive.com/..."
              value={form.file_path}
              onChange={(e) => setForm({ ...form, file_path: e.target.value })}
              InputProps={{ sx: { borderRadius: '12px' } }}
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
              <TextField
                label="URL Thumbnail (Opsional)"
                placeholder="https://image..."
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                InputProps={{ sx: { borderRadius: '12px' } }}
              />
              <TextField
                select
                label="Status Produk"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                InputProps={{ sx: { borderRadius: '12px' } }}
              >
                <MenuItem value="active">Aktif & Ditampilkan</MenuItem>
                <MenuItem value="inactive">Sembunyikan</MenuItem>
              </TextField>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 4, pt: 1, gap: 1 }}>
          <Button
            onClick={() => { setOpenDialog(false); resetForm(); }}
            sx={{ 
              textTransform: 'none', 
              color: '#4b5563',
              fontWeight: 600,
              px: 3, py: 1,
              borderRadius: '10px'
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitLoading || !form.title || !form.description || !form.price || !form.category_id || !form.file_path}
            sx={{
              bgcolor: '#000000',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 600,
              px: 4, py: 1.2,
              borderRadius: '10px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              '&:hover': { bgcolor: '#111827', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
              '&.Mui-disabled': { bgcolor: '#e5e7eb', color: '#9ca3af' }
            }}
          >
            {submitLoading ? 'Menyimpan...' : editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function StatCard({ label, value }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        p: 3,
      }}
    >
      <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
        {label}
      </Typography>
      <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5, color: '#111827' }}>
        {value}
      </Typography>
    </Paper>
  );
}
