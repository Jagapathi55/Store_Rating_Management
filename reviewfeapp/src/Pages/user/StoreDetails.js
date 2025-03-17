import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { submitRating, getAllStores } from "../../api/userApi";
import axios from "axios";
import { useSelector } from "react-redux";
import { Star } from "lucide-react";
import { Box, Button, CircularProgress, Card, CardContent, Typography, Snackbar, Alert } from "@mui/material";
import { deepOrange, teal, grey } from '@mui/material/colors';
import "./styles/StoreDetails.css"; // Custom CSS for extra styling

const StoreDetails = () => {
    const { storeId } = useParams();
    const [store, setStore] = useState(null);
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [userRating, setUserRating] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const userId = useSelector((state) => state?.auth?.user?.id); // Get user ID from Redux

    useEffect(() => {
        fetchStoreDetails();
        checkUserRating();
    }, []);

    // Fetch store details
    const fetchStoreDetails = async () => {
        try {
            const stores = await getAllStores();
            const selectedStore = stores.find((store) => store.id === storeId);
            setStore(selectedStore);
            setLoading(false);
        } catch (err) {
            setError("Error fetching store details.");
            setLoading(false);
        }
    };

    // Check if the user has already rated this store
    const checkUserRating = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/ratings/user/${userId}/${storeId}`);
            if (response.data.userRating) {
                setUserRating(response.data.userRating);
                setRating(response.data.userRating.rating);
            }
        } catch (error) {
            console.error("Error fetching user rating:", error);
        }
    };

    // Submit or modify rating
    const handleRatingSubmit = async () => {
        if (rating < 1 || rating > 5) {
            alert("Please select a valid rating.");
            return;
        }

        try {
            const response = await submitRating(userId, storeId, rating);
            if (response) {
                setSuccessMessage("Rating submitted successfully!");
                setUserRating({ rating });
                checkUserRating(); // Refresh user rating
                fetchStoreDetails(); // Refresh store details
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleStarHover = (value) => {
        setHoveredRating(value);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    if (loading) return <CircularProgress size={50} sx={{ color: deepOrange[500], display: 'block', margin: 'auto', marginTop: 5 }} />;
    if (error) return <Snackbar open={true} autoHideDuration={6000}><Alert severity="error">{error}</Alert></Snackbar>;

    return (
        <Box sx={{ backgroundColor: grey[50], padding: 4, minHeight: "100vh",mt:10 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4, color: deepOrange[600] }}>
                {store?.name} - Store Details
            </Typography>

            <Card sx={{ boxShadow: 3, marginBottom: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Store Information</Typography>
                    <Typography variant="body1"><strong>Address:</strong> {store?.address}</Typography>
                    <Typography variant="body1"><strong>Owner:</strong> {store?.owner_name}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {store?.email}</Typography>
                    <Typography variant="body1"><strong>Average Rating:</strong> {store?.averageRating}</Typography>
                </CardContent>
            </Card>

            <div className="rating-section">
                <Typography variant="h6" sx={{ color: teal[500], marginBottom: 2 }}>Rate this store</Typography>
                
                {userRating && (
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        You previously rated this store: <strong>{userRating.rating} stars</strong>
                    </Typography>
                )}

                <div className="star-rating" onMouseLeave={handleStarLeave}>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                            key={value}
                            size={32}
                            className={`star ${value <= (hoveredRating || rating) ? "filled" : ""}`}
                            onClick={() => handleStarClick(value)}
                            onMouseEnter={() => handleStarHover(value)}
                        />
                    ))}
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRatingSubmit}
                    sx={{ marginTop: 2 }}
                >
                    {userRating ? "Modify Rating" : "Submit Rating"}
                </Button>

                {successMessage && (
                    <Snackbar open={true} autoHideDuration={6000}>
                        <Alert severity="success">{successMessage}</Alert>
                    </Snackbar>
                )}
            </div>
        </Box>
    );
};

export default StoreDetails;
