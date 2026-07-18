import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Typography, Box, CircularProgress, Alert,
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, TextField, MenuItem,
  Grid, Card, CardContent
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
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#FAFAFA' }}>
        <CircularProgress sx={{ color: '#000000' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', py: 6, px: 2, bgcolor: '#FAFAFA' }}>
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ borderRadius: '8px' }}>{error}</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#FAFAFA', minHeight: '100vh', pb: 10 }}>
      {/* Vercel-like Header Section */}
      <Box sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #EAEAEA', pt: { xs: 4, md: 5 }, pb: { xs: 3, md: 4 }, px: { xs: 2, md: 3 }, mb: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 1, sm: 2 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ color: '#000000', mb: 0.5, letterSpacing: '-0.04em', fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
              Dashboard Seller
            </Typography>
            <Typography variant="body2" sx={{ color: '#666666' }}>
              Kelola semua produk yang Anda jual di platform ini.
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
              borderRadius: '8px',
              px: 3, py: 1,
              '&:hover': { bgcolor: '#333333' },
            }}
            disableElevation
          >
            Tambah Produk
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Stats */}
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 4, md: 6 } }}>
          <Grid item xs={12} sm={4}>
            <StatCard label="Total Produk" value={myProducts.length} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard label="Produk Aktif" value={myProducts.filter(p => p.status === 'active').length} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard label="Estimasi Pendapatan" value={`Rp ${totalRevenue.toLocaleString('id-ID')}`} />
          </Grid>
        </Grid>

      {/* Products Table */}
      {myProducts.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            borderRadius: '12px',
            border: '1px solid #EAEAEA',
            bgcolor: '#ffffff',
            py: 8,
            textAlign: 'center',
          }}
        >
          <DashboardIcon sx={{ fontSize: 48, color: '#EAEAEA', mb: 2 }} />
          <Typography sx={{ color: '#666666', mb: 3 }}>Anda belum memiliki produk.</Typography>
          <Button
            variant="outlined"
            onClick={openAddDialog}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              borderColor: '#EAEAEA',
              color: '#000000',
              '&:hover': { bgcolor: '#FAFAFA', borderColor: '#cccccc' }
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
            borderRadius: '12px',
            border: '1px solid #EAEAEA',
            bgcolor: '#ffffff'
          }}
        >
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#FAFAFA' }}>
                <TableCell sx={{ fontWeight: 500, color: '#666666', borderBottom: '1px solid #EAEAEA' }}>
                  Produk
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#666666', borderBottom: '1px solid #EAEAEA' }}>
                  Kategori
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#666666', borderBottom: '1px solid #EAEAEA' }} align="right">
                  Harga
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#666666', borderBottom: '1px solid #EAEAEA' }} align="center">
                  Rating
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#666666', borderBottom: '1px solid #EAEAEA' }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#666666', borderBottom: '1px solid #EAEAEA' }} align="center">
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
                    '&:hover': { bgcolor: '#FAFAFA' },
                    '&:last-child td': { borderBottom: 0 },
                  }}
                >
                  <TableCell sx={{ borderBottom: '1px solid #EAEAEA' }}>
                    <Typography variant="body2" fontWeight={600} color="#111827">
                      {product.title}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #EAEAEA' }}>
                    <Typography variant="body2" color="#666666">
                      {product.category?.name || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ borderBottom: '1px solid #EAEAEA' }}>
                    <Typography variant="body2" fontWeight={600} color="#111827">
                      Rp {Number(product.price).toLocaleString('id-ID')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: '1px solid #EAEAEA' }}>
                    <Typography variant="body2" color="#666666">
                      ⭐ {Number(product.rating).toFixed(1)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: '1px solid #EAEAEA' }}>
                    <Box 
                      sx={{ 
                        display: 'inline-block',
                        px: 1.2, py: 0.3, 
                        borderRadius: '99px',
                        border: '1px solid',
                        borderColor: product.status === 'active' ? '#A7F3D0' : '#EAEAEA',
                        bgcolor: product.status === 'active' ? '#ECFDF5' : '#FAFAFA',
                        color: product.status === 'active' ? '#065F46' : '#666666',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {product.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: '1px solid #EAEAEA' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      <Tooltip title="Lihat" arrow>
                        <IconButton
                          component={Link}
                          to={`/products/${product.id}`}
                          size="small"
                          sx={{ color: '#666666', '&:hover': { bgcolor: '#F5F5F5', color: '#111827' } }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          size="small"
                          onClick={() => openEditDialog(product)}
                          sx={{ color: '#3B82F6', '&:hover': { bgcolor: '#EFF6FF' } }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Hapus" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(product.id)}
                          sx={{ color: '#EF4444', '&:hover': { bgcolor: '#FEF2F2' } }}
                        >
                          <DeleteIcon fontSize="small" />
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
              placeholder="Contoh: Template React E-Commerce Modern"
              variant="outlined"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              InputProps={{ sx: { borderRadius: '12px' } }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Deskripsi Lengkap"
              placeholder="Contoh: Template ini dibuat menggunakan React dan MUI. Sangat cocok untuk toko online..."
              multiline
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              InputProps={{ sx: { borderRadius: '12px' } }}
              InputLabelProps={{ shrink: true }}
            />
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
              <TextField
                label="Harga (Rp)"
                placeholder="Contoh: 150000"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                InputProps={{ sx: { borderRadius: '12px' } }}
                InputLabelProps={{ shrink: true }}
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
              label="Tautan Berkas Produk (Google Drive / GitHub)"
              placeholder="Contoh: https://drive.google.com/file/d/1a2b3c4d..."
              value={form.file_path}
              onChange={(e) => setForm({ ...form, file_path: e.target.value })}
              InputProps={{ sx: { borderRadius: '12px' } }}
              InputLabelProps={{ shrink: true }}
              helperText="Tautan ini akan diberikan kepada pembeli setelah mereka membayar."
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
              <TextField
                label="URL Gambar/Thumbnail"
                placeholder="Contoh: https://imgur.com/gambar.png"
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                InputProps={{ sx: { borderRadius: '12px' } }}
                InputLabelProps={{ shrink: true }}
                helperText="Tautan gambar untuk sampul produk."
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
    </Box>
  );
}

function StatCard({ label, value }) {
  return (
    <Card 
      elevation={0} 
      sx={{ 
        border: '1px solid #EAEAEA', 
        borderRadius: '8px', 
        bgcolor: '#ffffff',
        boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
        height: '100%'
      }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Typography variant="body2" sx={{ color: '#666666', fontWeight: 500, mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="h4" fontWeight={700} color="#000000" sx={{ letterSpacing: '-0.02em' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
