// const jwtProvider = require("../config/jwtProvider.js");
// const userService = require("../services/user.service.js");

// // Middleware function to authenticate the user
// const authenticate = async(req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader) {
//             return res.status(401).send({ error: "Authorization header is missing" });
//         }

//         const token = authHeader.split(" ")[1];
//         if (!token) {
//             return res.status(401).send({ error: "Token not found" });
//         }

//         const userId = jwtProvider.generateToken(token);
//         const user = await userService.findUserById(userId);
//         if (!user) {
//             return res.status(401).send({ error: "User not found" });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         return res.status(500).send({ error: error.message });
//     }
// }

// // Exporting the authenticate middleware
// module.exports = authenticate;

const jwtProvider = require("../config/jwtProvider.js");
const userService = require("../services/user.service.js");

// Middleware function to authenticate the user
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ error: "Authorization header is missing" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({ error: "Token not found" });
        }

        const decoded = jwtProvider.verifyToken(token); // Use verifyToken
        if (!decoded || !decoded.userId) {
            return res.status(401).send({ error: "Invalid or expired token" });
        }

        const user = await userService.findUserById(decoded.userId); // Pass decoded userId
        if (!user) {
            return res.status(401).send({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(500).send({ error: "Authentication failed" });
    }
};

// Exporting the authenticate middleware
module.exports = authenticate;
