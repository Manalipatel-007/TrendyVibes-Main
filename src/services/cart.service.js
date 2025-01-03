const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

// Creates a new cart for the given user
async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Finds a user's cart and calculates totals
async function findUserCart(userId) {
    try {
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "cartItems",
            populate: { path: "product" },
        });

        if (!cart) throw new Error("Cart not found.");

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.discountedPrice;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        cart.discount = totalPrice - totalDiscountedPrice;

        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Adds an item to the user's cart
async function addItemToCart(userId, productId, quantity, size) {
    console.log("Adding item to cart:", { userId, productId, quantity, size }); // Add logging

    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId }).populate("cartItems");

    // If the cart does not exist, create a new one
    if (!cart) {
        console.log("Cart not found for the user. Creating a new cart."); // Add logging
        cart = new Cart({ user: userId, cartItems: [] }); // Initialize cartItems as an empty array
        await cart.save();
    }

    // Ensure cartItems is an array
    if (!cart.cartItems) {
        cart.cartItems = [];
    }

    // Find the product to add to the cart
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }

    // Check if the product is already in the cart
    const existingItem = cart.cartItems.find(item => item.product && item.product.equals(productId));
    if (existingItem) {
        // If the product is already in the cart, update the quantity
        existingItem.quantity += quantity;
        await existingItem.save();
    } else {
        // If the product is not in the cart, add it to the cart
        const cartItem = new CartItem({
            product: product._id,
            cart: cart._id,
            quantity: quantity || 1,
            userId,
            price: product.price,
            size: size,
            discountedPrice: product.discountedPrice || product.price,
        });

        const createdCartItem = await cartItem.save();
        cart.cartItems.push(createdCartItem._id);
    }

    // Save the cart
    await cart.save();
    return cart;
}

module.exports = { createCart, findUserCart, addItemToCart };
