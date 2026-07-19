import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Typography, Box, CircularProgress, Alert,
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, TextField, MenuItem,
  Grid, Card, CardContent, Divider, Checkbox, FormControlLabel
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
  const [termsAgreed, setTermsAgreed] = useState(false);

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: '#FAFAFA',
      transition: 'all 0.2s',
      '& fieldset': { borderColor: '#E5E7EB', borderWidth: '1px' },
      '&:hover fieldset': { borderColor: '#D1D5DB' },
      '&.Mui-focused fieldset': { borderColor: '#111827', borderWidth: '1px' },
      '&.Mui-focused': { backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)' },
      '& input, & textarea, & .MuiSelect-select': {
        fontSize: '0.95rem',
        fontWeight: 500,
        color: '#111827',
      }
    },
    '& .MuiInputLabel-root': {
      color: '#6B7280',
      fontSize: '0.9rem',
      fontWeight: 500,
      '&.Mui-focused': { color: '#111827', fontWeight: 600 }
    }
  };

  const resetForm = () => {
    setForm({ title: '', description: '', price: '', rating: '0', category_id: '', file_path: '', thumbnail: '', status: 'active' });
    setEditingProduct(null);
    setSubmitError('');
    setSubmitSuccess('');
    setTermsAgreed(false);
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
        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 1, sm: 2 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: '#09090b', mb: 0.5, letterSpacing: '-0.03em', fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
              Dashboard Seller
            </Typography>
            <Typography variant="body2" sx={{ color: '#71717a' }}>
              Kelola semua produk yang Anda jual di platform ini.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openAddDialog}
            sx={{
              bgcolor: '#09090b',
              width: { xs: '100%', sm: 'auto' },
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              px: 3, py: { xs: 1.2, sm: 1 },
              '&:hover': { bgcolor: '#27272a' },
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

      {/* Products Section */}
      {myProducts.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            borderRadius: '12px',
            border: '1px solid #EAEAEA',
            bgcolor: '#ffffff',
            py: 8,
            px: 2,
            textAlign: 'center',
          }}
        >
          <DashboardIcon sx={{ fontSize: 48, color: '#d4d4d8', mb: 2 }} />
          <Typography sx={{ color: '#71717a', mb: 3 }}>Anda belum memiliki produk.</Typography>
          <Button
            variant="outlined"
            onClick={openAddDialog}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              borderColor: '#e4e4e7',
              color: '#09090b',
              '&:hover': { bgcolor: '#f4f4f5', borderColor: '#d4d4d8' }
            }}
          >
            Tambah Produk Pertama
          </Button>
        </Paper>
      ) : (
        <>
          {/* Mobile View: Cards (Hidden on Desktop) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2 }}>
            {myProducts.map((product) => (
              <Card 
                key={product.id} 
                elevation={0} 
                sx={{ 
                  borderRadius: '12px', 
                  border: '1px solid #EAEAEA', 
                  bgcolor: '#ffffff' 
                }}
              >
                <CardContent sx={{ p: 2, pb: '16px !important' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{ pr: 2 }}>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#09090b', lineHeight: 1.2, mb: 0.5 }}>
                        {product.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#71717a' }}>
                        {product.category?.name || '-'}
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        display: 'inline-block',
                        px: 1.2, py: 0.3, 
                        borderRadius: '100px',
                        border: '1px solid',
                        borderColor: product.status === 'active' ? '#A7F3D0' : '#E4E4E7',
                        bgcolor: product.status === 'active' ? '#ECFDF5' : '#FAFAFA',
                        color: product.status === 'active' ? '#065F46' : '#71717A',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {product.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#09090b', fontSize: '1.1rem' }}>
                      Rp {Number(product.price).toLocaleString('id-ID')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#71717a', fontWeight: 600 }}>
                      ⭐ {Number(product.rating).toFixed(1)}
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 1.5, borderColor: '#f4f4f5' }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                    <Button 
                      startIcon={<VisibilityIcon />} 
                      component={Link} 
                      to={`/products/${product.id}`}
                      fullWidth
                      sx={{ 
                        color: '#71717a', 
                        bgcolor: '#fafafa',
                        border: '1px solid #e4e4e7',
                        textTransform: 'none', 
                        fontWeight: 600,
                        borderRadius: '8px',
                        py: 0.8,
                        '&:hover': { bgcolor: '#f4f4f5' }
                      }}
                    >
                      Lihat
                    </Button>
                    <Button 
                      startIcon={<EditIcon />} 
                      onClick={() => openEditDialog(product)}
                      fullWidth
                      sx={{ 
                        color: '#3B82F6', 
                        bgcolor: '#EFF6FF',
                        textTransform: 'none', 
                        fontWeight: 600,
                        borderRadius: '8px',
                        py: 0.8,
                        '&:hover': { bgcolor: '#DBEAFE' }
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      startIcon={<DeleteIcon />} 
                      onClick={() => handleDelete(product.id)}
                      fullWidth
                      sx={{ 
                        color: '#EF4444', 
                        bgcolor: '#FEF2F2',
                        textTransform: 'none', 
                        fontWeight: 600,
                        borderRadius: '8px',
                        py: 0.8,
                        '&:hover': { bgcolor: '#FEE2E2' }
                      }}
                    >
                      Hapus
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Desktop View: Table (Hidden on Mobile) */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
                    <TableCell sx={{ fontWeight: 600, color: '#71717a', borderBottom: '1px solid #EAEAEA', py: 2 }}>
                      Produk
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#71717a', borderBottom: '1px solid #EAEAEA', py: 2 }}>
                      Kategori
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#71717a', borderBottom: '1px solid #EAEAEA', py: 2 }} align="right">
                      Harga
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#71717a', borderBottom: '1px solid #EAEAEA', py: 2 }} align="center">
                      Rating
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#71717a', borderBottom: '1px solid #EAEAEA', py: 2 }} align="center">
                      Status
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#71717a', borderBottom: '1px solid #EAEAEA', py: 2 }} align="center">
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
                        <Typography variant="body2" fontWeight={700} color="#09090b">
                          {product.title}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #EAEAEA' }}>
                        <Typography variant="body2" color="#71717a">
                          {product.category?.name || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: '1px solid #EAEAEA' }}>
                        <Typography variant="body2" fontWeight={700} color="#09090b">
                          Rp {Number(product.price).toLocaleString('id-ID')}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: '1px solid #EAEAEA' }}>
                        <Typography variant="body2" color="#71717a" fontWeight={600}>
                          ⭐ {Number(product.rating).toFixed(1)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: '1px solid #EAEAEA' }}>
                        <Box 
                          sx={{ 
                            display: 'inline-block',
                            px: 1.2, py: 0.3, 
                            borderRadius: '100px',
                            border: '1px solid',
                            borderColor: product.status === 'active' ? '#A7F3D0' : '#e4e4e7',
                            bgcolor: product.status === 'active' ? '#ECFDF5' : '#FAFAFA',
                            color: product.status === 'active' ? '#065F46' : '#71717a',
                            fontSize: '0.75rem',
                            fontWeight: 700,
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
                              sx={{ color: '#71717a', '&:hover': { bgcolor: '#e4e4e7', color: '#09090b' } }}
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
          </Box>
        </>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => { setOpenDialog(false); resetForm(); }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ 
          sx: { 
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          } 
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 800, 
          pb: 2, pt: 3, px: 4,
          fontSize: '1.25rem',
          color: '#111827',
          borderBottom: '1px solid #F3F4F6'
        }}>
          {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
          <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500, mt: 0.5 }}>
            {editingProduct ? 'Perbarui informasi produk Anda di bawah ini.' : 'Lengkapi detail produk digital yang ingin Anda jual.'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>{submitError}</Alert>}
          {submitSuccess && <Alert severity="success" sx={{ mb: 3, borderRadius: '8px' }}>{submitSuccess}</Alert>}

          {/* Syarat & Ketentuan Upload Produk */}
          <Box sx={{ mb: 4, p: 3, bgcolor: '#FFFBEB', border: '1px solid #FEF3C7', borderRadius: '12px' }}>
            <Typography variant="subtitle2" sx={{ color: '#92400E', fontWeight: 700, mb: 1 }}>
              Perhatian Sebelum Mengunggah Produk
            </Typography>
            <Typography variant="body2" sx={{ color: '#92400E', mb: 1.5, lineHeight: 1.6 }}>
              Sebagai penjual di platform Dibitech, Anda wajib memastikan bahwa:
            </Typography>
            <Box component="ul" sx={{ color: '#92400E', m: 0, pl: 2.5, fontSize: '0.85rem', lineHeight: 1.6 }}>
              <li style={{ marginBottom: '4px' }}>Produk digital ini adalah 100% buatan Anda sendiri atau Anda memiliki lisensi distribusi komersial yang sah.</li>
              <li style={{ marginBottom: '4px' }}>File tidak mengandung malware, backdoor, atau kode berbahaya lainnya yang dapat merugikan pembeli.</li>
              <li style={{ marginBottom: '4px' }}><strong>Dilarang mengunggah produk yang penuh dengan bug fatal.</strong> Jika ditemukan bug oleh pembeli, Anda wajib memberikan solusi perbaikan atau merilis pembaruan (update) secara gratis.</li>
              <li>Pelanggaran terhadap hak cipta atau keamanan akan mengakibatkan akun diblokir secara permanen tanpa peringatan.</li>
            </Box>
          </Box>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#111827', fontWeight: 700, mb: 2 }}>
                1. Informasi Dasar
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  fullWidth
                  label="Judul Produk"
                  placeholder="Contoh: Template React E-Commerce Modern"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  sx={inputStyles}
                />
                <TextField
                  fullWidth
                  label="Deskripsi Lengkap"
                  placeholder="Deskripsikan fitur, kegunaan, dan panduan singkat mengenai produk ini..."
                  multiline
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  sx={inputStyles}
                />
              </Box>
            </Box>

            <Divider sx={{ borderColor: '#F3F4F6' }} />

            <Box>
              <Typography variant="subtitle2" sx={{ color: '#111827', fontWeight: 700, mb: 2 }}>
                2. Harga & Kategori
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                <TextField
                  label="Harga (Rp)"
                  placeholder="Contoh: 150000"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  sx={inputStyles}
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
                <TextField
                  select
                  label="Kategori"
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                  sx={inputStyles}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id || cat.category_id} value={cat.id || cat.category_id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>

            <Divider sx={{ borderColor: '#F3F4F6' }} />

            <Box>
              <Typography variant="subtitle2" sx={{ color: '#111827', fontWeight: 700, mb: 2 }}>
                3. Berkas & Media
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  fullWidth
                  label="Tautan Berkas Produk (Google Drive / GitHub / ZIP)"
                  placeholder="Contoh: https://drive.google.com/file/d/..."
                  value={form.file_path}
                  onChange={(e) => setForm({ ...form, file_path: e.target.value })}
                  sx={inputStyles}
                  helperText="Tautan ini bersifat rahasia dan HANYA diberikan kepada pembeli setelah mereka membayar."
                />

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                  <TextField
                    label="URL Gambar/Thumbnail"
                    placeholder="Contoh: https://imgur.com/gambar.png"
                    value={form.thumbnail}
                    onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                    sx={inputStyles}
                    helperText="Tautan gambar sampul. Biarkan kosong jika tidak ada."
                  />
                  <TextField
                    select
                    label="Status Produk"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    sx={inputStyles}
                  >
                    <MenuItem value="active">Aktif & Ditampilkan</MenuItem>
                    <MenuItem value="inactive">Sembunyikan</MenuItem>
                  </TextField>
                </Box>
              </Box>
            </Box>

            <FormControlLabel
              control={
                <Checkbox 
                  checked={termsAgreed} 
                  onChange={(e) => setTermsAgreed(e.target.checked)} 
                  sx={{ color: '#a1a1aa', '&.Mui-checked': { color: '#09090b' } }} 
                />
              }
              label={
                <Typography variant="body2" sx={{ color: '#71717a', fontSize: '0.85rem' }}>
                  Saya menyatakan bahwa produk ini mematuhi semua syarat & ketentuan, bebas dari pelanggaran hak cipta, aman dari malware, dan dipastikan berjalan tanpa bug fatal.
                </Typography>
              }
              sx={{ mt: 2, alignItems: 'flex-start', '& .MuiCheckbox-root': { pt: 0.2 } }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 4, pt: 1, gap: 1 }}>
          <Button
            onClick={() => { setOpenDialog(false); resetForm(); }}
            sx={{ 
              textTransform: 'none', 
              color: '#71717a',
              fontWeight: 600,
              px: 3, py: 1,
              borderRadius: '8px',
              '&:hover': { bgcolor: '#f4f4f5' }
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitLoading || !form.title || !form.description || !form.price || !form.category_id || !form.file_path || !termsAgreed}
            sx={{
              bgcolor: '#09090b',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 600,
              px: 3, py: 1.2,
              borderRadius: '8px',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#27272a', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
              '&.Mui-disabled': { bgcolor: '#e4e4e7', color: '#a1a1aa' }
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
        borderRadius: '12px', 
        bgcolor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        height: '100%',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
      }}
    >
      <CardContent sx={{ p: 3, pb: '24px !important' }}>
        <Typography variant="body2" sx={{ color: '#71717a', fontWeight: 600, mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
          {label}
        </Typography>
        <Typography variant="h4" fontWeight={800} color="#09090b" sx={{ letterSpacing: '-0.02em', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
