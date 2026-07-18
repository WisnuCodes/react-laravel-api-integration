import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Typography, Box, CircularProgress, Alert,
  Paper, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, TextField, MenuItem,
  Card, CardContent
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddIcon from '@mui/icons-material/Add';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
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
    pending: { label: 'Menunggu', color: '#F59E0B', bg: '#FEF3C7', border: '#FDE68A' },
    success: { label: 'Berhasil', color: '#10B981', bg: '#D1FAE5', border: '#A7F3D0' },
    failed: { label: 'Gagal', color: '#EF4444', bg: '#FEE2E2', border: '#FECACA' },
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
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', py: 12, bgcolor: '#F9FAFB' }}>
        <CircularProgress sx={{ color: '#111827' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', py: 8, bgcolor: '#F9FAFB' }}>
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ borderRadius: '12px' }}>{error}</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 6, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ReceiptLongOutlinedIcon sx={{ color: '#ffffff' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={800} color="#111827" letterSpacing="-0.02em">
                Pesanan Saya
              </Typography>
              <Typography variant="body2" color="#6B7280">
                Lacak dan kelola riwayat transaksi Anda.
              </Typography>
            </Box>
          </Box>

          {user?.role === 'buyer' && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              disableElevation
              sx={{
                bgcolor: '#111827',
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '99px',
                px: 3, py: 1,
                '&:hover': { bgcolor: '#000000' },
              }}
            >
              Buat Pesanan
            </Button>
          )}
        </Box>

        {/* Orders Table */}
        {myOrders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 12, bgcolor: '#ffffff', borderRadius: '24px', border: '1px dashed #E5E7EB' }}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 48, color: '#D1D5DB', mb: 2 }} />
            <Typography variant="h6" color="#4B5563" fontWeight={600} mb={1}>Belum ada pesanan</Typography>
            <Typography variant="body2" color="#9CA3AF">Anda belum melakukan transaksi apapun di platform ini.</Typography>
          </Box>
        ) : (
          <Card 
            elevation={0}
            sx={{
              borderRadius: '24px',
              border: '1px solid #E5E7EB',
              bgcolor: '#ffffff',
              overflow: 'hidden'
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                    <TableCell sx={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #E5E7EB', py: 2 }}>
                      No. Transaksi
                    </TableCell>
                    <TableCell sx={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #E5E7EB', py: 2 }}>
                      Produk
                    </TableCell>
                    <TableCell align="right" sx={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #E5E7EB', py: 2 }}>
                      Nominal
                    </TableCell>
                    <TableCell align="center" sx={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #E5E7EB', py: 2 }}>
                      Status
                    </TableCell>
                    <TableCell align="right" sx={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #E5E7EB', py: 2 }}>
                      Tanggal
                    </TableCell>
                    <TableCell align="center" sx={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #E5E7EB', py: 2 }}>
                      Detail
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
                          transition: 'all 0.2s',
                          '&:hover': { bgcolor: '#F9FAFB' },
                          '& td': { borderBottom: '1px solid #F3F4F6' },
                          '&:last-child td': { borderBottom: 'none' }
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" fontWeight={600} color="#111827">
                            #{order.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500} color="#374151">
                            {order.product?.title || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600} color="#111827">
                            Rp {Number(order.amount || 0).toLocaleString('id-ID')}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              px: 1.5, py: 0.5,
                              borderRadius: '99px',
                              bgcolor: status.bg,
                              color: status.color,
                              border: `1px solid ${status.border}`,
                              fontSize: '0.75rem',
                              fontWeight: 700
                            }}
                          >
                            {status.label}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="#6B7280">
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
                                  border: '1px solid #E5E7EB',
                                  bgcolor: '#ffffff',
                                  '&:hover': { bgcolor: '#F3F4F6' },
                                }}
                              >
                                <VisibilityOutlinedIcon fontSize="small" sx={{ color: '#4B5563' }} />
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
          </Card>
        )}

        {/* Create Order Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => { setOpenDialog(false); setSubmitError(''); setSubmitSuccess(''); }}
          maxWidth="sm"
          fullWidth
          PaperProps={{ 
            sx: { 
              borderRadius: '24px',
              p: 1
            } 
          }}
        >
          <DialogTitle sx={{ 
            fontWeight: 800, 
            pb: 1, pt: 3, px: 3,
            fontSize: '1.5rem',
            color: '#111827'
          }}>
            Buat Pesanan Baru
          </DialogTitle>
          <DialogContent sx={{ p: 3 }}>
            {submitError && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{submitError}</Alert>}
            {submitSuccess && <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>{submitSuccess}</Alert>}

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
              <TextField
                select
                fullWidth
                label="Pilih Produk"
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
                      <Typography variant="body2" fontWeight={600}>{p.title}</Typography>
                      <Typography variant="caption" color="text.secondary">Rp {Number(p.price).toLocaleString('id-ID')}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Nominal Transaksi (Rp)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{ sx: { borderRadius: '12px' } }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, pt: 0, gap: 1 }}>
            <Button
              onClick={() => { setOpenDialog(false); setSubmitError(''); setSubmitSuccess(''); }}
              sx={{ 
                textTransform: 'none', 
                color: '#6B7280',
                fontWeight: 600,
                px: 3, py: 1,
                borderRadius: '99px'
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              onClick={handleCreateOrder}
              disabled={submitLoading || !selectedProduct || !amount}
              disableElevation
              sx={{
                bgcolor: '#111827',
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                px: 4, py: 1.2,
                borderRadius: '99px',
                '&:hover': { bgcolor: '#000000' },
                '&.Mui-disabled': { bgcolor: '#F3F4F6', color: '#9CA3AF' }
              }}
            >
              {submitLoading ? 'Memproses...' : 'Buat Pesanan'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
