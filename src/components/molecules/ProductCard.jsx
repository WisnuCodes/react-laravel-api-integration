import { Link } from 'react-router-dom';
import {
  Card, CardMedia, CardContent, Typography, Box, Rating, IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export default function ProductCard({ product }) {
  const p = product;
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isLoggedIn, user } = useAuth();
  const isFav = isWishlisted(p.id);

  return (
    <Card
      component={Link}
      to={`/products/${p.id}`}
      elevation={0}
      sx={{
        textDecoration: 'none',
        bgcolor: 'transparent',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        color: '#111827',
        height: '100%',
        '&:hover .product-img': {
          transform: 'scale(1.02)',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardMedia
        className="product-img"
        component="div"
        sx={{
          height: 220,
          background: '#f3f4f6',
          borderRadius: '16px',
          position: 'relative',
          border: '1px solid #e5e7eb',
          transition: 'all 0.3s ease',
          mb: 2,
          overflow: 'hidden'
        }}
      >
        {p.thumbnail && p.thumbnail.startsWith('http') ? (
          <Box
            component="img"
            src={p.thumbnail}
            alt={p.title || p.name}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="caption" color="#9ca3af">No Image</Typography>
          </Box>
        )}
        
        {isLoggedIn && user?.role === 'buyer' && (
          <IconButton
            className={isFav ? "btn-liked-ring" : ""}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(p.id);
            }}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              bgcolor: '#ffffff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              color: isFav ? '#EF4444' : '#9CA3AF',
              '&:hover': { bgcolor: isFav ? '#FEE2E2' : '#F3F4F6', color: isFav ? '#EF4444' : '#6B7280' },
              zIndex: 2,
              transition: 'all 0.2s',
            }}
          >
            {isFav ? <FavoriteIcon className="icon-liked" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
        )}
      </CardMedia>

      <CardContent sx={{ p: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
            mb: 0.5,
            letterSpacing: '-0.01em',
            color: '#111827'
          }}
        >
          {p.title || p.name || 'Tanpa Judul'}
        </Typography>

        {p.category?.name && (
          <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
            {p.category.name}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
          <Typography variant="body1" fontWeight={700} color="#111827">
            Rp {Number(p.price).toLocaleString('id-ID')}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating 
              value={Number(p.rating)} 
              precision={0.1} 
              readOnly 
              size="small" 
              sx={{ 
                fontSize: '0.9rem',
                '& .MuiRating-iconFilled': { color: '#000000' },
                '& .MuiRating-iconEmpty': { color: '#e5e7eb' }
              }} 
            />
            <Typography variant="caption" color="#000000" fontWeight={700}>
              {Number(p.rating).toFixed(1)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #f3f4f6' }}>
          <Typography 
            variant="button" 
            sx={{ 
              display: 'block', 
              textAlign: 'center', 
              width: '100%', 
              fontWeight: 600, 
              color: '#4b5563',
              textTransform: 'none',
              transition: 'color 0.2s ease',
              '.MuiCard-root:hover &': {
                color: '#111827'
              }
            }}
          >
            Lihat Detail →
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
