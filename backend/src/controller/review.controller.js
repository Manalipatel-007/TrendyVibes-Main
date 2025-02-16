const Product = require('../models/product.model');
const reviewService = require('../services/review.service.js');

// Controller function to create a new review
const createReview = async(req , res)=>{
    const user = req.user;
    try {
        // Call the review service to create a new review
        const review = await reviewService.createReview(req.body.user);
        return res.status(201).send(review);
    } catch (error) {
        // Handle any errors that occur during review creation
        return res.status(500).send({error: error.message});
    }
}

// Controller function to get all reviews for a specific product
const getAllReview = async(req , res)=>{
    const productId= req.params.productId;
    const user = req.user;
    try {
        // Call the review service to get all reviews for the product
        const reviews = await reviewService.getAllReview(productId);
        return res.status(201).send(reviews);
    } catch (error) {
        // Handle any errors that occur while fetching reviews
        return res.status(500).send({error: error.message});
    }
}

// Export the controller functions
module.exports={
    createReview,
    getAllReview,
}