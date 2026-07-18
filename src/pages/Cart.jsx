import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, CircularProgress, Alert,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Tooltip, Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { items, loading, itemCount, total, updateQuantity, removeFromCart, checkout } = useCart();

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await checkout();
      setMessage({ type: 'success', text: res.message || 'Checkout berhasil!' });
      setTimeout(() => navigate('/orders'), 1500);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Gagal checkout.' });
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleUpdateQty = async (cartId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    try {
      await updateQuantity(cartId, newQty);
    } catch {
      // silently fail
    }
  };

  const handleRemove = async (cartId) => {
    try {
      await removeFromCart(cartId);
    } catch {
      // silently fail
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress sx={{ color: '#000000' }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, minHeight: '75vh' }}>

      {/* Header */}
      <Box sx={{ mb: 6, borderBottom: '1px solid #E5E7EB', pb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
          <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCartIcon sx={{ fontSize: 24, color: '#111827' }} />
          </Box>
          <Typography
            variant="h2"
            component="h1"
            fontWeight="800"
            sx={{
              color: '#111827',
              fontSize: { xs: '2rem', md: '3rem' },
              letterSpacing: '-0.03em',
            }}
          >
            Keranjang
          </Typography>
          {itemCount > 0 && (
            <Box sx={{ bgcolor: '#111827', color: '#ffffff', px: 1.5, py: 0.5, borderRadius: '99px', ml: 1 }}>
              <Typography variant="subtitle2" fontWeight="700">
                {itemCount}
              </Typography>
            </Box>
          )}
        </Box>
        <Typography variant="h6" sx={{ color: '#6B7280', fontSize: { xs: '1rem', md: '1.25rem' }, fontWeight: 400 }}>
          Tinjau produk digital Anda sebelum melanjutkan ke pembayaran.
        </Typography>
      </Box>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 3 }}>{message.text}</Alert>
      )}

      {items.length === 0 ? (
        <Box
          sx={{
            borderRadius: 4,
            bgcolor: '#F9FAFB',
            py: 12,
            px: 4,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <ShoppingCartIcon sx={{ fontSize: 40, color: '#9CA3AF' }} />
          </Box>
          <Typography variant="h5" fontWeight="700" sx={{ color: '#111827', mb: 1 }}>Keranjang Anda masih kosong</Typography>
          <Typography sx={{ color: '#6B7280', mb: 4, maxWidth: 400 }}>
            Sepertinya Anda belum menambahkan produk digital apapun ke dalam keranjang.
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            disableElevation
            sx={{
              bgcolor: '#111827',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '99px',
              px: 4,
              py: 1.5,
              '&:hover': { bgcolor: '#1F2937' },
            }}
          >
            Mulai Belanja
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 5 }}>

          {/* Cart Table */}
          <Box sx={{ flex: 1 }}>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: 600 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #F3F4F6', px: 0 }}>
                      Produk
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #F3F4F6' }} align="right">
                      Harga
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #F3F4F6' }} align="center">
                      Kuantitas
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #F3F4F6' }} align="right">
                      Subtotal
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #F3F4F6', px: 0 }} align="center">
                      Aksi
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                      <TableCell sx={{ borderBottom: '1px solid #F3F4F6', py: 3, px: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ width: 64, height: 64, borderRadius: '8px', bgcolor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>IMG</Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="700" sx={{ color: '#111827', mb: 0.5, lineHeight: 1.2 }}>
                              {item.product?.title || '-'}
                            </Typography>
                            {item.product?.category && (
                              <Typography variant="caption" sx={{ color: '#6B7280', bgcolor: '#F3F4F6', px: 1, py: 0.5, borderRadius: '4px' }}>
                                {item.product.category}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: '1px solid #F3F4F6', py: 3 }}>
                        <Typography variant="body2" sx={{ color: '#4B5563', fontWeight: 500 }}>
                          Rp {Number(item.product?.price || 0).toLocaleString('id-ID')}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: '1px solid #F3F4F6', py: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleUpdateQty(item.id, item.quantity, -1)}
                            disabled={item.quantity <= 1}
                            sx={{ border: '1px solid #E5E7EB', width: 28, height: 28, borderRadius: '6px' }}
                          >
                            <RemoveIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                          <Typography variant="body2" fontWeight={600} sx={{ minWidth: 24, textAlign: 'center', color: '#111827' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleUpdateQty(item.id, item.quantity, 1)}
                            sx={{ border: '1px solid #E5E7EB', width: 28, height: 28, borderRadius: '6px' }}
                          >
                            <AddIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: '1px solid #F3F4F6', py: 3 }}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#111827' }}>
                          Rp {Number(item.subtotal || 0).toLocaleString('id-ID')}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: '1px solid #F3F4F6', py: 3, px: 0 }}>
                        <Tooltip title="Hapus" arrow>
                          <IconButton
                            size="small"
                            onClick={() => handleRemove(item.id)}
                            sx={{ color: '#EF4444', bgcolor: '#FEF2F2', borderRadius: '8px', '&:hover': { bgcolor: '#FEE2E2' } }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Summary */}
          <Box sx={{ width: { xs: '100%', md: 360 }, flexShrink: 0 }}>
            <Box
              sx={{
                bgcolor: '#F9FAFB',
                borderRadius: 4,
                p: 4,
                position: { md: 'sticky' },
                top: { md: 100 },
              }}
            >
              <Typography variant="h6" fontWeight={800} sx={{ color: '#111827', mb: 3 }}>
                Ringkasan Pesanan
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>Total Produk</Typography>
                <Typography variant="body2" fontWeight={600} sx={{ color: '#111827' }}>{itemCount} item</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, pb: 3, borderBottom: '1px dashed #D1D5DB' }}>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>Subtotal</Typography>
                <Typography variant="body2" fontWeight={600} sx={{ color: '#111827' }}>
                  Rp {total.toLocaleString('id-ID')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h6" fontWeight={800} sx={{ color: '#111827' }}>Total Bayar</Typography>
                <Typography variant="h6" fontWeight={800} sx={{ color: '#111827' }}>
                  Rp {total.toLocaleString('id-ID')}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                disableElevation
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={handleCheckout}
                disabled={checkoutLoading || items.length === 0}
                sx={{
                  bgcolor: '#111827',
                  color: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: '12px',
                  py: 1.5,
                  '&:hover': { bgcolor: '#1F2937' },
                }}
              >
                {checkoutLoading ? 'Memproses...' : 'Lanjutkan ke Pembayaran'}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
