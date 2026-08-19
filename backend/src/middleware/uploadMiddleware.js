const multer = require("multer");

const storage = multer.diskStorage({});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/jpg", "image/png"];

        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG, JPEG, and PNG images are allowed"));
        }
    }
});

module.exports = upload;