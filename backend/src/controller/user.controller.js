const userService = require("../services/user.service.js"); // Import user service

const getUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            console.error("req.user is undefined"); // Log if req.user is undefined
            return res.status(401).send({ message: 'Please authenticate' });
        }

        const userId = req.user._id;
        console.log("Fetching profile for user ID:", userId); // Log user ID

        const user = await userService.getUserById(userId);
        if (!user) {
            console.log("User not found with ID:", userId); // Log user not found
            return res.status(404).send({ message: 'User not found' });
        }

        console.log("User profile fetched successfully:", user); // Log user profile
        res.status(200).send(user);
    } catch (error) {
        console.error("Error fetching user profile:", error.message); // Log the error
        res.status(500).send({ message: 'Internal server error' });
    }
};

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