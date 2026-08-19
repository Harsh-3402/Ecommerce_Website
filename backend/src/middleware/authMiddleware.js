const jwt = require("jsonwebtoken");

const User = require("../models/User");

const asyncHandler = require("../utils/asyncHandler");

const authMiddleware = asyncHandler(async (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
    const error = new Error("Not authorized, token missing");
    error.statusCode = 401;
    throw error;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    const error = new Error("Not authorized, invalid token");
    error.statusCode = 401;
    throw error;
  }
});

module.exports = { authMiddleware };