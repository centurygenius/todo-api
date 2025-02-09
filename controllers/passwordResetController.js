const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Request password reset
async function passwordResetController(req, res) {
    const { token } = req.query;
    const { newPassword } = req.body;

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const resetEntry = await UserModel.findOne({ token });

        if (!resetEntry || resetEntry.email !== decoded.email) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password
        await UserModel.findOneAndUpdate({ email: decoded.email }, { password: hashedPassword });

        // Remove the reset token entry
        await UserModel.deleteOne({ token });

        res.status(200).json({ message: "Password has been reset successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = passwordResetController;
