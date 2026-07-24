const express = require('express');
const router = express.Router();

// @route   GET /api/vtu/test
// @desc    Test VTU route works
// @access  Public
router.get('/test', (req, res) => {
    res.json({ message: "VTU route is working properly!" });
});

// @route   POST /api/vtu/recharge
// @desc    Process a Virtual Top-Up transaction (Airtime/Data)
// @access  Public
router.post('/recharge', async (req, res) => {
    try {
        const { phoneNumber, network, amount, type } = req.body;

        // 1. Basic validation check
        if (!phoneNumber || !network || !amount || !type) {
            return res.status(400).json({ 
                message: "Please provide phone number, network, amount, and type." 
            });
        }

        // TODO: Integrate your preferred VTU API provider here (e.g., VTpass, Clubkonnect, Monnify, etc.)

        // 2. Mock successful response for testing
        res.status(200).json({
            success: true,
            message: `Initiated ${type} top-up of ₦${amount} to ${phoneNumber} (${network})`,
            transactionId: `TXN-${Date.now()}`
        });

    } catch (error) {
        console.error("VTU Error:", error);
        res.status(500).json({ message: "Server error processing VTU request" });
    }
});

// Crucial: Export the router so server.js can find your endpoints
module.exports = router;
