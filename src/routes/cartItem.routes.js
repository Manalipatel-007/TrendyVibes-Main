const express = require("express");
const router = express.Router();

const cartItemController = require("../controller/cartItem.controller.js");
const authenticate = require("../middleware/authenticate.js");

// Route to update a cart item
router.put("/:id", authenticate, cartItemController.updateCartItem);

// Route to remove a cart item
router.delete("/:id", authenticate, cartItemController.removeCartItem);

// Exporting the router
module.exports = router;