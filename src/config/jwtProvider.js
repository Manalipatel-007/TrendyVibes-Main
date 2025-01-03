const jwt = require("jsonwebtoken");
const secret = 'sdjhfsfjsdfshjcshjcbnbcsdbcdsbcjhcjdshcjdhfcdfcdcfdfcdfcdfcsd';

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, secret, { expiresIn: '2h' });
    console.log("Generated Token:", token); // Log the generated token
    return token;
};

const verifyToken = (token) => {
    console.log("Verifying Token:", token); // Log the token being verified
    try {
        const decoded = jwt.verify(token, secret);
        console.log("Token verified successfully:", decoded); // Log successful verification
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error); // Log the entire error object
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
};