
const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");

// ===============================
// Admin - Get All Transactions
// ===============================
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      transactions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


// Get user transactions
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      transactions,
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
