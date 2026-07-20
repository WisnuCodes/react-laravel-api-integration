import { useState } from 'react';
import { keyframes } from '@mui/system';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Button, 
  IconButton, 
  Badge, 
  Avatar, 
  MenuItem,
  MenuList,
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

const dropInCenter = keyframes`
  0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0); }
`;

const dropInRight = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

export default function TopNav() {
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();
  const { itemCount } = useCart();
  const { wishlistItems } = useWishlist();

  const isBuyer = isLoggedIn && user?.role === 'buyer';
  const isAdmin = isLoggedIn && user?.role === 'admin';
  const isSeller = isLoggedIn && user?.role === 'seller';

  const { data: categories } = useFetch('/categories', [], 300000);

  const [openProduk, setOpenProduk] = useState(false);
  const [openAkun, setOpenAkun] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <AppBar 
      position="fixed" 
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
          <Box 
            onMouseEnter={() => setOpenProduk(true)} 
            onMouseLeave={() => setOpenProduk(false)}
            onClick={() => setOpenProduk(false)}
            sx={{ position: 'relative' }}
          >
            <Button 
              disableRipple
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
            {openProduk && (
              <Box sx={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', pt: 1.5, zIndex: 9999, animation: `${dropInCenter} 0.15s ease-out` }}>
                <MenuList sx={{ minWidth: 260, borderRadius: '12px', border: '1px solid #E5E7EB', bgcolor: '#fff', boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.15), 0 10px 20px -15px rgba(22, 23, 24, 0.1)', p: 1 }}>
                  <MenuItem component={Link} to="/products" sx={{ p: 1, borderRadius: '6px', transition: 'all 0.1s', '&:hover': { bgcolor: '#F3F4F6' } }}>
                    <Box sx={{ color: '#4B5563', mr: 1.5, display: 'flex', alignItems: 'center' }}>
                      <CategoryIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography fontWeight={600} fontSize="0.85rem" sx={{ color: '#111827' }}>Semua Produk</Typography>
                      <Typography variant="body2" color="#6B7280" fontSize="0.75rem">Lihat katalog lengkap</Typography>
                    </Box>
                  </MenuItem>
                  <Divider sx={{ my: 1, borderColor: '#F3F4F6' }} />
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <MenuItem key={cat.id} component={Link} to={`/products?category=${cat.id}`} sx={{ p: 1, borderRadius: '6px', transition: 'all 0.1s', '&:hover': { bgcolor: '#F3F4F6' } }}>
                        <Typography fontWeight={500} fontSize="0.85rem" sx={{ color: '#111827', ml: 4 }}>{cat.name}</Typography>
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled sx={{ p: 1, borderRadius: '6px' }}>
                      <Typography fontWeight={500} fontSize="0.85rem" sx={{ ml: 4 }}>Memuat...</Typography>
                    </MenuItem>
                  )}
                </MenuList>
              </Box>
            )}
          </Box>

          {/* 3. Akun & Manajemen (Dropdown Menu - Only if Logged In) */}
          {isLoggedIn && (
            <Box 
              onMouseEnter={() => setOpenAkun(true)}
              onMouseLeave={() => setOpenAkun(false)}
              onClick={() => setOpenAkun(false)}
              sx={{ position: 'relative' }}
            >
              <Button 
                disableRipple
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
              {openAkun && (
                <Box sx={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', pt: 1.5, zIndex: 9999, animation: `${dropInCenter} 0.15s ease-out` }}>
                  <MenuList sx={{ minWidth: 260, borderRadius: '12px', border: '1px solid #E5E7EB', bgcolor: '#fff', boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.15), 0 10px 20px -15px rgba(22, 23, 24, 0.1)', p: 1 }}>
                    <Box sx={{ px: 1, py: 0.5, mb: 0.5 }}>
                      <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 600 }}>Aktivitas Anda</Typography>
                    </Box>
                    
                    {/* Buyer Links */}
                    {isBuyer && (
                      <>
                        <MenuItem component={Link} to="/library" sx={{ p: 1, borderRadius: '6px', mb: 0.5, transition: 'all 0.1s', '&:hover': { bgcolor: '#F3F4F6' } }}>
                          <Box sx={{ color: '#4B5563', mr: 1.5, display: 'flex', alignItems: 'center' }}><FolderSpecialIcon fontSize="small" /></Box>
                          <Box>
                            <Typography fontWeight={600} fontSize="0.85rem" sx={{ color: '#111827' }}>My Library</Typography>
                            <Typography variant="body2" color="#6B7280" fontSize="0.75rem">Akses produk digital</Typography>
                          </Box>
                        </MenuItem>
                        <MenuItem component={Link} to="/orders" sx={{ p: 1, borderRadius: '6px', mb: 0.5, transition: 'all 0.1s', '&:hover': { bgcolor: '#F3F4F6' } }}>
                          <Box sx={{ color: '#4B5563', mr: 1.5, display: 'flex', alignItems: 'center' }}><StorefrontIcon fontSize="small" /></Box>
                          <Box>
                            <Typography fontWeight={600} fontSize="0.85rem" sx={{ color: '#111827' }}>Pesanan Saya</Typography>
                            <Typography variant="body2" color="#6B7280" fontSize="0.75rem">Riwayat transaksi</Typography>
                          </Box>
                        </MenuItem>
                        <MenuItem component={Link} to="/following" sx={{ p: 1, borderRadius: '6px', transition: 'all 0.1s', '&:hover': { bgcolor: '#F3F4F6' } }}>
                          <Box sx={{ color: '#4B5563', mr: 1.5, display: 'flex', alignItems: 'center' }}><PeopleOutlinedIcon fontSize="small" /></Box>
                          <Box>
                            <Typography fontWeight={600} fontSize="0.85rem" sx={{ color: '#111827' }}>Kreator Diikuti</Typography>
                            <Typography variant="body2" color="#6B7280" fontSize="0.75rem">Daftar toko favorit</Typography>
                          </Box>
                        </MenuItem>
                      </>
                    )}

                    {/* Seller / Admin Links */}
                    {isSeller && (
                      <>
                        <Divider sx={{ my: 1, borderColor: '#F3F4F6' }} />
                        <MenuItem component={Link} to="/seller/dashboard" sx={{ p: 1, borderRadius: '6px', transition: 'all 0.1s', '&:hover': { bgcolor: '#F3F4F6' } }}>
                          <Box sx={{ color: '#4B5563', mr: 1.5, display: 'flex', alignItems: 'center' }}><DashboardIcon fontSize="small" /></Box>
                          <Box>
                            <Typography fontWeight={600} fontSize="0.85rem" sx={{ color: '#111827' }}>Dasbor Seller</Typography>
                            <Typography variant="body2" color="#6B7280" fontSize="0.75rem">Kelola toko Anda</Typography>
                          </Box>
                        </MenuItem>
                      </>
                    )}
                    {isAdmin && (
                      <>
                        <Divider sx={{ my: 1, borderColor: '#F3F4F6' }} />
                        <MenuItem component={Link} to="/admin/dashboard" sx={{ p: 1, borderRadius: '6px', mb: 0.5, transition: 'all 0.1s', '&:hover': { bgcolor: '#F3F4F6' } }}>
                          <Box sx={{ color: '#4B5563', mr: 1.5, display: 'flex', alignItems: 'center' }}><DashboardIcon fontSize="small" /></Box>
                          <Box>
                            <Typography fontWeight={600} fontSize="0.85rem" sx={{ color: '#111827' }}>Dasbor Admin</Typography>
                            <Typography variant="body2" color="#6B7280" fontSize="0.75rem">Pusat kendali</Typography>
                          </Box>
                        </MenuItem>
                        <MenuItem component={Link} to="/users" sx={{ p: 1, borderRadius: '6px', transition: 'all 0.1s', '&:hover': { bgcolor: '#F3F4F6' } }}>
                          <Box sx={{ color: '#4B5563', mr: 1.5, display: 'flex', alignItems: 'center' }}><PersonIcon fontSize="small" /></Box>
                          <Box>
                            <Typography fontWeight={600} fontSize="0.85rem" sx={{ color: '#111827' }}>Kelola Pengguna</Typography>
                            <Typography variant="body2" color="#6B7280" fontSize="0.75rem">Daftar semua akun</Typography>
                          </Box>
                        </MenuItem>
                      </>
                    )}
                  </MenuList>
                </Box>
              )}
            </Box>
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
              <Box 
                onMouseEnter={() => setOpenProfile(true)}
                onMouseLeave={() => setOpenProfile(false)}
                onClick={() => setOpenProfile(false)}
                sx={{ position: 'relative' }}
              >
                <IconButton 
                  sx={{ p: 0.5, border: '2px solid transparent', '&:hover': { borderColor: '#E5E7EB' }, transition: 'all 0.2s', ml: 1 }}
                >
                  <Avatar sx={{ width: 40, height: 40, bgcolor: '#111827', fontSize: '1.1rem', fontWeight: 700 }}>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </IconButton>
                {openProfile && (
                  <Box sx={{ position: 'absolute', top: '100%', right: 0, pt: 1.5, zIndex: 9999, animation: `${dropInRight} 0.15s ease-out` }}>
                    <MenuList sx={{ minWidth: 240, borderRadius: '12px', border: '1px solid #E5E7EB', bgcolor: '#fff', boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.15), 0 10px 20px -15px rgba(22, 23, 24, 0.1)', p: 1 }}>
                      <Box sx={{ px: 1, py: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: '#111827', color: '#fff', fontWeight: 600, fontSize: '1rem' }}>
                          {user?.name?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <Box sx={{ overflow: 'hidden' }}>
                          <Typography variant="subtitle2" fontWeight={600} noWrap sx={{ color: '#111827', lineHeight: 1.2 }}>
                            {user?.name}
                          </Typography>
                          <Typography variant="body2" color="#6B7280" noWrap sx={{ fontSize: '0.75rem' }}>
                            {user?.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ my: 1, borderColor: '#F3F4F6' }} />
                      <MenuItem 
                        component={Link} 
                        to="/profile" 
                        sx={{ p: 1, borderRadius: '6px', mb: 0.5, transition: 'all 0.1s', '&:hover': { bgcolor: '#F3F4F6' } }}
                      >
                        <Box sx={{ color: '#4B5563', mr: 1.5, display: 'flex', alignItems: 'center' }}><ManageAccountsIcon fontSize="small" /></Box>
                        <Typography fontWeight={500} fontSize="0.85rem" sx={{ color: '#111827' }}>Pengaturan Profil</Typography>
                      </MenuItem>
                      <MenuItem 
                        onClick={logout} 
                        sx={{ p: 1, borderRadius: '6px', transition: 'all 0.1s', '&:hover': { bgcolor: '#F3F4F6' } }}
                      >
                        <Box sx={{ color: '#4B5563', mr: 1.5, display: 'flex', alignItems: 'center' }}><LogoutIcon fontSize="small" /></Box>
                        <Typography fontWeight={500} fontSize="0.85rem" sx={{ color: '#111827' }}>Keluar Akun</Typography>
                      </MenuItem>
                    </MenuList>
                  </Box>
                )}
              </Box>
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
