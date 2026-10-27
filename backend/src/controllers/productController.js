const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const cloudinary = require("../config/cloudinary");

// Create Product
// Create Product
const createProduct = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        price,
        category,
        stock,
        imageUrl,
    } = req.body;

    // Validate required fields
    if (
        !title?.trim() ||
        !description?.trim() ||
        price === undefined ||
        price === "" ||
        !category?.trim() ||
        stock === undefined ||
        stock === ""
    ) {
        const error = new Error(
            "Title, description, price, category and stock are required"
        );
        error.statusCode = 400;
        throw error;
    }

    // Validate price
    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
        const error = new Error("Price must be greater than 0");
        error.statusCode = 400;
        throw error;
    }

    // Validate stock
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
        const error = new Error(
            "Stock must be a non-negative integer"
        );
        error.statusCode = 400;
        throw error;
    }

    let image = {
        url: "",
        public_id: "",
    };

    // Method 1: Upload a file to Cloudinary
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "E-commerce-products",
        });

        image = {
            url: result.secure_url,
            public_id: result.public_id,
        };
    }

    // Method 2: Use an existing image URL
    else if (imageUrl) {
        let parsedUrl;

        try {
            parsedUrl = new URL(imageUrl);
        } catch {
            const error = new Error("Invalid image URL");
            error.statusCode = 400;
            throw error;
        }

        if (parsedUrl.protocol !== "https:") {
            const error = new Error(
                "Image URL must use HTTPS"
            );
            error.statusCode = 400;
            throw error;
        }

        // Allow only trusted image hosts.
        // Add your approved image hosts here if needed.
        const allowedHosts = [
            "res.cloudinary.com",
            "images.unsplash.com",
        ];

        if (!allowedHosts.includes(parsedUrl.hostname)) {
            const error = new Error(
                "Image host is not allowed"
            );
            error.statusCode = 400;
            throw error;
        }

        image = {
            url: parsedUrl.toString(),
            public_id: "",
        };
    }

    // An image is required
    else {
        const error = new Error(
            "Upload an image file or provide imageUrl"
        );
        error.statusCode = 400;
        throw error;
    }

    // Save product in MongoDB
    const product = await Product.create({
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        category: category.trim(),
        stock: Number(stock),
        image,
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
            $regex: `^${category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
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