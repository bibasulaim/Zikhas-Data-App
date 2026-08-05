const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// REGISTER
// =========================
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      walletBalance: 0,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        walletBalance: user.walletBalance,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Registration Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// =========================
// LOGIN
// =========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("========== LOGIN ==========");
    console.log("Email:", email);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");

      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("User found:", user.email);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("Login successful");

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        walletBalance: user.walletBalance,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};
