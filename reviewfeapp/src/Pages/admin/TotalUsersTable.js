import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../api/adminApi";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Box } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { deepOrange, grey, teal } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Custom theme for consistency
const theme = createTheme({
    palette: {
        primary: {
            main: deepOrange[500], // Deep Orange
        },
        secondary: {
            main: teal[400], // Teal for secondary actions
        },
        background: {
            default: '#F5F5F5',
        },
        text: {
            primary: grey[900],
            secondary: grey[600],
        },
    },
    typography: {
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        h4: {
            fontSize: '2.25rem',
            fontWeight: 700,
            color: deepOrange[600],
        },
        body1: {
            color: grey[700],
        },
    },
});

const TotalUsersTable = () => {
    const [users, setUsers] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };
        getData();
    }, []);

    const handleSort = (column) => {
        let order = sortOrder === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortOrder(order);

        const sortedUsers = [...users].sort((a, b) => {
            if (typeof a[column] === "string") {
                return order === "asc"
                    ? a[column].localeCompare(b[column])
                    : b[column].localeCompare(a[column]);
            } else {
                return order === "asc" ? (a[column] || 0) - (b[column] || 0) : (b[column] || 0) - (a[column] || 0);
            }
        });

        setUsers(sortedUsers);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ backgroundColor: grey[50], minHeight: "100vh", padding: 4,mt:10 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4, fontWeight: 700 }}>
                    All Users
                </Typography>
                <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: deepOrange[100] }}>
                                {["ID", "Name", "Email", "Role", "Avg Rating"].map((column, index) => (
                                    <TableCell
                                        key={index}
                                        sx={{
                                            fontWeight: 'bold',
                                            color: grey[700],
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            padding: '16px',
                                            fontSize: '1rem',
                                            '&:hover': {
                                                backgroundColor: deepOrange[200],
                                            },
                                        }}
                                        onClick={() => handleSort(column.toLowerCase().replace(' ', '_'))}
                                    >
                                        {column}
                                        {sortColumn === column.toLowerCase().replace(' ', '_') && (
                                            <IconButton size="small" sx={{ color: grey[700], marginLeft: 1 }}>
                                                {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
                                            </IconButton>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: grey[100] } }}>
                                        <TableCell sx={{ padding: '16px' }}>{user.id}</TableCell>
                                        <TableCell sx={{ padding: '16px' }}>{user.name}</TableCell>
                                        <TableCell sx={{ padding: '16px' }}>{user.email}</TableCell>
                                        <TableCell sx={{ padding: '16px' }}>{user.role}</TableCell>
                                        <TableCell sx={{ padding: '16px' }}>{user.avg_rating || "N/A"}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} sx={{ textAlign: 'center', color: grey[600], fontStyle: 'italic', padding: '16px' }}>
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </ThemeProvider>
    );
};

export default TotalUsersTable;
