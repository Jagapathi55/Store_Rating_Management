import React, { useEffect, useState } from "react";
import { fetchAdminDashboard } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Grid, Paper } from "@mui/material";
import { People, Storefront, Star } from '@mui/icons-material';
import { blue, purple, indigo } from '@mui/material/colors';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        total_users: 0,
        total_stores: 0,
        total_ratings: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchAdminDashboard();
                setDashboardData(data);
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            }
        };
        getData();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                background: "white",
                paddingTop: "100px", // To avoid overlap with navbar
                paddingBottom: "50px", // Add bottom padding
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    color: "black",
                    mb: 5,
                }}
            >
                Admin Dashboard
            </Typography>

            {/* Flex Container to hold Cards with spacing */}
            <Box
                display="flex"
                justifyContent="center"
                gap={3}
                flexWrap="wrap"
                sx={{
                    width: "100%",
                    justifyContent: "center", // Center cards on smaller screens
                }}
            >
                {/* Card for Total Users */}
                <Grid item xs={12} sm={4} md={3}>
                    <Card
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
                            backdropFilter: "blur(10px)", // Glassmorphism effect
                            borderRadius: "20px",
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
                            },
                            padding: "20px",
                            maxWidth: "350px",
                            height: "100%",
                        }}
                        onClick={() => navigate("/admin/users")}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography variant="h6" sx={{ fontWeight: 500, color: blue[600] }}>
                                    Total Users
                                </Typography>
                                <People sx={{ color: blue[600], fontSize: "40px" }} />
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 500, mt: 2, color: blue[600] }}>
                                {dashboardData.total_users}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 2, color: "black" }}>
                                Manage users by adding or removing accounts as needed.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card for Total Stores */}
                <Grid item xs={12} sm={4} md={3}>
                    <Card
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "20px",
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
                            },
                            padding: "20px",
                            maxWidth: "350px",
                            height: "100%",
                        }}
                        onClick={() => navigate("/admin/stores")}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography variant="h6" sx={{ fontWeight: 500, color: indigo[600] }}>
                                    Total Stores
                                </Typography>
                                <Storefront sx={{ color: indigo[600], fontSize: "40px" }} />
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 500, mt: 2, color: indigo[600] }}>
                                {dashboardData.total_stores}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 2, color: "black" }}>
                                View all stores, manage and review their performance.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card for Total Ratings */}
                <Grid item xs={12} sm={4} md={3}>
                    <Card
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "20px",
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
                            },
                            padding: "20px",
                            maxWidth: "350px",
                            height: "100%",
                        }}
                        onClick={() => navigate("/admin/ratings")}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography variant="h6" sx={{ fontWeight: 500, color: purple[600] }}>
                                    Total Ratings
                                </Typography>
                                <Star sx={{ color: purple[600], fontSize: "40px" }} />
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 500, mt: 2, color: purple[600] }}>
                                {dashboardData.total_ratings}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 2, color: "black" }}>
                                View ratings and reviews for each store. You can also give ratings to your favourite store.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Box>

            {/* Footer can be added here if required */}
        </Box>
    );
};

export default Dashboard;
