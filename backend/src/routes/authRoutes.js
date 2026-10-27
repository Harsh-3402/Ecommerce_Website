const express = require('express');
const { authMiddleware } = require("../middleware/authMiddleware");
const {registerController, loginController, logoutController,getCurrentUserController} = require('../controllers/authController');

const router = express.Router();

router.post("/", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", authMiddleware, getCurrentUserController);
module.exports = router;