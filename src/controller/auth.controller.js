const userService = require("../services/user.service.js"); // Import user service
const jwtProvider = require("../config/jwtProvider.js"); // Import JWT provider
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const cartService = require("../services/cart.service.js"); // Import cart service

const register = async(req, res) => {
    try {
        const user = await userService.createUser(req.body); // Create a new user
        const jwt = jwtProvider.generateToken(user._id); // Generate a JWT token

        await cartService.createCart(user); // Create a cart for the user

        return res.status(200).send({jwt, message: "register successfully"}); // Send success message with JWT token
    } catch (error) {
        return res.status(500).send({error: error.message}); // Send error with status 500
    }
}

const login = async(req, res) => {
    const {password, email} = req.body; // Get email and password from request body

    try {
        const user = await userService.getUserByEmail(email); // Get user by email

        if(!user){
            return res.status(404).send({message: 'user not found with email: ', email}); // Send error if user not found
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); // Compare passwords
        if(!isPasswordValid){
            return res.status(401).send({message: "Invalid Password..."}); // Send error if password is invalid
        }

        const jwt = jwtProvider.generateToken(user._id); // Generate a JWT token
        return res.status(200).send({jwt, message: "login success"}); // Send success message with JWT token
    } catch (error) {
        return res.status(500).send({error: error.message}); // Send error with status 500
    }
}

module.exports = {
    register, // Export register function
    login, // Export login function
}