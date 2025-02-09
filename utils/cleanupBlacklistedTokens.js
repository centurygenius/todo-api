const TokenModel = require("../models/tokenBlacklistModel");

// Function to clean up blacklisted tokens
async function cleanupBlacklistedTokens(){
    try {
        await TokenModel.deleteMany({ expiresAt: { $lt: new Date() } });
        console.log("Expired blacklisted tokens removed");
    } catch (error) {
        console.error("Error cleaning up blacklisted tokens", error);
    }
};

module.exports = cleanupBlacklistedTokens;
