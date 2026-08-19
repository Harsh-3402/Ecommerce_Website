const mongoose = require("mongoose");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

// Create Order
// Create Order
const createOrder = asyncHandler(async (req, res) => {

    const { shippingAddress, paymentMethod } = req.body;

    // Validate Shipping Address
    if (
        !shippingAddress ||
        !shippingAddress.fullName ||
        !shippingAddress.phone ||
        !shippingAddress.address ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.postalCode ||
        !shippingAddress.country
    ) {
        const error = new Error("Complete shipping address is required");
        error.statusCode = 400;
        throw error;
    }

    // Validate Payment Method
    if (!paymentMethod) {
        const error = new Error("Payment method is required");
        error.statusCode = 400;
        throw error;
    }

    // Find User Cart
    const cart = await Cart.findOne({
        user: req.user._id,
    }).populate("cartItems.product");

    if (!cart || cart.cartItems.length === 0) {
        const error = new Error("Cart is empty");
        error.statusCode = 400;
        throw error;
    }

    // Verify Products & Stock
    for (const item of cart.cartItems) {

        const product = await Product.findById(item.product._id);

        if (!product) {
            const error = new Error(`${item.product.title} no longer exists`);
            error.statusCode = 404;
            throw error;
        }

        if (item.quantity > product.stock) {
            const error = new Error(
                `Only ${product.stock} ${product.title} available in stock`
            );
            error.statusCode = 400;
            throw error;
        }
    }

    // Calculate Prices
    const subTotal = cart.cartItems.reduce(
        (total, item) => total + item.price,
        0
    );

    const taxPrice = Number((subTotal * 0.18).toFixed(2));

    const shippingPrice = subTotal >= 1000 ? 0 : 100;

    const totalPrice = subTotal + taxPrice + shippingPrice;

    // Create Order
    const order = await Order.create({
        user: req.user._id,

        orderItems: cart.cartItems,

        shippingAddress: {
            fullName: shippingAddress.fullName.trim(),
            phone: shippingAddress.phone.trim(),
            address: shippingAddress.address.trim(),
            city: shippingAddress.city.trim(),
            state: shippingAddress.state.trim(),
            postalCode: shippingAddress.postalCode.trim(),
            country: shippingAddress.country.trim(),
        },

        paymentMethod,

        taxPrice,

        shippingPrice,

        totalPrice,
    });

    // Reduce Product Stock
    for (const item of cart.cartItems) {

        const product = await Product.findById(item.product._id);

        product.stock -= item.quantity;

        await product.save();
    }

    // Clear Cart
    cart.cartItems = [];
    await cart.save();

    // Populate Product Details
    const populatedOrder = await Order.findById(order._id)
        .populate("orderItems.product");

    res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order: populatedOrder,
    });

});

// Get My Orders
const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({
        user: req.user._id,
    })
        .populate("orderItems.product")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        totalOrders: orders.length,
        orders,
    });

});

// Get Order By ID
const getOrderById = asyncHandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const error = new Error("Invalid Order ID");
        error.statusCode = 400;
        throw error;
    }

    const order = await Order.findById(req.params.id)
        .populate("orderItems.product");

    if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
    }

    if (order.user.toString() !== req.user._id.toString()) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
    }

    res.status(200).json({
        success: true,
        order,
    });

});

// Cancel Order
const cancelOrder = asyncHandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const error = new Error("Invalid Order ID");
        error.statusCode = 400;
        throw error;
    }

    const order = await Order.findById(req.params.id)
        .populate("orderItems.product");

    if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
    }

    if (order.user.toString() !== req.user._id.toString()) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
    }

    if (order.orderStatus === "Delivered") {
        const error = new Error("Delivered orders cannot be cancelled");
        error.statusCode = 400;
        throw error;
    }

    if (order.orderStatus === "Cancelled") {
        const error = new Error("Order is already cancelled");
        error.statusCode = 400;
        throw error;
    }

    // Restore Product Stock
    for (const item of order.orderItems) {

        const product = await Product.findById(item.product._id);

        if (product) {
            product.stock += item.quantity;
            await product.save();
        }
    }

    order.orderStatus = "Cancelled";

    await order.save();

    res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        order,
    });

});

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
};