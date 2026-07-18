import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar, IconButton, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sidebar from './components/organisms/Sidebar';
import Footer from './components/organisms/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import Orders from './pages/Orders';
import SellerDashboard from './pages/SellerDashboard';
import Cart from './pages/Cart';
import Landing from './pages/Landing';
import AdminDashboard from './pages/AdminDashboard';
import Logo from './components/atoms/Logo';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Wishlist from './pages/Wishlist';
import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
  palette: {
    primary: { main: '#000000' },
    secondary: { main: '#ffffff' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#111827', secondary: '#6b7280' }
  },
  shape: { borderRadius: 8 },
});



function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const { itemCount } = useCart();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const hideLayout = location.pathname === '/login' || location.pathname === '/register';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#ffffff' }}>

      {!hideLayout && (
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      )}

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%',
          minHeight: '100vh'
        }}
      >
        {!hideLayout && (
          <AppBar 
            position="sticky" 
            elevation={0} 
            sx={{ 
              bgcolor: '#ffffff', 
              borderBottom: '1px solid #e5e7eb',
              color: '#000000'
            }}
          >
            <Toolbar sx={{ px: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Logo />
              <Box sx={{ flexGrow: 1 }} />
              {isLoggedIn && user?.role === 'buyer' && (
                <IconButton
                  color="inherit"
                  onClick={() => navigate('/cart')}
                  sx={{
                    '&:hover': { bgcolor: '#f3f4f6' },
                  }}
                >
                  <Badge badgeContent={itemCount} color="error" max={99}>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </Box>

        {!hideLayout && <Footer />}
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
