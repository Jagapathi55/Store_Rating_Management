import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { loginSuccess } from '../redux/slices/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await loginUser(email, password);
    if (data.token) {
      dispatch(loginSuccess(data));
      if (data.user.role === 'admin') navigate('/admin/dashboard');
      else if (data.user.role === 'user') navigate('/normal/home');
      else navigate('/store_owner/dashboard');
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        padding: '20px',
        marginTop:'20px'
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 500,
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <CardContent sx={{ padding: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              textAlign: 'center',
              fontWeight: 800,
              color: 'primary.main',
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4,
            }}
          >
            Sign in to continue rating and reviewing stores
          </Typography>

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mb: 3,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '10px',
              }}
            >
              Sign In
            </Button>

            {/* Divider */}
            <Divider sx={{ mb: 3 }}>
              <Typography color="text.secondary">OR</Typography>
            </Divider>

            {/* Create Account Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Don't have an account?
              </Typography>
              <Button
                color="secondary"
                LinkComponent={Link}
                to='/signup'
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Create an Account
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
