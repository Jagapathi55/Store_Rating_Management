import React, { useState } from "react";
import { createUser } from "../../api/adminApi";
import { useSelector } from "react-redux";
import { TextField, Button, Container, Typography, Box, CircularProgress, Grid, Paper, MenuItem, Select, InputLabel, FormControl, InputAdornment } from "@mui/material";
import { purple, blue, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';

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

const CreateUserPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", address: "", role: "normal" });
    const { user, token } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(formData, token);
            alert("User created successfully!");
            setFormData({ name: "", email: "", password: "", address: "", role: "normal" });
        } catch (error) {
            alert(error.response?.data?.message || "Error creating user");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ backgroundColor: grey[50], display: "flex", flexDirection: "column", justifyContent: "center", marginTop:'20px' }}>
                <Container maxWidth="sm" sx={{ paddingTop: 8, paddingBottom: 8 }}>
                    <Paper sx={{
                        background: "white",
                        padding: 3,
                        borderRadius: 3,
                        boxShadow: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        maxWidth: "500px",
                        margin: "auto",
                    }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: purple[700], marginBottom: 1 }}>
                            Create User
                        </Typography>
                        <Typography variant="body1" sx={{ color: grey[600], marginBottom: 1 }}>
                            Fill in the details to create a new user.
                        </Typography>

                        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <Grid container spacing={2}>
                                {/* Name */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={formData.name}
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

                                {/* Email */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
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

                                {/* Password */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                {/* Address */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Address"
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

                                {/* Role */}
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined" margin="normal" required>
                                        <InputLabel>Role</InputLabel>
                                        <Select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            label="Role"
                                        >
                                            <MenuItem value="normal">Normal User</MenuItem>
                                            <MenuItem value="store_owner">Store Owner</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

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
                                    marginTop: 1,
                                    boxShadow: 3,
                                    transition: "transform 0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                    "&:disabled": {
                                        backgroundColor: grey[400],
                                    },
                                }}
                            >
                                {false ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Create User"}
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default CreateUserPage;
