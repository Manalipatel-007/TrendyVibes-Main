const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const authenticate = require("../middleware/authenticate.js");

// Route to get all products
router.get("/id", authenticate, productController.getAllProducts);

// Route to find a product by its ID
router.get("/id/:id", authenticate, productController.findProductById);

// Exporting the router
module.exports = router;