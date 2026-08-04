const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET /api/wallet/balance/:id
// @desc    Get user's wallet balance
// @access  Public (for now)
router.get('/balance/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            walletBalance: user.walletBalance
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

// @route   POST /api/wallet/deposit
// @desc    Add money to wallet
// @access  Public (for now)
router.post('/deposit', async (req, res) => {
    try {
        const { userId, amount } = req.body;

        if (!userId || !amount) {
            return res.status(400).json({
                success: false,
                message: 'User ID and amount are required'
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.walletBalance += Number(amount);

        await user.save();

        res.json({
            success: true,
            message: 'Wallet funded successfully',
            walletBalance: user.walletBalance
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

module.exports = router;
