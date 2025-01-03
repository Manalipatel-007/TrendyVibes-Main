const { verifyToken } = require('../config/jwtProvider');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization header received in middleware:", authHeader); // Log the authorization header received in middleware

    if (!authHeader) {
        console.error("No token provided in the authorization header");
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the 'Bearer ' prefix
    console.log("Token extracted from header:", token); // Log the extracted token

    if (!token) {
        console.error("Token not found after splitting the authorization header");
        return res.status(401).json({ message: 'Token not found' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        console.error("Failed to authenticate token:", token); // Log the token that failed authentication
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    console.log("Token decoded successfully:", decoded); // Log the decoded token
    req.user = decoded; // Set the decoded token to req.user
    req.userId = decoded.userId;
    next();
};

module.exports = authMiddleware;
