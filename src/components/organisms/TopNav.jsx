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
  ListItemIcon,
  Divider,
  Tooltip
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Logo from '../atoms/Logo';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useFetch } from '../../hooks/useFetch';

export default function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const { itemCount } = useCart();
  const { wishlistItems } = useWishlist();

  const isBuyer = isLoggedIn && user?.role === 'buyer';
  const isAdmin = isLoggedIn && user?.role === 'admin';
  const isSeller = isLoggedIn && user?.role === 'seller';

  const { data: categories } = useFetch('/categories', [], 300000);

  const [produkAnchorEl, setProdukAnchorEl] = useState(null);
  const [akunAnchorEl, setAkunAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  // --- Dropdown Handlers ---
  const openProduk = Boolean(produkAnchorEl);
  const openAkun = Boolean(akunAnchorEl);
  const openProfile = Boolean(profileAnchorEl);

  const handleProdukClick = (event) => setProdukAnchorEl(event.currentTarget);
  const handleProdukClose = () => setProdukAnchorEl(null);

  const handleAkunClick = (event) => setAkunAnchorEl(event.currentTarget);
  const handleAkunClose = () => setAkunAnchorEl(null);

  const handleProfileClick = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);

  const handleLogout = () => {
    handleProfileClose();
    handleAkunClose();
    logout();
    navigate('/');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E5E7EB',
        color: '#111827',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4, lg: 6 }, height: 72, display: 'flex', justifyContent: 'space-between' }}>
        
        {/* LEFT: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo />
        </Box>

        {/* CENTER: Main Dropdown Menus */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2, ml: 4 }}>
          
          {/* 1. Beranda (Single Button) */}
          <Button 
            component={Link} 
            to="/" 
            disableRipple
            sx={{ 
              color: location.pathname === '/' ? '#111827' : '#4B5563', 
              fontWeight: 600, 
              fontSize: '0.9rem',
              '&:hover': { bgcolor: '#F3F4F6', color: '#111827' },
              borderRadius: '8px', px: 2, py: 1
            }}
          >
            Beranda
          </Button>

          {/* 2. Produk (Dropdown Menu) */}
          <Button 
            disableRipple
            onClick={handleProdukClick}
            endIcon={<KeyboardArrowDownIcon sx={{ transition: '0.2s', transform: openProduk ? 'rotate(180deg)' : 'none' }} />}
            sx={{ 
              color: openProduk || location.pathname.includes('/products') ? '#111827' : '#4B5563', 
              fontWeight: 600, 
              fontSize: '0.9rem',
              '&:hover': { bgcolor: '#F3F4F6', color: '#111827' },
              borderRadius: '8px', px: 2, py: 1
            }}
          >
            Katalog Produk
          </Button>
          <Menu
            anchorEl={produkAnchorEl}
            open={openProduk}
            onClose={handleProdukClose}
            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible', filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.1))',
                mt: 1, minWidth: 220, borderRadius: '16px', border: '1px solid #E5E7EB'
              },
            }}
          >
            <MenuItem component={Link} to="/products" onClick={handleProdukClose} sx={{ py: 1.5, px: 2 }}>
              <ListItemIcon><CategoryIcon fontSize="small" sx={{ color: '#4B5563' }} /></ListItemIcon>
              <Typography fontWeight={600} fontSize="0.9rem">Semua Produk</Typography>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <MenuItem key={cat.id} component={Link} to={`/products?category=${cat.id}`} onClick={handleProdukClose} sx={{ py: 1.5, px: 2 }}>
                  <Typography fontWeight={500} fontSize="0.85rem" sx={{ ml: 4 }}>{cat.name}</Typography>
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled sx={{ py: 1.5, px: 2 }}>
                <Typography fontWeight={500} fontSize="0.85rem" sx={{ ml: 4 }}>Memuat...</Typography>
              </MenuItem>
            )}
          </Menu>

          {/* 3. Akun & Manajemen (Dropdown Menu - Only if Logged In) */}
          {isLoggedIn && (
            <>
              <Button 
                disableRipple
                onClick={handleAkunClick}
                endIcon={<KeyboardArrowDownIcon sx={{ transition: '0.2s', transform: openAkun ? 'rotate(180deg)' : 'none' }} />}
                sx={{ 
                  color: openAkun ? '#111827' : '#4B5563', 
                  fontWeight: 600, 
                  fontSize: '0.9rem',
                  '&:hover': { bgcolor: '#F3F4F6', color: '#111827' },
                  borderRadius: '8px', px: 2, py: 1
                }}
              >
                Manajemen Akun
              </Button>
              <Menu
                anchorEl={akunAnchorEl}
                open={openAkun}
                onClose={handleAkunClose}
                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible', filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.1))',
                    mt: 1, minWidth: 240, borderRadius: '16px', border: '1px solid #E5E7EB'
                  },
                }}
              >
                <Box sx={{ px: 2.5, py: 1.5 }}>
                  <Typography variant="body2" color="text.secondary">Masuk sebagai</Typography>
                  <Typography variant="subtitle2" fontWeight={800} noWrap>{user?.name}</Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
                
                {/* Buyer Links */}
                {isBuyer && (
                  <>
                    <MenuItem component={Link} to="/library" onClick={handleAkunClose} sx={{ py: 1.5, px: 2 }}>
                      <ListItemIcon><FolderSpecialIcon fontSize="small" sx={{ color: '#10B981' }} /></ListItemIcon>
                      <Typography fontWeight={600} fontSize="0.9rem">My Library</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to="/orders" onClick={handleAkunClose} sx={{ py: 1.5, px: 2 }}>
                      <ListItemIcon><StorefrontIcon fontSize="small" sx={{ color: '#4B5563' }} /></ListItemIcon>
                      <Typography fontWeight={600} fontSize="0.9rem">Pesanan Saya</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to="/following" onClick={handleAkunClose} sx={{ py: 1.5, px: 2 }}>
                      <ListItemIcon><PeopleOutlinedIcon fontSize="small" sx={{ color: '#6366F1' }} /></ListItemIcon>
                      <Typography fontWeight={600} fontSize="0.9rem">Kreator Diikuti</Typography>
                    </MenuItem>
                  </>
                )}

                {/* Seller / Admin Links */}
                {isSeller && (
                  <MenuItem component={Link} to="/seller/dashboard" onClick={handleAkunClose} sx={{ py: 1.5, px: 2 }}>
                    <ListItemIcon><DashboardIcon fontSize="small" sx={{ color: '#3B82F6' }} /></ListItemIcon>
                    <Typography fontWeight={600} fontSize="0.9rem">Dasbor Seller</Typography>
                  </MenuItem>
                )}
                {isAdmin && (
                  <>
                    <MenuItem component={Link} to="/admin/dashboard" onClick={handleAkunClose} sx={{ py: 1.5, px: 2 }}>
                      <ListItemIcon><DashboardIcon fontSize="small" sx={{ color: '#8B5CF6' }} /></ListItemIcon>
                      <Typography fontWeight={600} fontSize="0.9rem">Dasbor Admin</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to="/users" onClick={handleAkunClose} sx={{ py: 1.5, px: 2 }}>
                      <ListItemIcon><PersonIcon fontSize="small" sx={{ color: '#4B5563' }} /></ListItemIcon>
                      <Typography fontWeight={600} fontSize="0.9rem">Kelola Pengguna</Typography>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          )}

        </Box>

        {/* RIGHT: Actions & Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 }, ml: 'auto' }}>
          
          {/* Chat Icon for ALL logged-in users */}
          {isLoggedIn && (
            <Tooltip title="Pesan">
              <IconButton component={Link} to="/messages" sx={{ color: '#09090b', '&:hover': { bgcolor: '#f4f4f5' } }}>
                <ChatBubbleOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Wishlist & Cart Icons for Buyer only */}
          {isBuyer && (
            <Box sx={{ display: 'flex', gap: 1, mr: 1 }}>
              <Tooltip title="Wishlist">
                <IconButton component={Link} to="/wishlist" sx={{ color: '#09090b', '&:hover': { bgcolor: '#f4f4f5' } }}>
                  <Badge badgeContent={wishlistItems?.length || 0} color="error" max={99}>
                    <FavoriteBorderIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <IconButton component={Link} to="/cart" sx={{ color: '#4B5563', '&:hover': { bgcolor: '#F3F4F6', color: '#111827' } }}>
                <Badge badgeContent={itemCount} color="error" max={99}>
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Box>
          )}

          {/* User Profile Avatar or Login/Signup */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <IconButton 
                  onClick={handleProfileClick}
                  sx={{ p: 0.5, border: '2px solid transparent', '&:hover': { borderColor: '#E5E7EB' }, transition: 'all 0.2s', ml: 1 }}
                >
                  <Avatar sx={{ width: 40, height: 40, bgcolor: '#111827', fontSize: '1.1rem', fontWeight: 700 }}>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={profileAnchorEl}
                  open={openProfile}
                  onClose={handleProfileClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible', 
                      filter: 'drop-shadow(0px 12px 32px rgba(0,0,0,0.12))',
                      mt: 1.5, 
                      minWidth: 260, 
                      borderRadius: '16px', 
                      border: '1px solid #E5E7EB',
                      p: 1
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 48, height: 48, bgcolor: '#F3F4F6', color: '#111827', fontWeight: 800, fontSize: '1.2rem', border: '1px solid #E5E7EB' }}>
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Box sx={{ overflow: 'hidden' }}>
                      <Typography variant="subtitle1" fontWeight={800} noWrap sx={{ color: '#111827', lineHeight: 1.2, mb: 0.2 }}>
                        {user?.name}
                      </Typography>
                      <Typography variant="body2" color="#6B7280" noWrap sx={{ fontSize: '0.85rem' }}>
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1, borderColor: '#F3F4F6' }} />
                  <MenuItem 
                    component={Link}
                    to="/profile"
                    onClick={handleProfileClose}
                    sx={{ 
                      py: 1.5, 
                      px: 2, 
                      borderRadius: '10px', 
                      mx: 1, 
                      mb: 0.5,
                      color: '#111827',
                      transition: 'all 0.2s',
                      '&:hover': { bgcolor: '#F3F4F6' }
                    }}
                  >
                    <ListItemIcon><ManageAccountsIcon fontSize="small" sx={{ color: 'inherit' }} /></ListItemIcon>
                    <Typography fontWeight={600} fontSize="0.95rem">Pengaturan Profil</Typography>
                  </MenuItem>
                  <MenuItem 
                    onClick={handleLogout} 
                    sx={{ 
                      py: 1.5, 
                      px: 2, 
                      borderRadius: '10px', 
                      mx: 1, 
                      mb: 0.5,
                      color: '#EF4444',
                      transition: 'all 0.2s',
                      '&:hover': { bgcolor: '#FEF2F2', color: '#DC2626' }
                    }}
                  >
                    <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: 'inherit' }} /></ListItemIcon>
                    <Typography fontWeight={600} fontSize="0.95rem">Keluar Akun</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button 
                  component={Link} 
                  to="/login"
                  variant="outlined" 
                  disableRipple
                  sx={{ 
                    color: '#111827', 
                    borderColor: '#E5E7EB',
                    fontWeight: 600, 
                    px: 3, 
                    borderRadius: '99px',
                    '&:hover': { bgcolor: '#F9FAFB', borderColor: '#D1D5DB' }
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
                    px: 3, 
                    borderRadius: '99px',
                    '&:hover': { bgcolor: '#000000' }
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
