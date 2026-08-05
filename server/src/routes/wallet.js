const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Transaction = require("../models/Transaction");

// ===============================
// Get Wallet Balance
// ===============================
router.get("/balance/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      walletBalance: user.walletBalance,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ===============================
// Fund Wallet
// ===============================
router.post("/deposit", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({
        success: false,
        message: "User ID and amount are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update wallet balance
    user.walletBalance += Number(amount);
    await user.save();

    // Save transaction
    await Transaction.create({
      userId: user._id,
      type: "Wallet Funding",
      amount: Number(amount),
      status: "successful",
    });

    res.json({
      success: true,
      message: "Wallet funded successfully",
      walletBalance: user.walletBalance,
    });

  } catch (error) {
    console.error("Wallet Deposit Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
