
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import TopNav from './components/organisms/TopNav';
import BottomNav from './components/organisms/BottomNav';
import Footer from './components/organisms/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOtp';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import Orders from './pages/Orders';
import Library from './pages/Library';
import SellerDashboard from './pages/SellerDashboard';
import Cart from './pages/Cart';
import Landing from './pages/Landing';
import AdminDashboard from './pages/AdminDashboard';
import { WishlistProvider } from './context/WishlistContext';
import { FollowProvider } from './context/FollowContext';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import StoreProfile from './pages/StoreProfile';
import Following from './pages/Following';
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';
import ServerError from './pages/ServerError';
import ProtectedRoute from './components/ProtectedRoute';
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

  const hideLayout = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/verify-otp';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#ffffff' }}>

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
        {!hideLayout && <TopNav />}

        <Box sx={{ flexGrow: 1, pt: hideLayout ? 0 : '72px', pb: { xs: hideLayout ? 0 : 8, md: 0 } }}>
          <Routes>
            {/* Rute Publik */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/store/:username" element={<StoreProfile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />

            {/* Rute Khusus Admin */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetail />} />
            </Route>

            {/* Rute Khusus Penjual / Kreator */}
            <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
            </Route>

            {/* Rute Khusus Pembeli */}
            <Route element={<ProtectedRoute allowedRoles={['buyer']} />}>
              <Route path="/orders" element={<Orders />} />
              <Route path="/library" element={<Library />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/following" element={<Following />} />
            </Route>

            {/* Rute Untuk Semua yang Sudah Login (Bebas Role) */}
            <Route element={<ProtectedRoute allowedRoles={[]} />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
            </Route>
          </Routes>
        </Box>

        {!hideLayout && <Footer />}
        {!hideLayout && <BottomNav />}
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
            <FollowProvider>
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </FollowProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
