import React, { useState } from 'react';
import { signupUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, TextField, Button, Typography, InputAdornment, Divider } from '@mui/material';
import { Mail, Lock } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = await signupUser(name, email, password, address);
    if (data?.user?.id) navigate('/login');
    else alert('Signup Failed');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 70px)', // Subtracting the height of the navbar (70px)
        
        marginTop: '70px', // Ensuring space for the navbar
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', // Background color restored
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 500,
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: 1,
          overflow: 'hidden', // Preventing overflow
          marginTop:'10px',
          maxHeight:'650px'
        }}
      >
        <CardContent>
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
            Create an Account
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 1,
            }}
          >
            Sign up to rate and review stores
          </Typography>

          <form onSubmit={handleSignup}>
            {/* Name Field */}
            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 1.5 }}
            />

            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 1.5 }}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 1.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Address Field */}
            <TextField
              fullWidth
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ mb: 1.5 }}
            />

            {/* Signup Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mb: 1,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '10px',
              }}
            >
              Sign Up
            </Button>

            {/* Divider */}
            <Divider sx={{ mb: 1 }}>
              <Typography color="text.secondary">OR</Typography>
            </Divider>

            {/* Login Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ }}>
                Already have an account?
              </Typography>
              <Button
                color="secondary"
                LinkComponent="a"
                href="/login"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Login
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
