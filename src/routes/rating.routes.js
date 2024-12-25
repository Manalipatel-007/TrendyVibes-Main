const express = require("express");
const router = express.Router();

const ratingController = require("../controller/rating.controller");
const authenticate = require("../middleware/authenticate.js");

// Route to create a new rating
router.post("/create", authenticate, ratingController.createRating);

// Route to get all ratings for a specific product
router.put("/product/:productId", authenticate, ratingController.getAllRatings);

// Exporting the router
module.exports = router;