const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");

// Route to get all products
router.get("/", productController.getAllProducts);

// Route to get a product by ID
router.get("/:id", productController.findProductById);

// Route to create a new product
router.post("/", productController.createProduct);

// Route to create multiple products
router.post("/creates", productController.createMultipleProduct);

// Route to delete a product
router.delete("/:id", productController.deleteProduct);

// Route to update a product
router.put("/:id", productController.updateProduct);

module.exports = router;