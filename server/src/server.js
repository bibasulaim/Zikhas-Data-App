require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();


// Connect Database
connectDB();


// Middleware
app.use(express.json());


// Routes
const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const vtuRoutes = require("./routes/vtu");
const transactionRoutes = require("./routes/transactions");


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/vtu", vtuRoutes);
app.use("/api/transactions", transactionRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Zikhas Data App Server is running smoothly 🚀");
});


// Server Port
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Running perfectly on port ${PORT}`);
});
