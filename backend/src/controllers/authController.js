const bcrypt = require("bcryptjs");
const validator = require("validator");

const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");

// Register User
const registerController = asyncHandler(async (req, res) => {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    // Required fields
    if (!name || !email || !password) {
        const error = new Error("All fields are required");
        error.statusCode = 400;
        throw error;
    }

    // Email validation
    if (!validator.isEmail(email)) {
        const error = new Error("Please enter a valid email");
        error.statusCode = 400;
        throw error;
    }

    // Password validation
    if (password.length < 6) {
        const error = new Error("Password must be at least 6 characters");
        error.statusCode = 400;
        throw error;
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = 400;
        throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});

// Login User
const loginController = asyncHandler(async (req, res) => {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    // Required fields
    if (!email || !password) {
        const error = new Error("Email and password are required");
        error.statusCode = 400;
        throw error;
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Save token in cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Change to true in production (HTTPS)
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});

module.exports = {
    registerController,
    loginController,
};