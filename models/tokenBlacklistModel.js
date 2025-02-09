const mongoose = require("mongoose");

// Stores blacklisted tokens along with their expiration time.
const tokenBlacklistSchema = new mongoose.Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});

const TokenModel = mongoose.model("tokenBlacklist", tokenBlacklistSchema);

module.exports = TokenModel;
