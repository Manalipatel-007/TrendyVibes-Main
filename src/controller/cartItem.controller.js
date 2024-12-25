const cartItemService = require("../services/cartItem.service.js"); // Import the cartItemService

const updateCartItem = async (req, res) => {
    const user = req.user; // Get the user from the request
    try {
        const updatedCartItem = await cartItemService.updateCartItem(user._id, req.params.id, req.body); // Update the cart item
        return res.status(200).send(updatedCartItem); // Send the updated cart item with status 200
    } catch (error) {
        return res.status(500).send({ error: error.message }); // Send error with status 500
    }
}

const removeCartItem = async (req, res) => {
    const user = req.user; // Get the user from the request
    try {
        await cartItemService.updateCartItem(user._id, req.params.id, req.body); // Remove the cart item
        return res.status(200).send({ message: "cart item removed successfully" }); // Send success message with status 200
    } catch (error) {
        return res.status(500).send({ error: error.message }); // Send error with status 500
    }
}

module.exports = {
    updateCartItem,
    removeCartItem,
}