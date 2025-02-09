const jwt = require("jsonwebtoken");
const TokenModel = require("../models/tokenBlacklistModel");
//const redisClient = require("../config/redis");

async function authMiddleware(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided!" });
    }

    // Check if token is blacklisted
    const isBlacklisted = await TokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Token is blacklisted. Please log in again!" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request
        next(); // Continue to the next middleware or route
    } catch (error) {
        res.status(401).json({ message: "Invalid token!" });
    }
}

module.exports = authMiddleware;
