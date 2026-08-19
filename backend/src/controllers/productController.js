const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const cloudinary = require("../config/cloudinary");

// Create Product
const createProduct = asyncHandler(async (req, res) => {


    const {
        title,
        description,
        price,
        category,
        stock,
    } = req.body;

    // Required fields
    if (!title || !description || !price || !category || stock === undefined) {
        const error = new Error("All fields are required");
        error.statusCode = 400;
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        throw error;
    }


    // Validate numbers
    if (Number(price) <= 0) {
        const error = new Error("Price must be greater than 0");
        error.statusCode = 400;
        throw error;
    }

    if (Number(stock) < 0) {
        const error = new Error("Stock cannot be negative");
        error.statusCode = 400;
        throw error;
    }

    // Image validation
    if (!req.file) {
        const error = new Error("Product image is required");
        error.statusCode = 400;
        throw error;
    }

    // Upload image
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "E-commerce-products",
    });

    const product = await Product.create({
        title: title.trim(),
        description: description.trim(),
        price,
        category: category.trim(),
        stock,
        image: {
            url: result.secure_url,
            public_id: result.public_id,
        },
        createdBy: req.user._id,
    });

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
    });
});

// Get All Products
const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword || "";
    const category = req.query.category || "";

    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 10, 20);

    const query = {};

    if (keyword) {
        query.title = {
            $regex: keyword,
            $options: "i",
        };
    }

    if (category) {
        query.category = {
            $regex: category,
            $options: "i",
        };
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        products,
    });
});

// Get Product By Id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    if (req.body.price !== undefined && Number(req.body.price) <= 0) {
        const error = new Error("Price must be greater than 0");
        error.statusCode = 400;
        throw error;
    }

    if (req.body.stock !== undefined && Number(req.body.stock) < 0) {
        const error = new Error("Stock cannot be negative");
        error.statusCode = 400;
        throw error;
    }

    const updateData = {
        ...req.body,
        title: req.body.title?.trim(),
        description: req.body.description?.trim(),
        category: req.body.category?.trim(),
    };

    if (req.file) {
        if (product.image?.public_id) {
            await cloudinary.uploader.destroy(product.image.public_id);
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "E-commerce-products",
        });

        updateData.image = {
            url: result.secure_url,
            public_id: result.public_id,
        };
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        message: "Product updated successfully.",
        product: updatedProduct,
    });
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    if (product.image?.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully.",
    });
});

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};