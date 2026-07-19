import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Typography, Box, CircularProgress, Alert,
  IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, TextField, MenuItem,
  Avatar, Chip, Divider, Tabs, Tab
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddIcon from '@mui/icons-material/Add';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
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
  const [activeTab, setActiveTab] = useState(0);

  const myOrders = Array.isArray(orders)
    ? orders.filter(o => o.buyer?.id === user?.user_id)
    : [];

  // Tab filtering
  const tabFilters = ['all', 'pending', 'success', 'failed'];
  const filteredOrders = activeTab === 0
    ? myOrders
    : myOrders.filter(o => o.payment_status === tabFilters[activeTab]);

  const statusConfig = {
    pending: { label: 'Menunggu Pembayaran', color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A', icon: <HourglassEmptyIcon sx={{ fontSize: 16 }} /> },
    success: { label: 'Pembayaran Berhasil', color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0', icon: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} /> },
    failed: { label: 'Gagal / Dibatalkan', color: '#EF4444', bg: '#FEF2F2', border: '#FECACA', icon: <CancelOutlinedIcon sx={{ fontSize: 16 }} /> },
  };

  // Summary stats
  const totalSpent = myOrders.filter(o => o.payment_status === 'success').reduce((sum, o) => sum + (o.amount || 0), 0);
  const totalSuccess = myOrders.filter(o => o.payment_status === 'success').length;
  const totalPending = myOrders.filter(o => o.payment_status === 'pending').length;

  const handleCreateOrder = async () => {
    if (!selectedProduct || !amount) return;
    setSubmitLoading(true);
    setSubmitError('');
    setSubmitSuccess('');
    try {
      await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify({ product_id: Number(selectedProduct), amount: Number(amount) }),
      });
      const res = await apiRequest('/orders');
      setOrders(res.data || res);
      setSubmitSuccess('Pesanan berhasil dibuat!');
      setSelectedProduct('');
      setAmount('');
      setTimeout(() => { setOpenDialog(false); setSubmitSuccess(''); }, 1200);
    } catch (err) {
      setSubmitError(err.message || 'Gagal membuat pesanan.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ color: '#111827' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ borderRadius: '12px' }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 5, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ReceiptLongOutlinedIcon sx={{ color: '#ffffff' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={900} color="#111827" letterSpacing="-0.03em">
                Riwayat Transaksi
              </Typography>
              <Typography variant="body2" color="#6B7280">
                Semua pesanan dan transaksi Anda tercatat di sini.
              </Typography>
            </Box>
          </Box>
          {user?.role === 'buyer' && (
            <Button
              variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)} disableElevation
              sx={{ bgcolor: '#111827', color: '#ffffff', textTransform: 'none', fontWeight: 700, borderRadius: '12px', px: 3, py: 1.5, '&:hover': { bgcolor: '#000000' } }}
            >
              Buat Pesanan
            </Button>
          )}
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3, mb: 5 }}>
          <Box sx={{ p: 3, borderRadius: '16px', border: '1px solid #E5E7EB', bgcolor: '#ffffff' }}>
            <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 600, mb: 1 }}>Total Transaksi</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#111827' }}>{myOrders.length}</Typography>
          </Box>
          <Box sx={{ p: 3, borderRadius: '16px', border: '1px solid #E5E7EB', bgcolor: '#ffffff' }}>
            <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 600, mb: 1 }}>Berhasil Dibayar</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#10B981' }}>{totalSuccess}
              {totalPending > 0 && <Typography component="span" variant="body2" sx={{ color: '#F59E0B', ml: 1 }}>({totalPending} pending)</Typography>}
            </Typography>
          </Box>
          <Box sx={{ p: 3, borderRadius: '16px', border: '1px solid #E5E7EB', bgcolor: '#ffffff' }}>
            <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 600, mb: 1 }}>Total Pengeluaran</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#111827' }}>Rp {totalSpent.toLocaleString('id-ID')}</Typography>
          </Box>
        </Box>

        {/* Filter Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            mb: 4,
            '& .MuiTabs-indicator': { bgcolor: '#111827', height: 3, borderRadius: '99px' },
            '& .MuiTab-root': { textTransform: 'none', fontWeight: 700, color: '#6B7280', '&.Mui-selected': { color: '#111827' } }
          }}
        >
          <Tab label={`Semua (${myOrders.length})`} />
          <Tab label={`Pending (${myOrders.filter(o => o.payment_status === 'pending').length})`} />
          <Tab label={`Berhasil (${totalSuccess})`} />
          <Tab label={`Gagal (${myOrders.filter(o => o.payment_status === 'failed').length})`} />
        </Tabs>

        <Divider sx={{ mb: 4, borderColor: '#F3F4F6' }} />

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 12, bgcolor: '#F9FAFB', borderRadius: '24px', border: '1px dashed #D1D5DB' }}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 48, color: '#D1D5DB', mb: 2 }} />
            <Typography variant="h6" color="#4B5563" fontWeight={700} mb={1}>
              {activeTab === 0 ? 'Belum ada transaksi' : 'Tidak ada transaksi dengan status ini'}
            </Typography>
            <Typography variant="body2" color="#9CA3AF">
              {activeTab === 0 ? 'Anda belum melakukan pembelian apapun.' : 'Coba pilih tab filter lain.'}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {filteredOrders.map((order) => {
              const status = statusConfig[order.payment_status] || statusConfig.pending;
              return (
                <Box
                  key={order.id}
                  sx={{
                    borderRadius: '20px',
                    border: '1px solid #E5E7EB',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: '#D1D5DB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }
                  }}
                >
                  {/* Order Header Bar */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2, bgcolor: '#F9FAFB', borderBottom: '1px solid #F3F4F6', flexWrap: 'wrap', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#111827' }}>
                        #{order.id}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#6B7280' }}>
                        <AccessTimeIcon sx={{ fontSize: 14 }} />
                        <Typography variant="caption" sx={{ fontWeight: 500 }}>
                          {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          {' · '}
                          {new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      icon={status.icon}
                      label={status.label}
                      size="small"
                      sx={{ bgcolor: status.bg, color: status.color, border: `1px solid ${status.border}`, fontWeight: 700, borderRadius: '10px', '& .MuiChip-icon': { color: status.color } }}
                    />
                  </Box>

                  {/* Order Body */}
                  <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexGrow: 1, minWidth: 0 }}>
                      {/* Product Thumbnail */}
                      <Box
                        sx={{
                          width: 80, height: 80, borderRadius: '14px', overflow: 'hidden', bgcolor: '#F3F4F6', flexShrink: 0,
                          border: '1px solid #E5E7EB'
                        }}
                      >
                        {order.product?.thumbnail ? (
                          <Box component="img" src={order.product.thumbnail} alt={order.product?.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <StorefrontIcon sx={{ color: '#9CA3AF', fontSize: 32 }} />
                          </Box>
                        )}
                      </Box>

                      {/* Product Info */}
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#111827', lineHeight: 1.3, mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {order.product?.title || 'Produk tidak tersedia'}
                        </Typography>
                        {order.product?.category && (
                          <Chip label={order.product.category} size="small" sx={{ bgcolor: '#F3F4F6', color: '#4B5563', fontWeight: 600, height: 24, fontSize: '0.75rem', mb: 1 }} />
                        )}
                        {order.seller?.name && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 22, height: 22, bgcolor: '#111827', fontSize: '0.65rem', fontWeight: 700 }}>
                              {order.seller.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600 }}>
                              {order.seller.name}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {/* Price & Actions */}
                    <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1.5 }}>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: '#111827', letterSpacing: '-0.02em' }}>
                        Rp {Number(order.amount || 0).toLocaleString('id-ID')}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {order.product?.id && (
                          <Tooltip title="Lihat Produk" arrow>
                            <IconButton
                              component={Link}
                              to={`/products/${order.product.id}`}
                              size="small"
                              sx={{ border: '1px solid #E5E7EB', borderRadius: '10px', '&:hover': { bgcolor: '#F3F4F6' } }}
                            >
                              <OpenInNewIcon fontSize="small" sx={{ color: '#4B5563' }} />
                            </IconButton>
                          </Tooltip>
                        )}
                        {order.seller?.username && (
                          <Tooltip title="Lihat Toko" arrow>
                            <IconButton
                              component={Link}
                              to={`/store/${order.seller.username}`}
                              size="small"
                              sx={{ border: '1px solid #E5E7EB', borderRadius: '10px', '&:hover': { bgcolor: '#F3F4F6' } }}
                            >
                              <StorefrontIcon fontSize="small" sx={{ color: '#4B5563' }} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}

        {/* Create Order Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => { setOpenDialog(false); setSubmitError(''); setSubmitSuccess(''); }}
          maxWidth="sm" fullWidth
          PaperProps={{ sx: { borderRadius: '24px', p: 1 } }}
        >
          <DialogTitle sx={{ fontWeight: 800, pb: 1, pt: 3, px: 3, fontSize: '1.5rem', color: '#111827' }}>
            Buat Pesanan Baru
          </DialogTitle>
          <DialogContent sx={{ p: 3 }}>
            {submitError && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{submitError}</Alert>}
            {submitSuccess && <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>{submitSuccess}</Alert>}
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
              <TextField
                select fullWidth label="Pilih Produk" value={selectedProduct}
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
                fullWidth label="Nominal Transaksi (Rp)" type="number"
                value={amount} onChange={(e) => setAmount(e.target.value)}
                InputProps={{ sx: { borderRadius: '12px' } }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, pt: 0, gap: 1 }}>
            <Button onClick={() => { setOpenDialog(false); setSubmitError(''); setSubmitSuccess(''); }}
              sx={{ textTransform: 'none', color: '#6B7280', fontWeight: 600, px: 3, py: 1, borderRadius: '99px' }}>
              Batal
            </Button>
            <Button variant="contained" onClick={handleCreateOrder} disabled={submitLoading || !selectedProduct || !amount} disableElevation
              sx={{ bgcolor: '#111827', color: '#ffffff', textTransform: 'none', fontWeight: 600, px: 4, py: 1.2, borderRadius: '99px', '&:hover': { bgcolor: '#000000' }, '&.Mui-disabled': { bgcolor: '#F3F4F6', color: '#9CA3AF' } }}>
              {submitLoading ? 'Memproses...' : 'Buat Pesanan'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
