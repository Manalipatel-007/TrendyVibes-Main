const express = require("express");
const router = express.Router();

const orderController = require("../controller/adminOrder.controller.js");
const authenticate = require("../middleware/authenticate.js");
const { getAllOrders } = require("../services/order.service.js");


router.get("/", authenticate, orderController.getAllOrders); // Route to get all orders
router.put("/:orderId/confirmed", authenticate, orderController.confirmedOrders); // Route to confirm an order
router.put("/:orderId/ship", authenticate, orderController.shippOrders); // Route to ship an order
router.put("/:orderId/deliver", authenticate, orderController.deliverOrders); // Route to deliver an order
router.put("/:orderId/cancel", authenticate, orderController.cancelledOrders); // Route to cancel an order
router.put("/:orderId/delete", authenticate, orderController.deleteOrders); // Route to delete an order

// Exporting the router
module.exports = router;