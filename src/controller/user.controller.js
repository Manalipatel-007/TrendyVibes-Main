const userService = require("../services/user.service.js"); // Import user service

const getUserProfile = async(req, res) => {
    const jwt = req.headers.authorization?.split(" ")[1]; // Get JWT token from authorization header
    console.log("req ", jwt);
    try {
        if(!jwt){
            return res.status(404).send({error: "token not found"}); // Send error if token not found
        }
        const user = await userService.getUserProfileByToken(jwt); // Get user profile by token
        console.log("user data", user);

        return res.status(200).send(user); // Send user profile with status 200
    } catch (error) {
        return res.status(500).send({error: error.message}); // Send error with status 500
    }
}

const getAllUsers = async(req, res) => {
    try {
        const users = await userService.getAllUsers(); // Get all users
        return res.status(200).send(users); // Send users with status 200
    } catch (error) {
        return res.status(500).send({error: error.message}); // Send error with status 500
    }
}

module.exports = {
    getUserProfile, // Export getUserProfile function
    getAllUsers, // Export getAllUsers function
}