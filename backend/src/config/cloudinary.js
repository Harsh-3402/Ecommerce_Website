const cloudinary = require("cloudinary").v2; //why v2 - because we are using config package version 3.0.0 which has breaking changes

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
