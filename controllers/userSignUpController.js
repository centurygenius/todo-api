const UserModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require("../config/nodemailer");

// Controller for user sign-up
async function userSignUpController(req, res){

    const {name, email, password, role} = req.body;
    try{

        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields are required" })
        }
    
        // Check if user already exists
        const confirmUserEmail = await UserModel.findOne({email})
        if (confirmUserEmail){
            return res.status(400).json({ message: "User already exists with this email" })
        }

        // Generate email verification token
        const verificationToken = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "1h"})

        if(!verificationToken){
            return res.status(400).json({message: "Something went wrong!"})
        }
       
        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if(!hashedPassword){
            return res.status(400).json({message: "Somehing went wrong!"})
        }

        // Create new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            role,
            verificationToken
        })

        // Save user data
        const savedUser = await newUser.save();

        if(!savedUser){
            return res.status(400).json({message: "User creation failed!"})
        }

        // Send verification email
        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({
            message: "User creation is successful. Check your email for verification link",
            success: true,
            user: savedUser,
        })

    }catch (error) { 
        const err = error.message
        console.log(err);
        res.status(500).json({ message: "Server error", error})  
    }
}

module.exports = userSignUpController;