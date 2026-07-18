import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Button, 
  IconButton, 
  Badge, 
  Avatar, 
  Menu, 
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
  Popover,
  Grid
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DiamondIcon from '@mui/icons-material/Diamond';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../atoms/Logo';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const { itemCount } = useCart();
  const { wishlistItems } = useWishlist();

  // State for Avatar Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // State for Mega Menu (Eksplorasi)
  const [megaAnchorEl, setMegaAnchorEl] = useState(null);
  const openMega = Boolean(megaAnchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMegaClick = (event) => {
    // If it's already open, close it, else open it
    if (megaAnchorEl) {
      setMegaAnchorEl(null);
    } else {
      setMegaAnchorEl(event.currentTarget);
    }
  };
  const handleMegaClose = () => setMegaAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/');
  };

  const isBuyer = isLoggedIn && user?.role === 'buyer';

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.90)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E5E7EB',
        color: '#111827',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4, lg: 6 }, height: 72, display: 'flex', justifyContent: 'space-between' }}>
        
        {/* LEFT: Logo */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', minWidth: 150 }}>
          <Logo />
        </Box>

        {/* CENTER: Desktop Navigation (Pill Layout) */}
        <Box 
          sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center', 
            bgcolor: '#ffffff', 
            p: 0.5, 
            borderRadius: '99px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
            whiteSpace: 'nowrap'
          }}
        >
          <Button
            component={Link}
            to="/"
            disableRipple
            sx={{
              color: location.pathname === '/' ? '#000000' : '#4B5563',
              fontWeight: location.pathname === '/' ? 700 : 500,
              fontSize: '0.9rem',
              px: 3, py: 1,
              borderRadius: '99px',
              bgcolor: location.pathname === '/' ? '#F3F4F6' : 'transparent',
              '&:hover': { bgcolor: '#F9FAFB', color: '#111827' }
            }}
          >
            Beranda
          </Button>
          
          <Button
            disableRipple
            onClick={handleMegaClick}
            endIcon={<KeyboardArrowDownIcon sx={{ transition: 'transform 0.2s', transform: openMega ? 'rotate(180deg)' : 'none' }} />}
            sx={{
              color: location.pathname.includes('/products') || openMega ? '#000000' : '#4B5563',
              fontWeight: location.pathname.includes('/products') || openMega ? 700 : 500,
              fontSize: '0.9rem',
              px: 3, py: 1,
              borderRadius: '99px',
              bgcolor: location.pathname.includes('/products') || openMega ? '#F3F4F6' : 'transparent',
              '&:hover': { bgcolor: '#F9FAFB', color: '#111827' }
            }}
          >
            Eksplorasi
          </Button>

          {isLoggedIn && user?.role === 'admin' && (
            <Button
              component={Link}
              to="/admin/dashboard"
              disableRipple
              sx={{
                color: location.pathname.includes('/admin') ? '#000000' : '#4B5563',
                fontWeight: location.pathname.includes('/admin') ? 700 : 500,
                fontSize: '0.9rem',
                px: 3, py: 1,
                borderRadius: '99px',
                bgcolor: location.pathname.includes('/admin') ? '#F3F4F6' : 'transparent',
                '&:hover': { bgcolor: '#F9FAFB', color: '#111827' }
              }}
            >
              Dasbor Admin
            </Button>
          )}

          {isLoggedIn && user?.role === 'seller' && (
            <Button
              component={Link}
              to="/seller/dashboard"
              disableRipple
              sx={{
                color: location.pathname.includes('/seller') ? '#000000' : '#4B5563',
                fontWeight: location.pathname.includes('/seller') ? 700 : 500,
                fontSize: '0.9rem',
                px: 3, py: 1,
                borderRadius: '99px',
                bgcolor: location.pathname.includes('/seller') ? '#F3F4F6' : 'transparent',
                '&:hover': { bgcolor: '#F9FAFB', color: '#111827' }
              }}
            >
              Dasbor Seller
            </Button>
          )}
        </Box>

        {/* RIGHT: Actions */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: { xs: 1, md: 2 }, minWidth: 150 }}>
          
          {/* Cart & Wishlist (Visible on mobile & desktop if buyer) */}
          {isBuyer && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                component={Link}
                to="/wishlist"
                sx={{ 
                  color: '#4B5563',
                  '&:hover': { bgcolor: '#F3F4F6', color: '#111827' } 
                }}
              >
                <Badge badgeContent={wishlistItems?.length || 0} color="error" max={99}>
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>
              
              <IconButton
                component={Link}
                to="/cart"
                sx={{ 
                  color: '#4B5563',
                  '&:hover': { bgcolor: '#F3F4F6', color: '#111827' } 
                }}
              >
                <Badge badgeContent={itemCount} color="error" max={99}>
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Box>
          )}

          {/* Profile / Auth (Hidden on mobile, handled by BottomNav) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <IconButton
                  onClick={handleMenuClick}
                  sx={{ 
                    p: 0.5, 
                    border: '2px solid transparent', 
                    '&:hover': { borderColor: '#E5E7EB' }, 
                    transition: 'all 0.2s',
                    ml: 1
                  }}
                >
                  <Avatar sx={{ width: 38, height: 38, bgcolor: '#111827', fontSize: '1rem', fontWeight: 700 }}>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 10px 30px rgba(0,0,0,0.1))',
                      mt: 1.5,
                      minWidth: 240,
                      borderRadius: '16px',
                      border: '1px solid #E5E7EB'
                    },
                  }}
                >
                  <Box sx={{ px: 2.5, py: 2 }}>
                    <Typography variant="subtitle2" fontWeight={800} sx={{ fontSize: '1rem' }} noWrap>{user?.name}</Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>{user?.email}</Typography>
                  </Box>
                  <Divider sx={{ borderColor: '#F3F4F6' }} />
                  
                  {isBuyer && (
                    <MenuItem component={Link} to="/orders" sx={{ py: 1.5, px: 2.5 }}>
                      <ListItemIcon><StorefrontIcon fontSize="small" sx={{ color: '#4B5563' }} /></ListItemIcon>
                      <Typography fontWeight={600} fontSize="0.9rem">Pesanan Saya</Typography>
                    </MenuItem>
                  )}
                  {user?.role === 'admin' && (
                    <MenuItem component={Link} to="/users" sx={{ py: 1.5, px: 2.5 }}>
                      <ListItemIcon><PersonIcon fontSize="small" sx={{ color: '#4B5563' }} /></ListItemIcon>
                      <Typography fontWeight={600} fontSize="0.9rem">Kelola Pengguna</Typography>
                    </MenuItem>
                  )}

                  <Divider sx={{ borderColor: '#F3F4F6' }} />
                  <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 2.5, color: '#EF4444' }}>
                    <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: '#EF4444' }} /></ListItemIcon>
                    <Typography fontWeight={600} fontSize="0.9rem">Keluar Akun</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                <Button 
                  component={Link} 
                  to="/login"
                  variant="text" 
                  disableRipple
                  sx={{ 
                    color: '#4B5563', 
                    fontWeight: 600, 
                    px: 2.5, 
                    borderRadius: '99px',
                    '&:hover': { color: '#111827', bgcolor: '#F9FAFB' }
                  }}
                >
                  Masuk
                </Button>
                <Button 
                  component={Link} 
                  to="/register"
                  variant="contained" 
                  disableElevation
                  sx={{ 
                    bgcolor: '#111827', 
                    color: '#ffffff', 
                    fontWeight: 600, 
                    px: 3.5, 
                    py: 1,
                    borderRadius: '99px',
                    whiteSpace: 'nowrap',
                    '&:hover': { bgcolor: '#374151' }
                  }}
                >
                  Buat Akun
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Toolbar>

      {/* MEGA MENU (Eksplorasi) */}
      <Popover
        open={openMega}
        anchorEl={megaAnchorEl}
        onClose={handleMegaClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 2,
            overflow: 'hidden',
            filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.1))',
            borderRadius: '24px',
            border: '1px solid #E5E7EB',
            width: 700,
            maxWidth: '90vw'
          }
        }}
      >
        <Grid container>
          <Grid item xs={5} sx={{ bgcolor: '#F9FAFB', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h5" fontWeight={800} color="#111827" sx={{ mb: 2, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Jelajahi aset<br/>kreatif tanpa batas.
            </Typography>
            <Typography variant="body2" color="#6B7280" sx={{ mb: 4 }}>
              Temukan UI Kit, template React, hingga desain 3D untuk proyek Anda berikutnya.
            </Typography>
            <Button
              component={Link}
              to="/products"
              onClick={handleMegaClose}
              variant="outlined"
              sx={{ 
                alignSelf: 'flex-start',
                borderRadius: '99px', 
                color: '#111827', 
                borderColor: '#111827',
                fontWeight: 600,
                px: 3,
                '&:hover': { bgcolor: '#111827', color: '#ffffff' }
              }}
            >
              Lihat Katalog
            </Button>
          </Grid>
          
          <Grid item xs={7} sx={{ p: 4, bgcolor: '#ffffff' }}>
            <Typography variant="overline" fontWeight={700} color="#9CA3AF" sx={{ display: 'block', mb: 2, letterSpacing: '0.05em' }}>
              Kategori Teratas
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                component={Link}
                to="/products"
                onClick={handleMegaClose}
                startIcon={<AutoFixHighIcon sx={{ color: '#111827' }} />}
                sx={{ justifyContent: 'flex-start', color: '#4B5563', fontWeight: 600, p: 1.5, borderRadius: '12px', '&:hover': { bgcolor: '#F3F4F6', color: '#111827' } }}
              >
                Template UI & Desain Website
              </Button>
              <Button
                component={Link}
                to="/products"
                onClick={handleMegaClose}
                startIcon={<CodeIcon sx={{ color: '#111827' }} />}
                sx={{ justifyContent: 'flex-start', color: '#4B5563', fontWeight: 600, p: 1.5, borderRadius: '12px', '&:hover': { bgcolor: '#F3F4F6', color: '#111827' } }}
              >
                Source Code (React, Laravel, Vue)
              </Button>
              <Button
                component={Link}
                to="/products"
                onClick={handleMegaClose}
                startIcon={<DiamondIcon sx={{ color: '#111827' }} />}
                sx={{ justifyContent: 'flex-start', color: '#4B5563', fontWeight: 600, p: 1.5, borderRadius: '12px', '&:hover': { bgcolor: '#F3F4F6', color: '#111827' } }}
              >
                Aset 3D & Ilustrasi Premium
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Popover>
    </AppBar>
  );
}
