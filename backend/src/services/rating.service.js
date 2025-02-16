const Ratings = require("../models/rating.model.js"); // Import the Ratings model
const productService = require("../services/product.service.js"); // Import the product service

// Function to create a new rating
async function createRating(req, user){
    const product = await productService.findProductById(req.productId); // Find the product by ID

    // Create a new rating
    const rating = new Ratings({
        product: product._id, // Product ID
        user: user._id, // User ID
        rating: req.rating, // Rating value
        createdAt: new Date(), // Creation date
    });

    // Save the rating to the database
    return await rating.save();
}

// Function to get all ratings for a product by its ID
async function getProductRating(productId){
    return await Ratings.find({product: productId}); // find method to find all ratings for the product
}

module.exports = {
    createRating, // Export the createRating function
    getProductRating, // Export the getProductRating function
}