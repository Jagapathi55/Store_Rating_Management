import React from 'react';
import { 
  AppBar, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Grid, 
  IconButton, 
  Rating, 
  ThemeProvider, 
  Toolbar, 
  Typography, 
  createTheme 
} from '@mui/material';
import { Store, Star, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom theme with modern color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1', // Modern indigo
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899', // Modern pink
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#ffffff',
      paper: '#f9fafb',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    h1: {
      fontSize: '3.75rem',
      fontWeight: 800,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

const features = [
  {
    icon: <Store size={32} />,
    title: 'Discover Stores',
    description: 'Find and explore the best local and online stores in your area.',
  },
  {
    icon: <Star size={32} />,
    title: 'Rate & Review',
    description: 'Share your shopping experiences and help others make informed decisions.',
  },
  {
    icon: <Users size={32} />,
    title: 'Community Driven',
    description: 'Join thousands of shoppers sharing authentic, verified reviews.',
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'Business Insights',
    description: 'Store owners can track performance metrics and improve customer satisfaction.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Store Owner',
    rating: 5,
    comment: 'RateMyStore transformed how I understand and respond to customer feedback.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'Regular Shopper',
    rating: 5,
    comment: 'The perfect platform for discovering trustworthy stores and sharing experiences.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
  },
];

function LandingPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Navigation */}
        <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px)', bgcolor: 'rgba(255,255,255,0.8)' }}>
          <Toolbar sx={{ py: 1 }}>
            
           
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black', fontWeight: 700 }}>
            <IconButton LinkComponent={Link} to='/'>
              RateMyStore
            </IconButton>
            </Typography>
            <Box display={'flex'}>
            <Button color="inherit" sx={{ marginLeft:'auto' }} LinkComponent={Link} to='/login'>Login</Button>
            <Button variant="contained" color="primary" LinkComponent={Link} to='/signup' >
              SignUp
            </Button>
            </Box>
            
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            pt: 15,
            pb: 12,
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h1" sx={{ color: 'white', mb: 3 }}>
                  Rate. Review.
                  <br />
                  Discover Excellence.
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4, fontWeight: 400 }}>
                  Join our community of shoppers sharing authentic experiences and discovering outstanding stores.
                </Typography>
                <Box display={'flex'}>
                <Button 
                  variant="contained" 
                  color="secondary"
                  size="large"
                  LinkComponent = {Link}
                  to='/signup'
                  sx={{ mr: 2, px: 4 }}
                >
                  Get Started
                </Button>
               
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Shopping Experience"
                  sx={{
                    width: '100%',
                    borderRadius: '24px',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 12 }}>
          <Typography variant="h2" textAlign="center" sx={{ mb: 2 }}>
            Why Choose RateMyStore?
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}>
            Discover the features that make our platform the go-to destination for store reviews and ratings.
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Card sx={{ height: '100%', bgcolor: index % 2 === 0 ? 'background.paper' : 'primary.main' }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ color: index % 2 === 0 ? 'primary.main' : 'white', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, color: index % 2 === 0 ? 'text.primary' : 'white' }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ color: index % 2 === 0 ? 'text.secondary' : 'rgba(255,255,255,0.8)' }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Testimonials Section */}
        <Box sx={{ bgcolor: 'background.paper', py: 12 }}>
          <Container maxWidth="lg">
            <Typography variant="h2" textAlign="center" sx={{ mb: 8 }}>
              What Our Users Say
            </Typography>
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box
                          component="img"
                          src={testimonial.image}
                          alt={testimonial.name}
                          sx={{ width: 60, height: 60, borderRadius: '50%', mr: 2 }}
                        />
                        <Box>
                          <Typography variant="h6">{testimonial.name}</Typography>
                          <Typography color="text.secondary">{testimonial.role}</Typography>
                        </Box>
                      </Box>
                      <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        "{testimonial.comment}"
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Join thousands of users who are already discovering and rating the best stores in their area.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }} LinkComponent={Link} to='/signup'>
            Sign Up Now
          </Button>
          
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LandingPage;