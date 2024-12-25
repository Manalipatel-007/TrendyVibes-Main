const orderService = require("../services/order.service.js"); // Import the order service

const getAllOrders = async(req, res) => {
    try {
        const orders = await orderService.getAllOrders(); // Get all orders
        return res.status(200).send(orders); // Send orders with status 200
    } catch (error) {
        return res.status(500).send({error: error.message}); // Send error with status 500
    }
}

const confirmedOrders = async(req, res) => {
    const orderId = req.params.orderId; // Get order ID from request parameters
    try {
        const orders = await orderService.confirmedOrders(orderId); // Confirm the order
        return res.status(200).send(orders); // Send orders with status 200
    } catch (error) {
        return res.status(500).send({error: error.message}); // Send error with status 500
    }
}

const shippOrders = async(req, res) => {
    const orderId = req.params.orderId; // Get order ID from request parameters
    try {
        const orders = await orderService.shippOrders(orderId); // Ship the order
        return res.status(200).send(orders); // Send orders with status 200
    } catch (error) {
        return res.status(500).send({error: error.message}); // Send error with status 500
    }
}

const deliverOrders = async(req, res) => {
    const orderId = req.params.orderId; // Get order ID from request parameters
    try {
        const orders = await orderService.deliverOrder(orderId); // Deliver the order
        return res.status(200).send(orders); // Send orders with status 200
    } catch (error) {
        return res.status(500).send({error: error.message}); // Send error with status 500
    }
}

const cancelledOrders = async(req, res) => {
    const orderId = req.params.orderId; // Get order ID from request parameters
    try {
        const orders = await orderService.cancelledOrder(orderId); // Cancel the order
        return res.status(200).send(orders); // Send orders with status 200
    } catch (error) {
        return res.status(500).send({error: error.message}); // Send error with status 500
    }
}

const deleteOrders = async(req, res) => {
    const orderId = req.params.orderId; // Get order ID from request parameters
    try {
        const orders = await orderService.deleteOrder(orderId); // Delete the order
        return res.status(200).send(orders); // Send orders with status 200
    } catch (error) {
        return res.status(500).send({error: error.message}); // Send error with status 500
    }
}

module.exports = {
    getAllOrders,
    confirmedOrders,
    shippOrders,
    deliverOrders,
    cancelledOrders,
    deleteOrders,
}