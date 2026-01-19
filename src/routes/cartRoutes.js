const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");

// All cart routes are protected
router.post("/add", auth, cartController.addToCart);
router.get("/", auth, cartController.getCart);
router.put("/update", auth, cartController.updateQuantity);
router.delete("/remove/:productId", auth, cartController.removeFromCart);

module.exports = router;
