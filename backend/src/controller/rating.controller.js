const Product = require('../models/rating.model');
const ratingService = require('../services/rating.service.js');

// Function to create a new rating
const createRating = async(req , res)=>{
    const user = req.user;
    try {
        const review = await ratingService.createRating(req.body.user);
        return res.status(201).send(review);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

// Function to get all ratings for a specific product
const getAllRatings = async(req , res)=>{
    const productId = req.params.productId;
    const user = req.user;
    try {
        const reviews = await ratingService.getAllRating(productId);
        return res.status(201).send(reviews);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

// Exporting the controller functions
module.exports = {
    createRating,
    getAllRatings,
}