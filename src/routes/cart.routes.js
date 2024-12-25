const express = require("express");
const router = express.Router();

const cartController = require("../controller/cart.controller.js");
const authenticate = require("../middleware/authenticate.js");


router.get("/", authenticate, cartController.findUserCart); // Route to get the user's cart
router.put("/add", authenticate, cartController.addItemToCart); // Route to add an item to the user's cart

// Exporting the router
module.exports = router;