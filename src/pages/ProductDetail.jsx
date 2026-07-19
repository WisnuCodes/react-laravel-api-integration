import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Chip, Rating, CircularProgress, Alert,
  Button, TextField, Avatar, Divider, IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { useMutation } from '../hooks/useMutation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const { data: product, loading: productLoading, error: productError, setData: setProduct } = useFetch(`/products/${id}`, null, 3000);
  const { data: reviews, loading: reviewsLoading, setData: setReviews } = useFetch(`/products/${id}/reviews`, [], 3000);
  const { data: libraryRes } = useFetch(isLoggedIn && user?.role === 'buyer' ? '/buyer/library' : null, []);

  const loading = productLoading || reviewsLoading;
  const error = productError;

  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [cartMsg, setCartMsg] = useState({ type: '', text: '' });
  const [cartLoading, setCartLoading] = useState(false);

  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const { mutate: submitReview, loading: reviewLoading } = useMutation('/reviews', 'POST');

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess('');
    if (reviewRating === 0) {
      setReviewError('Silakan pilih rating (1-5 bintang).');
      return;
    }
    try {
      await submitReview({
        product_id: Number(id),
        rating: reviewRating,
        comment: reviewComment || null,
      });
      setReviewSuccess('Ulasan berhasil dikirim!');
      setReviewRating(0);
      setReviewComment('');

      const [productRes, reviewsRes] = await Promise.all([
        apiRequest(`/products/${id}`),
        apiRequest(`/products/${id}/reviews`)
      ]);
      setProduct(productRes.data || productRes);
      setReviews(reviewsRes.data || []);
    } catch (err) {
      setReviewError(err.message || 'Gagal mengirim ulasan.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Yakin ingin menghapus ulasan ini?')) return;
    try {
      await apiRequest(`/reviews/${reviewId}`, { method: 'DELETE' });
      const [productRes, reviewsRes] = await Promise.all([
        apiRequest(`/products/${id}`),
        apiRequest(`/products/${id}/reviews`)
      ]);
      setProduct(productRes.data || productRes);
      setReviews(reviewsRes.data || []);
    } catch (err) {
      alert(err.message || 'Gagal menghapus ulasan.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 10, display: 'flex', justifyContent: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error || 'Produk tidak ditemukan.'}</Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/products')}>Kembali</Button>
      </Container>
    );
  }

  const hasReviewed = reviews.some(r => r.buyer_id === user?.user_id);

  const library = libraryRes?.data || libraryRes || [];
  const purchasedItem = library.find(item => item.id === (product?.id || product?.product_id));

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/products')}
        sx={{ mb: 3, textTransform: 'none', fontWeight: 600 }}
      >
        Kembali ke Produk
      </Button>

      <Box
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          bgcolor: '#ffffff',
          mb: 4,
          border: '1px solid #E5E7EB'
        }}
      >

        <Box
          sx={{
            height: { xs: 220, md: 360 },
            bgcolor: '#F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {product.thumbnail && product.thumbnail.startsWith('http') ? (
            <Box
              component="img"
              src={product.thumbnail}
              alt={product.title}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <StorefrontIcon sx={{ fontSize: 80, color: '#9CA3AF' }} />
          )}
          {product.category?.name && (
            <Chip
              label={product.category.name}
              size="small"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                fontWeight: 700,
                bgcolor: '#111827',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
          )}
        </Box>

        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h3" fontWeight="800" gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, color: '#111827', letterSpacing: '-0.02em' }}>
            {product.title}
          </Typography>

          {product.seller?.name && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                bgcolor: '#F9FAFB', 
                p: 2.5, 
                borderRadius: 3, 
                mb: 4, 
                border: '1px solid #E5E7EB',
                flexWrap: 'wrap',
                gap: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar 
                  sx={{ width: 50, height: 50, bgcolor: '#111827', fontWeight: 700 }}
                >
                  {product.seller.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Kreator
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#111827', fontWeight: 800, lineHeight: 1.2 }}>
                    {product.seller.name}
                  </Typography>
                </Box>
              </Box>
              
              <Button 
                component={Link} 
                to={product.seller.username ? `/store/${product.seller.username}` : '#'}
                variant="outlined" 
                endIcon={<StorefrontIcon />}
                sx={{ 
                  color: '#111827', 
                  borderColor: '#D1D5DB', 
                  textTransform: 'none', 
                  fontWeight: 600,
                  borderRadius: '12px',
                  '&:hover': { bgcolor: '#F3F4F6', borderColor: '#9CA3AF' }
                }}
              >
                Kunjungi Toko
              </Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#F9FAFB', px: 1.5, py: 0.5, borderRadius: '8px', border: '1px solid #F3F4F6' }}>
              <Rating value={Number(product.rating)} precision={0.1} readOnly size="small" sx={{ color: '#F59E0B' }} />
              <Typography variant="body2" fontWeight="700" sx={{ color: '#111827', ml: 0.5 }}>
                {Number(product.rating).toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({reviews.length})
              </Typography>
            </Box>
            <Chip
              icon={<DownloadIcon sx={{ color: '#6B7280' }} />}
              label={`${product.download_count || 0} diunduh`}
              size="small"
              sx={{ bgcolor: '#F9FAFB', color: '#4B5563', fontWeight: 600, borderRadius: '8px', border: '1px solid #F3F4F6' }}
            />
            <Chip
              label={product.status === 'active' ? 'Tersedia' : 'Tidak Tersedia'}
              size="small"
              sx={{ bgcolor: product.status === 'active' ? '#ECFDF5' : '#FEF2F2', color: product.status === 'active' ? '#059669' : '#DC2626', fontWeight: 600, borderRadius: '8px' }}
            />
          </Box>

          <Typography variant="h3" fontWeight="800" sx={{ mb: 4, color: '#111827', letterSpacing: '-0.02em' }}>
            Rp {Number(product.price).toLocaleString('id-ID')}
          </Typography>

          {isLoggedIn && user?.role === 'buyer' && (
            <Box sx={{ mb: 4 }}>
              {cartMsg.text && (
                <Alert severity={cartMsg.type} sx={{ mb: 2, borderRadius: 2 }} onClose={() => setCartMsg({ type: '', text: '' })}>
                  {cartMsg.text}
                </Alert>
              )}
              <Box sx={{ display: 'flex', gap: 2 }}>
                {purchasedItem ? (
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={() => {
                      if (purchasedItem.file_url) {
                        window.open(purchasedItem.file_url, '_blank');
                      } else {
                        alert('File belum tersedia untuk diunduh.');
                      }
                    }}
                    disableElevation
                    sx={{
                      bgcolor: '#10B981',
                      color: '#ffffff',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      flexGrow: 1,
                      '&:hover': { bgcolor: '#059669' },
                    }}
                  >
                    Download Source
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    disabled={cartLoading}
                    onClick={async () => {
                      setCartLoading(true);
                      setCartMsg({ type: '', text: '' });
                      try {
                        await addToCart(product.id || product.product_id);
                        setCartMsg({ type: 'success', text: 'Ditambahkan ke keranjang!' });
                      } catch (err) {
                        setCartMsg({ type: 'error', text: err.message || 'Gagal menambahkan.' });
                      } finally {
                        setCartLoading(false);
                      }
                    }}
                    disableElevation
                    sx={{
                      bgcolor: '#111827',
                      color: '#ffffff',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      flexGrow: 1,
                      '&:hover': { bgcolor: '#1F2937' },
                    }}
                  >
                    {cartLoading ? 'Menambahkan...' : 'Tambah ke Keranjang'}
                  </Button>
                )}
                
                {product.seller?.id !== user?.user_id && (
                  <Button
                    variant="outlined"
                    startIcon={<ChatBubbleOutlinedIcon />}
                    onClick={() => {
                      navigate(`/messages?userId=${product.seller?.id}&userName=${encodeURIComponent(product.seller?.name || 'Penjual')}`);
                    }}
                    sx={{
                      borderColor: '#E5E7EB',
                      color: '#111827',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: '12px',
                      px: 3,
                      '&:hover': { bgcolor: '#F9FAFB', borderColor: '#D1D5DB' },
                    }}
                  >
                    Chat Penjual
                  </Button>
                )}

                <IconButton
                  className={isWishlisted(product.id) ? "btn-liked-ring" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product.id);
                  }}
                  sx={{
                    bgcolor: '#ffffff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    width: 52,
                    height: 52,
                    color: isWishlisted(product.id) ? '#EF4444' : '#9CA3AF',
                    '&:hover': { 
                      bgcolor: isWishlisted(product.id) ? '#FEE2E2' : '#F3F4F6', 
                      color: isWishlisted(product.id) ? '#EF4444' : '#6B7280',
                      border: '1px solid',
                      borderColor: isWishlisted(product.id) ? '#FECACA' : '#D1D5DB'
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  {isWishlisted(product.id) ? <FavoriteIcon className="icon-liked" /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
            </Box>
          )}

          <Divider sx={{ mb: 4, borderColor: '#F3F4F6' }} />

          <Typography variant="h6" fontWeight="700" sx={{ color: '#111827', mb: 2 }}>
            Deskripsi Produk
          </Typography>
          <Typography variant="body1" sx={{ color: '#4B5563', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
            {product.description || 'Tidak ada deskripsi.'}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          borderRadius: 4,
          bgcolor: '#ffffff',
          p: { xs: 3, md: 4 },
          mb: 4,
          border: '1px solid #E5E7EB'
        }}
      >
        <Typography variant="h5" fontWeight="800" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#111827', mb: 3 }}>
          Ulasan Pembeli <Box component="span" sx={{ bgcolor: '#F3F4F6', color: '#4B5563', px: 1.5, py: 0.5, borderRadius: '99px', fontSize: '1rem' }}>{reviews.length}</Box>
        </Typography>

        <Divider sx={{ mb: 4, borderColor: '#F3F4F6' }} />

        {isLoggedIn && !hasReviewed && (
          <Box
            sx={{ p: 4, mb: 4, borderRadius: 4, bgcolor: '#F9FAFB', border: '1px solid #F3F4F6' }}
          >
            <Typography variant="subtitle1" fontWeight="700" sx={{ color: '#111827', mb: 2 }}>
              Bagaimana pengalaman Anda?
            </Typography>

            {reviewError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{reviewError}</Alert>}
            {reviewSuccess && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{reviewSuccess}</Alert>}

            <Box component="form" onSubmit={handleSubmitReview}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Rating
                  value={reviewRating}
                  onChange={(_, newValue) => setReviewRating(newValue)}
                  size="large"
                  sx={{ color: '#F59E0B' }}
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Ceritakan pendapat Anda tentang produk ini (opsional)..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#ffffff',
                    borderRadius: '12px',
                    '& fieldset': { borderColor: '#E5E7EB' },
                    '&:hover fieldset': { borderColor: '#D1D5DB' },
                    '&.Mui-focused fieldset': { borderColor: '#111827' },
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                disabled={reviewLoading}
                disableElevation
                sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '99px', px: 4, py: 1.5, bgcolor: '#111827', '&:hover': { bgcolor: '#1F2937' } }}
              >
                {reviewLoading ? 'Mengirim...' : 'Kirim Ulasan'}
              </Button>
            </Box>
          </Box>
        )}

        {!isLoggedIn && (
          <Alert severity="info" sx={{ mb: 4, borderRadius: 2, bgcolor: '#EFF6FF', color: '#1E40AF', border: 'none' }}>
            <Link to="/login" style={{ color: '#1D4ED8', fontWeight: 700, textDecoration: 'none' }}>Masuk ke akun Anda</Link> untuk memberikan ulasan.
          </Alert>
        )}

        {hasReviewed && (
          <Alert severity="success" sx={{ mb: 4, borderRadius: 2, bgcolor: '#ECFDF5', color: '#065F46', border: 'none' }}>
            Terima kasih! Anda sudah memberikan ulasan untuk produk ini.
          </Alert>
        )}

        {reviews.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="body1" sx={{ color: '#9CA3AF' }}>
              Belum ada ulasan untuk produk ini. Jadilah yang pertama!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {reviews.map((review) => (
              <Box
                key={review.review_id}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: '#ffffff',
                  border: '1px solid #F3F4F6',
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: '#E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: '#F3F4F6', color: '#111827', width: 44, height: 44, fontWeight: 700 }}>
                      {review.buyer?.name?.charAt(0)?.toUpperCase() || '?'}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="700" sx={{ color: '#111827' }}>
                        {review.buyer?.name || 'Anonim'}
                      </Typography>
                      <Rating value={review.rating} readOnly size="small" sx={{ color: '#F59E0B' }} />
                    </Box>
                  </Box>
                  {user?.user_id === review.buyer_id && (
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteReview(review.review_id)}
                      title="Hapus ulasan"
                      sx={{ color: '#EF4444', bgcolor: '#FEF2F2', borderRadius: '8px', '&:hover': { bgcolor: '#FEE2E2' } }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                {review.comment && (
                  <Typography variant="body2" sx={{ mt: 2, color: '#4B5563', lineHeight: 1.6 }}>
                    {review.comment}
                  </Typography>
                )}
                <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#9CA3AF', fontWeight: 500 }}>
                  {new Date(review.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
