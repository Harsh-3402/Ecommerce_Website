const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/authRoutes');
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
app = express();

app.use(cors({
    origin: "https://ecommerce-website-zeta-ashy-25.vercel.app",
    credentials: true
})); // middleware to enable CORS
app.use(express.json()); // middleware to parse JSON request bodies
app.use(cookieParser()); // middleware to parse cookies
// Routes
app.use('/api/auth', authRoutes); // Use the auth routes

// Product routes
app.use("/api/products", productRoutes);

// Cart Routes
app.use("/api/cart", cartRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);
// Error handling middleware
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

module.exports = app;
