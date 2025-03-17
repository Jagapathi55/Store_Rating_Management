const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./routes/storeRoutes");
const adminRoutes = require("./routes/adminRoutes");
// const ratingRoutes = require("./routes/ratingRoutes");
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// console.log("userRoutes",require("./routes/userRoutes")); // Debugging
// console.log("storeRoutes",require("./routes/storeRoutes")); // Debugging
// console.log("adminRoutes",require("./routes/adminRoutes")); // Debugging
// console.log("ratingRoutes",require("./routes/ratingRoutes")); // Debugging
// Routes
app.use("/api/users", userRoutes);  // ✅ Should be directly used
app.use("/api/stores", storeRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api/ratings",ratingRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
