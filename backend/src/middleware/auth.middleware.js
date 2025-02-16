const jwt = require('jsonwebtoken');
const userService = require('../services/user.service'); // Ensure userService is imported
const jwtProvider = require("../config/jwtProvider.js"); // Import JWT provider

const authenticate = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        console.error("Authorization header is missing"); // Log missing header
        return res.status(401).send({ message: 'Please authenticate' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log("Extracted token:", token); // Log extracted token

    try {
        const decoded = jwtProvider.verifyToken(token);
        console.log("Decoded JWT:", decoded); // Log decoded JWT

        const user = await userService.getUserById(decoded.userId);
        console.log("Retrieved User:", user); // Log retrieved user
        if (!user) {
            console.log("User not found with ID:", decoded.userId); // Log user not found
            return res.status(404).send({ message: 'User not found' });
        }

        console.log("Authenticated user:", user); // Log authenticated user
        req.user = user;
        console.log("req.user set to:", req.user); // Log req.user
        next();
    } catch (error) {
        console.error("Authentication error:", error.message); // Log the error
        res.status(401).send({ message: 'Please authenticate' });
    }
};

module.exports = authenticate;

