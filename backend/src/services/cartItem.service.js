// / Import the CartItem model and userService for database operations
const CartItem = require("../models/cartItem.model");
const userService = require("../services/user.service");
const Cart = require("../models/cart.model");

// Function to update a cart item
async function updateCartItem(userId, cartItemId, updateData) {
    const cartItem = await CartItem.findOneAndUpdate(
        { _id: cartItemId, userId },
        updateData,
        { new: true }
    );
    if (!cartItem) {
        throw new Error("Cart item not found");
    }
    return cartItem;
}

// Function to remove a cart item
async function removeCartItem(userId, cartItemId) {
    console.log("Removing cart item with ID:", cartItemId); // Add logging
    const cartItem = await CartItem.findOneAndDelete({ _id: cartItemId, userId });
    if (!cartItem) {
        throw new Error("Cart item not found");
    }

    // Remove the cart item from the cart
    await Cart.updateOne(
        { user: userId },
        { $pull: { cartItems: cartItemId } }
    );

    return cartItem;
}

module.exports = {
    updateCartItem,
    removeCartItem,
}