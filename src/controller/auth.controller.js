const User = require('../models/user.model'); // Assuming you have a User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service'); // Ensure userService is imported
const jwtProvider = require("../config/jwtProvider.js"); // Import JWT provider
const cartService = require("../services/cart.service.js"); // Import cart service

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body; // Ensure firstName and lastName are included

        console.log("Registering user:", { firstName, lastName, email, password }); // Log user details

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists with email:", email); // Log existing user
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwtProvider.generateToken(newUser._id);
       
        console.log("User registered successfully:", newUser); // Log new user

        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    const { password, email } = req.body; // Get email and password from request body

    try {
        const user = await userService.getUserByEmail(email); // Get user by email

        if (!user) {
            console.log(`User not found with email: ${email}`);
            return res.status(404).send({ message: `User not found with email: ${email}` });
        }
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(401).send({ message: "Invalid password" });
        }
        // Generate a JWT token
        const jwt = jwtProvider.generateToken(user._id);
        console.log("JWT generated:", jwt);

        return res.status(200).send({ jwt, message: "Login successful" });
    } catch (error) {
        console.error("Login error:", error.message); // Log the error
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    register,
    login,
};
