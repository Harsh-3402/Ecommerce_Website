const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

// Add Product To Cart
const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    // Required fields
    if (!productId || quantity === undefined) {
        const error = new Error("Product ID and quantity are required");
        error.statusCode = 400;
        throw error;
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        const error = new Error("Invalid Product ID");
        error.statusCode = 400;
        throw error;
    }

    if (quantity < 1) {
        const error = new Error("Quantity must be at least 1");
        error.statusCode = 400;
        throw error;
    }

    // Find Product
    const product = await Product.findById(productId);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    // Find Cart
    let cart = await Cart.findOne({
        user: req.user._id,
    });

    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [],
        });
    }

    const existingCartItem = cart.cartItems.find(
        item => item.product.toString() === productId
    );

    if (existingCartItem) {

        const newQuantity = existingCartItem.quantity + Number(quantity);

        if (newQuantity > product.stock) {
            const error = new Error("Requested quantity exceeds available stock");
            error.statusCode = 400;
            throw error;
        }

        existingCartItem.quantity = newQuantity;
        existingCartItem.price = newQuantity * product.price;

    } else {

        if (quantity > product.stock) {
            const error = new Error("Requested quantity exceeds available stock");
            error.statusCode = 400;
            throw error;
        }

        cart.cartItems.push({
            product: productId,
            quantity: Number(quantity),
            price: product.price * quantity,
        });
    }

    await cart.save();

    res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
        cart,
    });
});

// Get User Cart
const getCart = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne({
        user: req.user._id,
    }).populate("cartItems.product");

    if (!cart) {
        return res.status(200).json({
            success: true,
            cartItems: [],
            totalItems: 0,
            totalPrice: 0,
        });
    }

    const totalItems = cart.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.cartItems.reduce(
        (total, item) => total + item.price,
        0
    );

    res.status(200).json({
        success: true,
        cartItems: cart.cartItems,
        totalItems,
        totalPrice,
    });
});

// Update Cart Item
const updateCartItem = asyncHandler(async (req, res) => {

    const { productId } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        const error = new Error("Invalid Product ID");
        error.statusCode = 400;
        throw error;
    }

    if (quantity < 1) {
        const error = new Error("Quantity must be at least 1");
        error.statusCode = 400;
        throw error;
    }

    const cart = await Cart.findOne({
        user: req.user._id,
    });

    if (!cart) {
        const error = new Error("Cart not found");
        error.statusCode = 404;
        throw error;
    }

    const cartItem = cart.cartItems.find(
        item => item.product.toString() === productId
    );

    if (!cartItem) {
        const error = new Error("Cart item not found");
        error.statusCode = 404;
        throw error;
    }

    const product = await Product.findById(productId);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    if (quantity > product.stock) {
        const error = new Error("Requested quantity exceeds available stock");
        error.statusCode = 400;
        throw error;
    }

    cartItem.quantity = Number(quantity);
    cartItem.price = product.price * quantity;

    await cart.save();

    res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart,
    });
});

// Remove Cart Item
const removeCartItem = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        const error = new Error("Invalid Product ID");
        error.statusCode = 400;
        throw error;
    }

    const cart = await Cart.findOne({
        user: req.user._id,
    });

    if (!cart) {
        const error = new Error("Cart not found");
        error.statusCode = 404;
        throw error;
    }

    const cartItem = cart.cartItems.find(
        item => item.product.toString() === productId
    );

    if (!cartItem) {
        const error = new Error("Cart item not found");
        error.statusCode = 404;
        throw error;
    }

    cart.cartItems = cart.cartItems.filter(
        item => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
        success: true,
        message: "Cart item removed successfully",
        cart,
    });
});

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
};