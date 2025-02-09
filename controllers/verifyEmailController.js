const UserModel = require("../models/userModel");

// Controller for email verification
async function verifyEmailController(req, res) {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: "Invalid or missing token" });
    }
    
    try {
        // Find user by verification token
        const user = await UserModel.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Update user to verified and remove the token
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({ message: "Email verified successfully. You can now log in." });
    } catch (error) {
        console.error("Email verification error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = verifyEmailController;
