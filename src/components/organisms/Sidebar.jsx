import { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Button, IconButton, Collapse } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Logo from '../atoms/Logo';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

const drawerWidth = 260;

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const { user, isLoggedIn, logout } = useAuth();
  const { wishlistItems } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({ 'Eksplorasi': true });

  const handleLogout = () => {
    if (handleDrawerToggle) handleDrawerToggle();
    logout();
    navigate('/');
  };

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  const eksplorasiChildren = [
    { text: 'Semua Produk', path: '/products' }
  ];

  if (isLoggedIn && user?.role === 'admin') {
    eksplorasiChildren.push({ text: 'Daftar Pengguna', path: '/users' });
  }

  const navItems = [
    { text: 'Beranda', icon: <HomeIcon fontSize="small" />, path: '/' },
    { 
      text: 'Eksplorasi', 
      icon: <StorefrontIcon fontSize="small" />, 
      children: eksplorasiChildren
    },
  ];

  const roleItems = [];
  if (isLoggedIn && user?.role === 'buyer') {
    roleItems.push(
      { text: 'Pesanan Saya', icon: <ShoppingCartIcon fontSize="small" />, path: '/orders' },
      { text: `Koleksi Favorit (${wishlistItems?.length || 0})`, icon: <FavoriteIcon fontSize="small" />, path: '/wishlist' }
    );
  }
  if (isLoggedIn && user?.role === 'seller') {
    roleItems.push({ text: 'Dashboard Seller', icon: <DashboardIcon fontSize="small" />, path: '/seller/dashboard' });
  }
  if (isLoggedIn && user?.role === 'admin') {
    roleItems.push({ text: 'Dashboard Admin', icon: <DashboardIcon fontSize="small" />, path: '/admin/dashboard' });
  }

  const renderMenuItem = (item, isSubItem = false) => {
    if (item.children) {
      const isOpen = openMenus[item.text];
      return (
        <Box key={item.text} sx={{ mb: 0.5 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => toggleMenu(item.text)}
              sx={{
                borderRadius: '6px',
                px: 1.5,
                py: 1,
                color: '#111827',
                '&:hover': {
                  bgcolor: '#f9fafb',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: '#6b7280' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                slotProps={{
                  primary: { fontWeight: 600, fontSize: '0.9rem' }
                }}
              />
              {isOpen ? <ExpandLess sx={{ fontSize: '1.2rem', color: '#6b7280' }} /> : <ExpandMore sx={{ fontSize: '1.2rem', color: '#6b7280' }} />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map(child => renderMenuItem(child, true))}
            </List>
          </Collapse>
        </Box>
      );
    }

    const isActive = location.pathname === item.path;
    return (
      <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
        <ListItemButton
          component={Link}
          to={item.path}
          onClick={handleDrawerToggle}
          sx={{
            borderRadius: '6px',
            pr: 1.5,
            pl: isSubItem ? 5.5 : 1.5,
            py: 1,
            bgcolor: isActive ? '#f3f4f6' : 'transparent',
            color: isActive ? '#111827' : '#4b5563',
            '&:hover': {
              bgcolor: isActive ? '#f3f4f6' : '#f9fafb',
              color: '#111827',
            }
          }}
        >
          {item.icon && (
            <ListItemIcon sx={{ minWidth: 32, color: isActive ? '#111827' : '#9ca3af' }}>
              {item.icon}
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.text}
            slotProps={{
              primary: { 
                fontWeight: isActive ? 600 : 500, 
                fontSize: '0.9rem',
              }
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#ffffff' }}>

      {/* Header Sidebar */}
      <Box sx={{ 
        height: 72, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        px: 2.5,
        borderBottom: '1px solid #f3f4f6'
      }}>
        <Logo color="#000000" />
        <IconButton 
          onClick={handleDrawerToggle} 
          size="small"
          sx={{ color: '#9ca3af', '&:hover': { bgcolor: '#f3f4f6', color: '#111827' } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Menu List */}
      <List sx={{ px: 2, py: 2.5, flexGrow: 1, overflowY: 'auto' }}>
        <Typography 
          variant="overline" 
          sx={{ 
            px: 1.5, mb: 1, display: 'block', 
            color: '#9ca3af', fontWeight: 600, 
            letterSpacing: '0.05em', lineHeight: 1
          }}
        >
          Menu Utama
        </Typography>
        
        {navItems.map(item => renderMenuItem(item))}

        {roleItems.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography 
              variant="overline" 
              sx={{ 
                px: 1.5, mb: 1, display: 'block', 
                color: '#9ca3af', fontWeight: 600, 
                letterSpacing: '0.05em', lineHeight: 1
              }}
            >
              {user?.role ? user.role.toUpperCase() : 'USER'}
            </Typography>
            {roleItems.map(item => renderMenuItem(item))}
          </Box>
        )}
      </List>

      {/* Footer Profile Area */}
      <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid #f3f4f6' }}>
        {isLoggedIn ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1 }}>
              <Avatar 
                sx={{ 
                  width: 36, height: 36, 
                  bgcolor: '#f3f4f6', 
                  color: '#111827', 
                  fontSize: '0.9rem', 
                  fontWeight: 600 
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Box sx={{ overflow: 'hidden' }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: '#111827' }} noWrap>
                  {user?.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280', display: 'block' }} noWrap>
                  {user?.email}
                </Typography>
              </Box>
            </Box>
            
            <Button
              fullWidth
              variant="text"
              color="inherit"
              startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
              onClick={handleLogout}
              sx={{ 
                justifyContent: 'flex-start', 
                borderRadius: '6px', 
                textTransform: 'none', 
                fontWeight: 500,
                color: '#ef4444',
                px: 1.5,
                '&:hover': { bgcolor: '#fef2f2' }
              }}
            >
              Keluar Akun
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              fullWidth
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
              variant="outlined"
              sx={{ 
                borderRadius: '6px', 
                textTransform: 'none', 
                fontWeight: 600, 
                py: 0.8,
                borderColor: '#e5e7eb', 
                color: '#111827',
                '&:hover': { bgcolor: '#f9fafb', borderColor: '#d1d5db' }
              }}
            >
              Masuk
            </Button>
            <Button
              fullWidth
              component={Link}
              to="/register"
              onClick={handleDrawerToggle}
              variant="contained"
              sx={{ 
                borderRadius: '6px', 
                textTransform: 'none', 
                fontWeight: 600, 
                py: 0.8,
                bgcolor: '#000000', 
                color: '#ffffff',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#333333', boxShadow: 'none' }
              }}
            >
              Daftar Baru
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} 
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            borderRight: '1px solid #e5e7eb',
            bgcolor: '#ffffff',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
