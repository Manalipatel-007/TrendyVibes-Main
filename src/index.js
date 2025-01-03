const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable CORS

// Root route
app.get("/", (req, res) => {
    return res.status(200).send({ message: "welcome to e-commerce api- node", status: true });
});

// Import and use authentication routes
const authRouters = require("./routes/auth.route.js");
app.use("/auth", authRouters);

// Import and use user routes
const userRouters = require("./routes/user.route.js");
app.use("/api/users", userRouters);

// Import and use product routes
const productRouter = require("./routes/product.routes.js");
app.use("/api/products", productRouter);

// Import and use admin product routes
const adminProductRouter = require("./routes/adminProduct.routes.js");
app.use("/api/admin/products", adminProductRouter);

// Import and use cart routes
const cartRouter = require("./routes/cart.routes.js");
app.use("/api/cart", cartRouter);

// Import and use cart item routes
const cartItemRouter = require("./routes/cartItem.routes.js");
app.use("/api/cart_items", cartItemRouter);

// Import and use order routes
const orderRouter = require("./routes/order.routes.js");
app.use("/api/orders", orderRouter);

// Import and use admin order routes
const adminOrderRouter = require("./routes/adminOrder.route.js");
app.use('/api/admin/orders', adminOrderRouter);

// Import and use review routes
const reviewRouter = require("./routes/review.routes.js");
app.use("/api/reviews", reviewRouter);

// Import and use rating routes
const ratingRouter = require("./routes/rating.routes.js");
app.use('/api/ratings', ratingRouter);

// Exporting the app
module.exports = app;