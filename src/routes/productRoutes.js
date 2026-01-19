const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Admin-only: add product
router.post("/", auth, admin, productController.createProduct);

// Public: get all products
router.get("/", productController.getAllProducts);

module.exports = router;
