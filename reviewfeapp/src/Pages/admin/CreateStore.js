import React, { useState } from "react";
import { createStore } from "../../api/adminApi";
import { useSelector } from "react-redux";
import { TextField, Button, Container, Typography, Box, CircularProgress, Grid, Paper, InputAdornment } from "@mui/material";
import { blue, pink, purple, orange, green, yellow, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import StoreIcon from '@mui/icons-material/Store';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

// Custom theme with vibrant colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1', // Blue
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899', // Pink
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    h4: {
      fontSize: '2.25rem',
      fontWeight: 700,
      color: purple[700],
    },
    body1: {
      color: grey[700],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '14px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out, background-color 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#ec4899', // pink hover effect
          },
          '&:disabled': {
            backgroundColor: grey[400],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            backgroundColor: grey[100],
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          },
          '& .MuiInputLabel-root': {
            color: grey[700],
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            borderColor: '#6366f1', // Blue when focused
            backgroundColor: '#f3f4f6',
          },
          '&:hover .MuiOutlinedInput-root': {
            backgroundColor: grey[200],
          },
        },
      },
    },
  },
});

const CreateStorePage = () => {
    const [formData, setFormData] = useState({
        store_name: "",
        email: "",
        address: "",
        owner_email: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { token } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.store_name || !formData.email || !formData.address || !formData.owner_email) {
            setErrorMessage("All fields are required.");
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(formData.email) || !emailRegex.test(formData.owner_email)) {
            setErrorMessage("Please enter valid email addresses.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setErrorMessage("");

        try {
            await createStore(formData, token);
            alert("Store created successfully!");
            setFormData({ store_name: "", email: "", address: "", owner_email: "" });
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Error creating store.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ backgroundColor: grey[50], minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Container maxWidth="sm" sx={{ paddingTop: 8, paddingBottom: 8 }}>
                    <Paper sx={{
                        background: "white", // Clean white background
                        padding: 3,
                        borderRadius: 3,
                        boxShadow: 10, // Deeper shadow for more elevation
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        maxWidth: "500px",
                        margin: "auto",
                        marginTop:'20px',
                        overflow:'hidden'
                    }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: purple[700], marginBottom: 2 }}>
                            Create Your Store
                        </Typography>
                        <Typography variant="body1" sx={{ color: grey[600], marginBottom: 5 }}>
                            Fill in the details to set up your store in our marketplace.
                        </Typography>

                        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <Grid container spacing={2}>
                                {/* Store Name */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Store Name"
                                        name="store_name"
                                        value={formData.store_name}
                                        onChange={handleChange}
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <StoreIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                {/* Store Email */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Store Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                {/* Store Address */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Store Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationOnIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                {/* Owner Email */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Owner Email"
                                        name="owner_email"
                                        value={formData.owner_email}
                                        onChange={handleChange}
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Error Message */}
                            {errorMessage && (
                                <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
                                    {errorMessage}
                                </Typography>
                            )}

                            {/* Submit Button */}
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    padding: "14px",
                                    textTransform: "none",
                                    borderRadius: "20px",
                                    marginTop: 4,
                                    boxShadow: 3,
                                    transition: "transform 0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                    "&:disabled": {
                                        backgroundColor: grey[400],
                                    },
                                }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Create Store"}
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default CreateStorePage;
