const mongoose = require("mongoose");

// Schema for tokenBlacklist to store blacklisted tokens along with their expiration time.
const tokenBlacklistSchema = new mongoose.Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});

const TokenModel = mongoose.model("tokenBlacklist", tokenBlacklistSchema);

module.exports = TokenModel;
