import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          My App
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/users">Users</Button>
              <Button color="inherit" component={Link} to="/products">Products</Button>

              <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Halo, {user?.name}!
                </Typography>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  onClick={handleMenu}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem disabled>Role: {user?.role}</MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <Box sx={{ ml: 2 }}>
              <Button color="inherit" component={Link} to="/login" sx={{ mr: 1 }}>
                Login
              </Button>
              <Button variant="contained" color="secondary" component={Link} to="/register">
                Daftar
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
