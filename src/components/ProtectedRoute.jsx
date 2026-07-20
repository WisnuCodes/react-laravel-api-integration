import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, isLoggedIn, loading } = useAuth();

  // Tampilkan loading jika status autentikasi masih dimuat
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Jika belum login, redirect ke halaman login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada role yang diizinkan dan role user saat ini tidak ada di dalamnya, redirect ke forbidden
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  // Jika aman, render child routes (menggunakan Outlet)
  return <Outlet />;
}
