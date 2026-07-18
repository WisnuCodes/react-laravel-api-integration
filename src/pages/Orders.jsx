import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Typography, Box, CircularProgress, Alert,
  Paper, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, TextField, MenuItem
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api/client';

export default function Orders() {
  const { user } = useAuth();
  const { data: orders, loading, error, setData: setOrders } = useFetch('/orders', [], 3000);
  const { data: products } = useFetch('/products', [], 60000);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Filter orders for current buyer
  const myOrders = Array.isArray(orders)
    ? orders.filter(o => o.buyer?.id === user?.user_id)
    : [];

  const statusConfig = {
    pending: { label: 'Menunggu', color: 'warning' },
    success: { label: 'Berhasil', color: 'success' },
    failed: { label: 'Gagal', color: 'error' },
  };

  const handleCreateOrder = async () => {
    if (!selectedProduct || !amount) return;
    setSubmitLoading(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify({
          product_id: Number(selectedProduct),
          amount: Number(amount),
        }),
      });

      // Refresh orders
      const res = await apiRequest('/orders');
      setOrders(res.data || res);

      setSubmitSuccess('Pesanan berhasil dibuat!');
      setSelectedProduct('');
      setAmount('');
      setTimeout(() => {
        setOpenDialog(false);
        setSubmitSuccess('');
      }, 1200);
    } catch (err) {
      setSubmitError(err.message || 'Gagal membuat pesanan.');
    } finally {
      setSubmitLoading(false);
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
            <ShoppingCartIcon sx={{ fontSize: 40, color: '#000000' }} />
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
              Pesanan Saya
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: '#6b7280', fontSize: { xs: '0.95rem', md: '1.15rem' } }}>
            Riwayat semua pesanan yang pernah Anda buat
          </Typography>
        </Box>

        {user?.role === 'buyer' && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{
              bgcolor: '#000000',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              '&:hover': { bgcolor: '#333333' },
            }}
          >
            Buat Pesanan
          </Button>
        )}
      </Box>

      {/* Orders Table */}
      {myOrders.length === 0 ? (
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
          <ShoppingCartIcon sx={{ fontSize: 48, color: '#d1d5db', mb: 2 }} />
          <Typography sx={{ color: '#6b7280' }}>Belum ada pesanan.</Typography>
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
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Produk
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} align="right">
                  Harga
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} align="right">
                  Jumlah
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Tanggal
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} align="center">
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myOrders.map((order) => {
                const status = statusConfig[order.payment_status] || statusConfig.pending;
                return (
                  <TableRow
                    key={order.id}
                    sx={{
                      transition: 'background-color 0.2s',
                      '&:hover': { bgcolor: 'action.hover' },
                      '&:last-child td': { borderBottom: 0 },
                    }}
                  >
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {order.product?.title || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        Rp {Number(order.product?.price || 0).toLocaleString('id-ID')}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={600}>
                        Rp {Number(order.amount || 0).toLocaleString('id-ID')}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={status.label}
                        color={status.color}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 600, borderRadius: 2 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(order.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {order.product?.id && (
                        <Tooltip title="Lihat Produk" arrow>
                          <IconButton
                            component={Link}
                            to={`/products/${order.product.id}`}
                            size="small"
                            sx={{
                              bgcolor: '#f3f4f6',
                              '&:hover': { bgcolor: '#e5e7eb' },
                            }}
                          >
                            <VisibilityIcon fontSize="small" sx={{ color: '#000000' }} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create Order Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => { setOpenDialog(false); setSubmitError(''); setSubmitSuccess(''); }}
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
          Buat Pesanan Baru
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {submitError && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{submitError}</Alert>}
          {submitSuccess && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>{submitSuccess}</Alert>}

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            <TextField
              select
              fullWidth
              label="Pilih Produk yang Ingin Dibeli"
              value={selectedProduct}
              onChange={(e) => {
                setSelectedProduct(e.target.value);
                const p = products.find(p => p.id === Number(e.target.value));
                if (p) setAmount(String(p.price));
              }}
              InputProps={{ sx: { borderRadius: '12px' } }}
            >
              {products.map((p) => (
                <MenuItem key={p.id} value={p.id} sx={{ py: 1.5 }}>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>{p.title}</Typography>
                    <Typography variant="body2" color="text.secondary">Rp {Number(p.price).toLocaleString('id-ID')}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Total yang Harus Dibayar (Rp)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{ sx: { borderRadius: '12px' } }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 4, pt: 1, gap: 1 }}>
          <Button
            onClick={() => { setOpenDialog(false); setSubmitError(''); setSubmitSuccess(''); }}
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
            onClick={handleCreateOrder}
            disabled={submitLoading || !selectedProduct || !amount}
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
            {submitLoading ? 'Memproses...' : 'Buat Pesanan Sekarang'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
