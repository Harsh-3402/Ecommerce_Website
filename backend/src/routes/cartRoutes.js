const express  = require("express");

const router = express.Router();

const { 
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem
} = require("../controllers/cartController");

const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/",
    authMiddleware,
    addToCart
);
router.get("/", 
    authMiddleware,
    getCart
);
router.put("/:productId", 
    authMiddleware,
    updateCartItem
);
router.delete("/:productId", 
    authMiddleware,
    removeCartItem
);


module.exports = router;