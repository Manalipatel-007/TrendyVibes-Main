const productService = require('../services/product.service.js');

// Function to create a new product
const createProduct = async(req, res) => {
    try {
        console.log("Creating product with data:", req.body); // Add logging
        const product = await productService.createProduct(req.body);
        return res.status(201).send(product);
    } catch (error) {
        console.error("Error creating product:", error.message); // Add logging
        return res.status(500).send({ error: error.message });
    }
}

// Function to delete a product by ID
const deleteProduct = async(req, res) => {
    const productId = req.params.id;
    try {
        console.log("Deleting product with ID:", productId); // Add logging
        const product = await productService.deleteProduct(productId);
        return res.status(201).send(product);
    } catch (error) {
        console.error("Error deleting product:", error.message); // Add logging
        return res.status(500).send({ error: error.message });
    }
}

// Function to update a product by ID
const updateProduct = async(req, res) => {
    const productId = req.params.id;
    try {
        console.log("Updating product with ID:", productId, "and data:", req.body); // Add logging
        const product = await productService.updateProduct(productId, req.body);
        return res.status(201).send(product);
    } catch (error) {
        console.error("Error updating product:", error.message); // Add logging
        return res.status(500).send({ error: error.message });
    }
}

// Function to find a product by ID
const findProductById = async(req, res) => {
    const productId = req.params.id;
    try {
        console.log("Finding product with ID:", productId); // Add logging
        const product = await productService.findProductById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).send(product); // Change status to 200 for successful retrieval
    } catch (error) {
        console.error("Error finding product:", error.message); // Add logging
        return res.status(500).send({ error: error.message });
    }
}

// Function to get all products
const getAllProducts = async(req, res) => {
    try {
        console.log("Getting all products with query:", req.query); // Add logging
        const products = await productService.getAllProducts(req.query);
        return res.status(200).send(products); // Change status to 200 for successful retrieval
    } catch (error) {
        console.error("Error getting all products:", error.message); // Add logging
        return res.status(500).send({ error: error.message });
    }
}

// Function to create multiple products
const createMultipleProduct = async(req, res) => {
    try {
        console.log("Creating multiple products with data:", req.body); // Add logging
        const product = await productService.createMultipleProducts(req.body);
        return res.status(201).send({ message: "Products Created Successfully" });
    } catch (error) {
        console.error("Error creating multiple products:", error.message); // Add logging
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    createMultipleProduct,
    getAllProducts,
}