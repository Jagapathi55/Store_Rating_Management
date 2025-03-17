import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useTheme } from '@mui/material'; 
import { Menu } from '@mui/icons-material';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const userRole = useSelector(state => state?.auth?.user?.role);
  const dispatch = useDispatch();
  const theme = useTheme(); // Use theme from MUI

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: 'blur(8px)',
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: scrolled ? 2 : 0,
        py: 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: 'black',
            fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
            fontWeight: 700,
          }}
        >
          <IconButton LinkComponent={Link} to="/" sx={{ color: 'inherit' }}>
            RateMyStore
          </IconButton>
        </Typography>

        {/* Mobile menu toggle */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
          sx={{ display: { md: 'none' } }}
        >
          <Menu />
        </IconButton>

        {/* Navbar Links */}
        <Box
          sx={{
            display: { xs: isOpen ? 'block' : 'none', md: 'flex' },
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            marginLeft: 'auto',
            gap: 2,
          }}
        >
          {userRole === 'admin' && (
            <>
              <Button component={Link} to="/admin/dashboard" color="inherit" sx={{ fontWeight: 600 }}>
                Dashboard
              </Button>
              <Button component={Link} to="/admin/users" color="inherit" sx={{ fontWeight: 600 }}>
                Users
              </Button>
              <Button component={Link} to="/admin/stores" color="inherit" sx={{ fontWeight: 600 }}>
                Stores
              </Button>
              <Button component={Link} to="/admin/ratings" color="inherit" sx={{ fontWeight: 600 }}>
                Ratings
              </Button>
              <Button component={Link} to="/admin/create-user" color="inherit" sx={{ fontWeight: 600 }}>
                Create User
              </Button>
              <Button component={Link} to="/admin/create-store" color="inherit" sx={{ fontWeight: 600 }}>
                Create Store
              </Button>
            </>
          )}

          {userRole === 'store_owner' && (
            <Button component={Link} to="/store_owner/dashboard" color="inherit" sx={{ fontWeight: 600 }}>
              Dashboard
            </Button>
          )}

          {userRole === 'normal' && (
            <Button component={Link} to="/normal/dashboard" color="inherit" sx={{ fontWeight: 600 }}>
              Home
            </Button>
          )}

          {userRole?.length > 0 && (
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{
                fontWeight: 600,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '8px',
                padding: '6px 16px',
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
