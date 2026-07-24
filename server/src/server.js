const express = require('express');
const app = express();
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth');
const vtuRoutes = require('./routes/vtu'); // 👈 Added VTU route import

// Link API Routes Middleware
app.use('/api/auth', authRoutes);
app.use('/api/vtu', vtuRoutes); // 👈 Added VTU middleware routing

app.get('/', (req, res) => {
    res.send("Zikhas Data App Server is running smoothly!");
});

app.listen(5000, () => {
    console.log("Running perfectly on port 5000");
});
