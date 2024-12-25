const Review = require("../models/review.js"); // Import the Review model
const productService = require("../services/product.service.js"); // Import the product service

// Function to create a new review
async function createReview(reqData, user){
    const product = await productService.findProductById(reqData.productId); // Find the product by ID

    // Create a new review
    const review = new Review({
        user: user._id, // User ID
        product: product._id, // Product ID
        review: reqData.review, // Review content
        createdAt: new Date(), // Creation date
    });

    await product.save(); // Save the product (if needed)
    return await review.save(); // Save the review to the database
}

// Function to get all reviews for a product by its ID
async function getAllReview(productId){
    const product = await productService.findProductById(productId); // Find the product by ID

    return await Review.find({product: productId}).populate("user"); // find method to find all reviews for the product, populate method to replace the user ID with the actual user document
}

module.exports = {
    createReview,
    getAllReview,
}