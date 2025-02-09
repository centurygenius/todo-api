const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");

async function requestPasswordResetController(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

         // Check if user exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        if (!resetToken) {
            return res.status(400).json({ message: "Something went wrong!" });
        }

        // Save token and expiry time to existing user
        await UserModel.findByIdAndUpdate(user._id, {
            resetPasswordToken: resetToken,
            resetPasswordExpire: Date.now() + 3600000, // 1 hour expiry
        });

        // Send reset email
        const resetUrl = `http://localhost:3000/api/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            text: `Click the link below to reset your password: ${resetUrl}`,
        };

        // Check if transporter exists
        if (!transporter || typeof transporter.sendMail !== "function") {
            console.error("Nodemailer transporter is not configured correctly");
            return res.status(500).json({ message: "Email service is not available" });
        }

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset email sent successfully" });

    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = requestPasswordResetController;