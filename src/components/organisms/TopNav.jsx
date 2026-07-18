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
  ListItemIcon
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DashboardIcon from '@mui/icons-material/Dashboard';
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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/');
  };

  const navItems = [
    { text: 'Beranda', path: '/' },
    { text: 'Eksplorasi', path: '/products' },
  ];

  if (isLoggedIn && user?.role === 'admin') {
    navItems.push({ text: 'Pengguna', path: '/users' });
    navItems.push({ text: 'Dashboard Admin', path: '/admin/dashboard' });
  }
  if (isLoggedIn && user?.role === 'seller') {
    navItems.push({ text: 'Dashboard Seller', path: '/seller/dashboard' });
  }
  
  // Buyer links specific to top nav
  const isBuyer = isLoggedIn && user?.role === 'buyer';

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e5e7eb',
        color: '#111827',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, height: 70 }}>
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 4, gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? '#000000' : '#6b7280',
                fontWeight: location.pathname === item.path ? 700 : 500,
                fontSize: '0.95rem',
                px: 2,
                borderRadius: '8px',
                '&:hover': { bgcolor: '#f3f4f6', color: '#000000' }
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
          
          {/* Cart & Wishlist (Always visible on mobile & desktop if buyer) */}
          {isBuyer && (
            <>
              <IconButton
                component={Link}
                to="/wishlist"
                color="inherit"
                sx={{ '&:hover': { bgcolor: '#f3f4f6' } }}
              >
                <Badge badgeContent={wishlistItems?.length || 0} color="error" max={99}>
                  <FavoriteBorderOutlinedIcon />
                </Badge>
              </IconButton>
              
              <IconButton
                component={Link}
                to="/cart"
                color="inherit"
                sx={{ '&:hover': { bgcolor: '#f3f4f6' } }}
              >
                <Badge badgeContent={itemCount} color="error" max={99}>
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </>
          )}

          {/* Profile / Auth (Hidden on mobile, handled by BottomNav) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 1 }}>
            {isLoggedIn ? (
              <>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ p: 0.5, border: '2px solid transparent', '&:hover': { borderColor: '#e5e7eb' }, transition: 'all 0.2s' }}
                >
                  <Avatar sx={{ width: 35, height: 35, bgcolor: '#000000', fontSize: '0.9rem', fontWeight: 600 }}>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.08))',
                      mt: 1.5,
                      minWidth: 200,
                      borderRadius: '12px',
                      border: '1px solid #f3f4f6'
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight={700} noWrap>{user?.name}</Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>{user?.email}</Typography>
                  </Box>
                  <Divider />
                  
                  {isBuyer && (
                    <MenuItem component={Link} to="/orders" sx={{ py: 1.5 }}>
                      <ListItemIcon><StorefrontIcon fontSize="small" /></ListItemIcon>
                      Pesanan Saya
                    </MenuItem>
                  )}
                  {user?.role === 'seller' && (
                    <MenuItem component={Link} to="/seller/dashboard" sx={{ py: 1.5 }}>
                      <ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>
                      Dashboard Seller
                    </MenuItem>
                  )}

                  <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#ef4444' }}>
                    <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: '#ef4444' }} /></ListItemIcon>
                    Keluar Akun
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  component={Link} 
                  to="/login"
                  variant="text" 
                  sx={{ color: '#111827', fontWeight: 600, px: 2, borderRadius: '8px' }}
                >
                  Masuk
                </Button>
                <Button 
                  component={Link} 
                  to="/register"
                  variant="contained" 
                  disableElevation
                  sx={{ 
                    bgcolor: '#000000', 
                    color: '#ffffff', 
                    fontWeight: 600, 
                    px: 3, 
                    borderRadius: '8px',
                    '&:hover': { bgcolor: '#374151' }
                  }}
                >
                  Daftar
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
