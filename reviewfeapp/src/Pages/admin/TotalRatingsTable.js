import React, { useState, useEffect } from "react";
import { fetchRatings } from "../../api/adminApi";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Box } from "@mui/material";
import { Store, Star, Users, TrendingUp } from 'lucide-react';  // Just an example if needed
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { grey, deepOrange, teal } from '@mui/material/colors';

// Custom theme based on LandingPage.js theme
const theme = createTheme({
    palette: {
        primary: {
            main: deepOrange[500], // Deep Orange
            light: deepOrange[300],
            dark: deepOrange[700],
        },
        secondary: {
            main: teal[300], // Bright Teal
            light: teal[200],
            dark: teal[500],
        },
        background: {
            default: '#ffffff',
            paper: '#f9fafb',
        },
        text: {
            primary: grey[900],
            secondary: grey[600],
        },
    },
    typography: {
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 800,
        },
        h4: {
            fontSize: '2.25rem',
            fontWeight: 700,
            color: deepOrange[600],
        },
        body1: {
            color: grey[700],
        },
    },
    components: {
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '16px',
                    textAlign: 'left',
                    borderBottom: `1px solid ${grey[300]}`,
                    fontSize: '1rem',
                    fontWeight: 400,
                    color: grey[700],
                    borderRight: `1px solid ${grey[200]}`,
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: deepOrange[100], // Soft orange for header
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(even)': {
                        backgroundColor: grey[50],
                    },
                    '&:hover': {
                        backgroundColor: teal[100], // Soft teal hover effect
                        cursor: 'pointer',
                    },
                    transition: 'background-color 0.3s ease',
                },
            },
        },
    },
});

const TotalRatingsTable = () => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRatings = async () => {
            try {
                const data = await fetchRatings();
                setRatings(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch ratings.");
                setLoading(false);
            }
        };

        getRatings();
    }, []);

    if (loading) return <CircularProgress size={50} sx={{ color: deepOrange[500], display: 'block', margin: 'auto', marginTop: 5 }} />;
    if (error) return <Typography variant="body1" color="error" sx={{ textAlign: 'center', marginTop: 5 }}>{error}</Typography>;

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ backgroundColor: grey[50], minHeight: "100vh", padding: 4 ,mt:10}}>
                <Typography variant="h4" sx={{ textAlign: 'center', color: deepOrange[600], marginBottom: 4 }}>
                    Total Ratings
                </Typography>
                <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: grey[700], textTransform: 'uppercase' }}>Store Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: grey[700], textTransform: 'uppercase' }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: grey[700], textTransform: 'uppercase' }}>Rating Value</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: grey[700], textTransform: 'uppercase' }}>Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ratings.length > 0 ? (
                                ratings.map((store, index) => (
                                    store.ratings.map((rat, i) => (
                                        <TableRow key={`${index}-${i}`}>
                                            <TableCell>{store.store_name}</TableCell>
                                            <TableCell>{store.store_email}</TableCell>
                                            <TableCell>{rat.rating}</TableCell>
                                            <TableCell>{new Date(rat.created_at).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} sx={{ textAlign: 'center', color: grey[600], fontStyle: 'italic' }}>
                                        No ratings found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                    <Typography variant="body2" sx={{ color: grey[500] }}>
                        * All ratings are listed based on creation time.
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default TotalRatingsTable;
