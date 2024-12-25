const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model")


// Creates a new cart for the given user
async function createCart(user) {
    try {
        const cart = new Cart({ user }); // Initialize a new cart with the use
        // Save the cart to the database
        const createdCart = await cart.save();
        return createdCart;

    } catch (error) {
        
        throw new Error(error.message);
    }
}


// Finds a user's cart and calculates totals
async function findUserCart(userId){
    try {
        // Retrieve the user's cart by user ID
        let cart = await Cart.findOne({user:userId})

         // Fetch cart items associated with the cart and populate product details
        let cartItems = await CartItem.find({cart:cart._id}).populate('product');
        cart.cartItems = cartItems;
         // Initialize total values
        let totalPrice = 0;
        let totalDiscountedPrice=0;
        let totalItem = 0;

        // Calculate totals based on cart items
        for(let cartItem of cart.cartItems){
            totalPrice+= cartItem.price;
            totalDiscountedPrice+=cartItem.discountedPrice;
            totalItem+= cartItem.quantity;
        }

        // Add totals to the cart object
        cart.totalPrice=totalPrice;
        cart.totalItem=totalItem;
        cart.discounte=totalPrice-totalDiscountedPrice;

        return cart;

    } catch (error) {
        throw new Error(error.message);
    }
}


// Adds an item to the user's cart
async function addCartItem (userId, req){
    try {
        const cart= await Cart.findOne({user: userId});  // Find the user's cart by user ID
        const product = await Product.findById(req.productId);  // Retrieve the product using its ID from the request

         // Check if the item already exists in the cart
        const isPresent= await CartItem.findOne({cart:cart._id, product:product.id, userId})
        if(!isPresent){
             // Create a new cart item if it doesn't exist
            const cartItem = new CartItem({
                product:product._id,
                cart:cart._id,
                quantity:1,
                userId,
                price:product.price,
                size:req.size,
                discountedPrice:product.discountedPrice,
            })

            const createdCartItem = await cartItem.save(); // Save the cart item to the database
            // Add the new item to the cart and save the cart
            cart.cartItems.push(createdCartItem); 
            await cart.save();
            
            return "Item added to cart";
        }

       } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {createCart, findUserCart, addCartItem};