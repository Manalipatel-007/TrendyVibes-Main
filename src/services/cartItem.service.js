// / Import the CartItem model and userService for database operations
const CartItem = require("../models/cartItem.model");
const userService = require("../services/user.service");


// Updates the details of a specific cart item
async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        // Find the cart item by its ID
        const item = await findCartItemById(cartItemId);
        //If cart item does not exist, throw an error
        if (!item) {
            throw new Error("cart item not found : ", cartItemId);
        }


         // Retrieve the user associated with the cart item
        const user = await userService.findUserById(item.userId);
        if (!user) {
            throw new Error("user not found : ", userId);
        }

        // Check if the requesting user is the owner of the cart item
        if (user._id.toString() === userId.toString()) {
            // Update quantity and recalculate prices
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.dicountedPrice = item.quantity * item.product.dicountedPrice;

            // / Save the updated cart item and return it
            const updateCartItem = await item.save();
            return updateCartItem;
        }
        else {
            // Throw an error if the user is not authorized to update
            throw new Error("you can't update this cart item");
        }


    } catch (error) {
        throw new Error(error.message);
    }
}


// Removes a cart item if the user is authorized
async function removeCartItem(userId, cartItemId) {

    const cartItem = await findCartItemById(cartItemId);  //Find the cart item by its ID
    const user = await userService.findUserById(userId);  // Find the user by their ID

     // Check if the requesting user is the owner of the cart item
    if (user._id.toString() === cartItem.userId.toString()) {
        // Delete the cart item
        await CartItem.findByIdAndDelete(cartItemId);
    }
    throw new Error("you can't delete this cart item");
}


// Finds a cart item by its ID
async function findCartItemById(cartItemId) {
    // Retrieve the cart item from the database
    const cartItem = await findCartItemById(cartItemId);
    if (cartItem) {
        return cartItem;
    }
    else {
        // Throw an error if the cart item is not found
        throw new Error("cart item not found : ", cartItemId);
    }
}


module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById,
}