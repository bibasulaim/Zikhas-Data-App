const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/auth");
const vtuRoutes = require("./routes/vtu");
const walletRoutes = require("./routes/wallet");

app.use("/api/auth", authRoutes);
app.use("/api/vtu", vtuRoutes);
app.use("/api/wallet", walletRoutes);

app.get("/", (req, res) => {
  res.send("Zikhas Data App Server is running smoothly");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Running perfectly on port ${PORT}`);
});
