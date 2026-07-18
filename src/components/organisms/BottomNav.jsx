import { useState } from 'react';
import { 
  Paper, 
  BottomNavigation, 
  BottomNavigationAction, 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Button
} from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAuth } from '../../context/AuthContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();
  
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Helper to determine which tab is active
  const getActiveValue = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/products') return 'explore';
    if (location.pathname === '/orders') return 'orders';
    if (location.pathname === '/seller/dashboard') return 'dashboard';
    if (location.pathname === '/admin/dashboard') return 'dashboard';
    return '';
  };

  const handleLogout = () => {
    setDrawerOpen(false);
    logout();
    navigate('/');
  };

  return (
    <>
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: (theme) => theme.zIndex.drawer + 2,
          display: { xs: 'block', md: 'none' }, // Only show on mobile
          borderTop: '1px solid #e5e7eb',
          pb: 'env(safe-area-inset-bottom)' // iOS Safe area
        }} 
        elevation={0}
      >
        <BottomNavigation
          showLabels
          value={getActiveValue()}
          onChange={(event, newValue) => {
            if (newValue === 'account') {
              if (isLoggedIn) {
                setDrawerOpen(true);
              } else {
                navigate('/login');
              }
            } else if (newValue === 'home') {
              navigate('/');
            } else if (newValue === 'explore') {
              navigate('/products');
            } else if (newValue === 'orders') {
              navigate('/orders');
            } else if (newValue === 'dashboard') {
               navigate(user?.role === 'admin' ? '/admin/dashboard' : '/seller/dashboard');
            }
          }}
          sx={{ 
            height: 65,
            '& .MuiBottomNavigationAction-root': {
              minWidth: 'auto',
              padding: '6px 0',
              color: '#9ca3af'
            },
            '& .Mui-selected': {
              color: '#000000',
            }
          }}
        >
          <BottomNavigationAction 
            label="Beranda" 
            value="home" 
            icon={getActiveValue() === 'home' ? <HomeIcon /> : <HomeOutlinedIcon />} 
          />
          <BottomNavigationAction 
            label="Eksplorasi" 
            value="explore" 
            icon={getActiveValue() === 'explore' ? <SearchIcon /> : <SearchOutlinedIcon />} 
          />
          
          {isLoggedIn && user?.role === 'buyer' && (
            <BottomNavigationAction 
              label="Pesanan" 
              value="orders" 
              icon={<StorefrontOutlinedIcon />} 
            />
          )}

          {isLoggedIn && (user?.role === 'admin' || user?.role === 'seller') && (
            <BottomNavigationAction 
              label="Dashboard" 
              value="dashboard" 
              icon={<DashboardIcon />} 
            />
          )}

          <BottomNavigationAction 
            label={isLoggedIn ? 'Akun' : 'Masuk'} 
            value="account" 
            icon={drawerOpen || getActiveValue() === 'account' ? <PersonIcon /> : <PersonOutlineOutlinedIcon />} 
          />
        </BottomNavigation>
      </Paper>

      {/* Account Drawer for Mobile */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { 
            borderTopLeftRadius: 20, 
            borderTopRightRadius: 20,
            pb: 4
          }
        }}
      >
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 50, height: 50, bgcolor: '#000', fontSize: '1.2rem' }}>
            {user?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>{user?.name}</Typography>
            <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
          </Box>
        </Box>
        <Divider />
        <List sx={{ px: 2, mt: 1 }}>
          {isLoggedIn && user?.role === 'admin' && (
            <ListItem disablePadding sx={{ mb: 1 }}>
              <Button
                fullWidth
                component={Link}
                to="/users"
                variant="text"
                onClick={() => setDrawerOpen(false)}
                startIcon={<PersonIcon />}
                sx={{ 
                  color: '#111827', 
                  justifyContent: 'flex-start',
                  px: 2, py: 1.5, fontWeight: 600, borderRadius: '12px',
                  '&:hover': { bgcolor: '#f3f4f6' }
                }}
              >
                Daftar Pengguna
              </Button>
            </ListItem>
          )}

          {isLoggedIn && user?.role === 'buyer' && (
            <ListItem disablePadding sx={{ mb: 1 }}>
              <Button
                fullWidth
                component={Link}
                to="/wishlist"
                variant="text"
                onClick={() => setDrawerOpen(false)}
                startIcon={<SearchOutlinedIcon />}
                sx={{ 
                  color: '#111827', 
                  justifyContent: 'flex-start',
                  px: 2, py: 1.5, fontWeight: 600, borderRadius: '12px',
                  '&:hover': { bgcolor: '#f3f4f6' }
                }}
              >
                Koleksi Favorit
              </Button>
            </ListItem>
          )}

          <ListItem disablePadding sx={{ mb: 1 }}>
            <Button
              fullWidth
              variant="text"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ 
                color: '#ef4444', 
                justifyContent: 'flex-start',
                px: 2, py: 1.5, fontWeight: 600, bgcolor: '#fef2f2', borderRadius: '12px'
              }}
            >
              Keluar Akun
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
