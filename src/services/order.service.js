const cartService = require("../services/cart.service.js");
const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.model.js");



//  Function to create a new order
async function createOrder(user, shippAddress) {
    let address;


    // Check if the shipping address already exists in the database
    if (shippAddress._id) {
        let existAddress = await Address.findById(shippAddress._id);
        address = existAddress; // Use existing address if found
    }
    else {
         // Create a new address if it does not exist
        address = new Address(shippAddress);
        address.user = user;
        await address.save();

        // Ensure user.addresses is an array before pushing
        if (!Array.isArray(user.addresses)) {
            user.addresses = [];
        }

        user.address.push(address);
        await user.save();  // Save the new address to the database
    }

    // Retrieve the user's cart
    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    // Create order items from cart items
    for (const item of cart.cartItems) {
        if (isNaN(item.price)) {
            throw new Error(`Invalid price for item: ${item.product}`);
        }
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice,
        });

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
    }

    // Create the order with the user, order items, and shipping address
    const createdOrderItem = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discounte: cart.discounte,
        totalItem: cart.totalItem,
        shippAddress: address,

    })

    // Save the order to the database
    const saveOrder = await createdOrderItem.save();

    return saveOrder;
}



// Function to place an order
async function placeOrder(orderId) {
    const order = await findOrderById(orderId);

    // Update order status to "PLACED" and payment status to "COMPLETED"
    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";

    return await order.save();

}


// Function to confirm an order
async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId);


    // Update order status to "CONFIRMED"
    order.orderStatus = "CONFIRMED";

    return await order.save();

}


// Function to ship an order
async function shipOrder(orderId) {
    const order = await findOrderById(orderId);

    // Update order status to "SHIPPED"
    order.orderStatus = "SHIPPED";

    return await order.save();
}


// Function to deliver an order
async function deliverOrder(orderId) {
    const order = await findOrderById(orderId);

    // Update order status to "DELIVERED"
    order.orderStatus = "DELIVERED";

    return await order.save();
}


// Function to cancel an order
async function cancelledOrder(orderId) {
    const order = await findOrderById(orderId);

    // Update order status to "CANCELLED"
    order.orderStatus = "CANCELLED";

    return await order.save();
}


// Function to find an order by ID
async function findOrderById(orderId) {
    // Find order by ID and populate related fields
    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress");

    return order;
}


// Function to get a user's order history
async function usersOrderHistory(userId) {
    try {
        // Retrieve user's order history with status "PLACED"
        const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean();

        return orders;

    } catch (error) {
        throw new Error(error.message);
    }
}


// Function to get all orders
async function getAllOrders() {
    // Retrieve all orders and populate related fields
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } }).lean()
}


// Function to delete an order by ID
async function deleteOrder(orderId) {
    const order = await findOrderById(orderId);
    // Delete the order by ID
    await Order.findByIdAndDelete(orderId._id);
}


module.exports = {
    createOrder,
    placeOrder,
    confirmedOrder,
    shipOrder,
    deliverOrder,
    cancelledOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder,
}