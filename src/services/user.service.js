const User = require("../models/user.model");
const bcrypt = require("bcrypt")  // bcrypt for hashing passwords
const jwtProvider = require('../config/jwtProvider.js') // JWT provider for token operations

// Creates a new user with the given user data
const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;

         // Check if a user already exists with the provided email
        const isUserExist = await User.findOne({ email })
        if (isUserExist) {
            throw new Error("user already exist with email :", email)
        }

        password = await bcrypt.hash(password, 8); // Hash the user's password before saving to the database

         // Create a new user record
        const user = await User.create({ firstName, lastName, email, password });
        console.log("created user", user);
        return user;


    } catch (error) {
        throw new Error(error.message)
    }
}


// Finds a user by their unique ID
const findUserById = async (userId) => {
    try {
          // Retrieve user details from the database using their ID
        const user = await User.findById(userId)
        // .populate("address");

        // If user is not found, throw an error
        if (!user) {
            throw new Error("user not found with id : ", userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}


// Retrieves a user by their email
const getUserByEmail = async (email) => {
    try {
         // Find the user with the given email
        const user = await User.findOne({ email });
         // If user is not found, throw an error
        if (!user) {
            throw new Error(`user not found with email : ${email}`);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Retrieves a user's profile using a token
const getUserProfileByToken = async (token) => {
    try {
        // Decode the user ID from the token
        const userId = jwtProvider.getUserIdFromToken(token);
         // Fetch the user's details using their ID
        const user = await findUserById(userId)
        if (!user) {
            throw new Error("user not found with id : ", userId);
        }
        return user;
        
    } catch (error) {
        throw new Error(error.message);
    }
}


// Retrieves all users in the database
const getAllUsers = async () => {
    try {
         // Fetch all user records
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports = {
    createUser,
    findUserById,
    getUserByEmail,
    getUserProfileByToken,
    getAllUsers
};