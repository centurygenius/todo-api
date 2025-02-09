const jwt = require("jsonwebtoken");
const TokenModel = require("../models/tokenBlacklistModel");

// Sign out user
async function signOutController(req, res) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(400).json({ message: "No token provided!" });
        }

        // Decode token to get expiration time
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            return res.status(400).json({ message: "Invalid token" });
        }

        // Convert exp time to milliseconds
        const expirationTime = new Date(decoded.exp * 1000);

        // Save token to blacklist
        await TokenModel.create({ token, expiresAt: expirationTime });

        res.status(200).json({ message: "Logout successful!" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
}

module.exports = signOutController;
