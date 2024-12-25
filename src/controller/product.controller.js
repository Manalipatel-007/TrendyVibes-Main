const productService = require('../services/product.service.js');

// Function to create a new product
const createProduct = async(req, res)=>{
    try {
        const product = await productService.createProduct(req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

// Function to delete a product by ID
const deleteProduct = async(req, res)=>{
    const productId = req.params.id;
    try {
        const product = await productService.deleteProduct(productId);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

// Function to update a product by ID
const updateProduct = async(req, res)=>{
    const productId = req.params.id;
    try {
        const product = await productService.updateProduct(productId, req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

// Function to find a product by ID
const findProductById = async(req, res)=>{
    const productId = req.params.id;
    try {
        const product = await productService.findProductById(req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

// Function to get all products
const getAllProducts = async(req, res)=>{
    const productId = req.params.id;
    try {
        const products = await productService.getAllProducts(req.query);
        return res.status(201).send(products);
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

// Function to create multiple products
const createMultipleProduct = async(req, res)=>{
    const productId = req.params.id;
    try {
        const product = await productService.createMultipleProducts(req.body);
        return res.status(201).send({message : "Products Created Successfully"});
    } catch (error) {
        return res.status(500).send({error: error.message})
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