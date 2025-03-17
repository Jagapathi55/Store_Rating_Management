import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchStoreDetails, fetchAverageRating, fetchStoreRatings } from "../../api/storeOwnerApi";
import { Box, Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import { deepOrange, grey, teal } from '@mui/material/colors';

const StoreOwnerDashboard = () => {
    const [store, setStore] = useState(null);
    const [averageRating, setAverageRating] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user, token } = useSelector((state) => state.auth); // Get user & token from Redux
    const userId = user?.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId || !token) {
                    setError("User not authenticated.");
                    setLoading(false);
                    return;
                }

                const storeData = await fetchStoreDetails(userId);
                setStore(storeData);

                const avgRating = await fetchAverageRating();
                setAverageRating(avgRating.averageRating || "No Ratings Yet");

                const storeRatings = await fetchStoreRatings(storeData.id);
                setRatings(storeRatings);

                setLoading(false);
            } catch (err) {
                setError("Failed to fetch store details.");
                setLoading(false);
            }
        };

        fetchData();
    }, [userId, token]);

    if (loading) return <CircularProgress size={50} sx={{ color: deepOrange[500], display: 'block', margin: 'auto', marginTop: 5 }} />;
    if (error) return <Typography variant="body1" color="error" sx={{ textAlign: 'center', marginTop: 5 }}>{error}</Typography>;

    return (
        <Box sx={{ backgroundColor: grey[50], minHeight: "100vh", padding: 4 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4, color: deepOrange[600] }}>
                Store Owner Dashboard
            </Typography>

            {/* Store Details Section */}
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Store Name</Typography>
                            <Typography variant="body1">{store?.name}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Location</Typography>
                            <Typography variant="body1">{store?.address}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Average Rating</Typography>
                            <Typography variant="body1">{averageRating}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Ratings Section */}
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6" sx={{ color: grey[700], marginBottom: 2 }}>
                    Ratings Received
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: teal[100] }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: grey[700] }}>Rating ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: grey[700] }}>User Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: grey[700] }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: grey[700] }}>Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ratings.length > 0 ? (
                                ratings.map((rating) => (
                                    <TableRow key={rating.userId} sx={{ '&:hover': { backgroundColor: grey[100] } }}>
                                        <TableCell>{rating.userId}</TableCell>
                                        <TableCell>{rating.name}</TableCell>
                                        <TableCell>{rating.email}</TableCell>
                                        <TableCell>{rating.rating}</TableCell>
                                    </TableRow>
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
            </Box>
        </Box>
    );
};

export default StoreOwnerDashboard;
