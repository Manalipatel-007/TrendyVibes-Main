const cartService = require("../services/cart.service.js"); // Import the cart service

const findUserCart = async(req, res) => {
    const user = req.user; // Get the user from the request
    try {
        const cart = await cartService.findUserCart(user._id); // Find the user's cart
        return res.status(200).send(cart); // Send the cart with status 200
    } catch (error) {
        return res.status(500).send({error: error.message}); // Send error with status 500
    }
}

// Function to add an item to the cart
const addItemToCart = async(req, res) => {
    const userId = req.user._id; // Get the userId from the authenticated user
    const { productId, quantity, size } = req.body; // Get productId, quantity, and size from the request body
    const itemQuantity = quantity || 1; // Default quantity to 1 if not provided
    try {
        console.log("Adding item to cart with data:", { userId, productId, itemQuantity, size }); // Add logging
        const cart = await cartService.addItemToCart(userId, productId, itemQuantity, size);
        return res.status(200).send(cart); // Change status to 200 for successful addition
    } catch (error) {
        console.error("Error adding item to cart:", error.message); // Add logging
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    findUserCart, // Export the findUserCart function
    addItemToCart, // Export the addItemToCart function
}