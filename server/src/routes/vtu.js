const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Transaction = require("../models/Transaction");

// Test Route
router.get("/test", (req, res) => {
  res.json({ message: "VTU route is working properly!" });
});

// ===============================
// BUY AIRTIME
// ===============================
router.post("/airtime", async (req, res) => {
  try {
    const { userId, phone, network, amount } = req.body;

    if (!userId || !phone || !network || !amount) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.walletBalance < Number(amount)) {
      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance",
      });
    }

    // Deduct wallet
    user.walletBalance -= Number(amount);
    await user.save();

    // Save transaction
    await Transaction.create({
      userId: user._id,
      type: `Airtime (${network})`,
      amount: Number(amount),
      status: "successful",
    });

    res.json({
      success: true,
      message: "Airtime purchase successful",
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

module.exports = router;
