import React, { useState, useEffect } from "react";
import { getAllStores, searchStores } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Button,
  InputBase,
  IconButton,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  Paper,
  createTheme,
  ThemeProvider
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// MUI Theme customization for orange color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5722", // Orange color
    },
    secondary: {
      main: "#ff9800", // Light Orange for accents
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#333",
    },
    h6: {
      fontWeight: 600,
      color: "#333",
    },
  },
});

const HomePage = () => {
  const [stores, setStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    setLoading(true);
    const data = await getAllStores();
    setStores(data);
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    if (searchQuery.trim() === "") {
      fetchStores(); // Show all stores if search is empty
    } else {
      const data = await searchStores(searchQuery);
      setStores(data);
    }
    setLoading(false);
  };

  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);

    const sortedStores = [...stores].sort((a, b) => {
      if (typeof a[column] === "string") {
        return order === "asc"
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      } else {
        return order === "asc" ? a[column] - b[column] : b[column] - a[column];
      }
    });

    setStores(sortedStores);
  };

  const handleStoreClick = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" ,marginTop:60}}>
        <Typography variant="h4" gutterBottom>
          Store Listing
        </Typography>

        {/* Search Bar */}
        <Grid container justifyContent="center" spacing={2} mb={4}>
          <Grid item>
            <InputBase
              placeholder="Search stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                padding: "10px 20px",
                borderRadius: "25px",
                border: "1px solid #ccc",
                width: "300px",
              }}
            />
          </Grid>
          <Grid item>
            <IconButton
              onClick={handleSearch}
              sx={{
                backgroundColor: "#ff5722", // Orange
                color: "white",
                borderRadius: "50%",
                padding: "10px",
              }}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Loading Spinner */}
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortColumn === "name"}
                      direction={sortOrder}
                      onClick={() => handleSort("name")}
                    >
                      Name
                      {sortColumn === "name" && (sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortColumn === "address"}
                      direction={sortOrder}
                      onClick={() => handleSort("address")}
                    >
                      Address
                      {sortColumn === "address" && (sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortColumn === "owner_name"}
                      direction={sortOrder}
                      onClick={() => handleSort("owner_name")}
                    >
                      Owner
                      {sortColumn === "owner_name" && (sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortColumn === "email"}
                      direction={sortOrder}
                      onClick={() => handleSort("email")}
                    >
                      Email
                      {sortColumn === "email" && (sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortColumn === "averageRating"}
                      direction={sortOrder}
                      onClick={() => handleSort("averageRating")}
                    >
                      Rating
                      {sortColumn === "averageRating" && (sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stores.length > 0 ? (
                  stores.map((store) => (
                    <TableRow hover key={store.id}>
                      <TableCell>{store.name}</TableCell>
                      <TableCell>{store.address}</TableCell>
                      <TableCell>{store.owner_name}</TableCell>
                      <TableCell>{store.email}</TableCell>
                      <TableCell>{store.averageRating}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleStoreClick(store.id)}
                          sx={{
                            backgroundColor: "#ff5722",
                            "&:hover": {
                              backgroundColor: "#e64a19", // Darker orange on hover
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No stores found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
