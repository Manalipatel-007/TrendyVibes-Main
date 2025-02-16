const orderService = require('../services/order.service.js');

// Function to create a new order
const createOrder = async(req, res) => {
    const user = await req.user;
    try {
        let createOrder = await orderService.createOrder(user, req.body);
        res.status(201).send(createOrder);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

// Function to find an order by its ID
const findOrderById = async(req, res) => {
    const user = await req.user;
    try {
        let createOrder = await orderService.findOrderById(req.params.id);
        return res.status(201).send(createOrder);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

// Function to get the order history of a user
const orderHistory = async(req, res) => {
    const user = await req.user;
    try {
        let createOrder = await orderService.usersOrderHistory(user._id);
        return res.status(201).send(createOrder);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

// Exporting the functions to be used in other parts of the application
module.exports = {
    createOrder,
    findOrderById,
    orderHistory,
}