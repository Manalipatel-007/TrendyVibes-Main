const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const authenticate = require("../middleware/authenticate");

// Route to create a new product
router.post("/", authenticate, productController.createProduct);

// Route to create multiple products
router.post("/creates", authenticate, productController.createMultipleProduct);

// Route to delete a product
router.delete("/:id", authenticate, productController.deleteProduct);

// Route to update a product
router.put("/:id", authenticate, productController.updateProduct);

// Exporting the router
module.exports = router;
