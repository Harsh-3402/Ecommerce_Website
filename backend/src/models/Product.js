const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        comment: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 1,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        stock: {
            type: Number,
            required: true,
            default: 1,
            min: 0,
        },

        image: {
            url: {
                type: String,
                default: "",
            },

            public_id: {
                type: String,
                default: "",
            },
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        reviews: [reviewSchema],

        numReviews: {
            type: Number,
            default: 0,
        },

        averageRating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;