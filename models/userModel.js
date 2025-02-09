const mongoose = require('mongoose');


// Create schema for user model
const userSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["admin", "manager", "user"], default: "user"},
    isVerified: {type: Boolean, default: false},
    verificationToken: {type: String},
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpire: { type: Date, default: null },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;

