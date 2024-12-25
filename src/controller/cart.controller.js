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

const addItemToCart = async(req, res) => {
    const user = req.user; // Get the user from the request
    try {
        const cartItem = await cartService.addCartItem(user.id, req.body); // Add item to the cart
        return res.status(200).send(cartItem); // Send the cart item with status 200
    } catch (error) {
        return res.status(500).send({error: error.message}); // Send error with status 500
    }
}

module.exports = {
    findUserCart, // Export the findUserCart function
    addItemToCart, // Export the addItemToCart function
}