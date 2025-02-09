const express = require("express");
const router = express.Router();

const userSignUpController = require("../controllers/userSignUpController");
const userSignInController = require("../controllers/userSignInController");
const verifyEmailController = require("../controllers/verifyEmailController");
const signOutController = require("../controllers/signOutController");
const requestPasswordResetController = require("../controllers/requestPasswordResetController");
const passwordResetController = require("../controllers/passwordResetController");
const authMiddleware = require("../middlewares/authMiddleware");
const signUpExpressValidator = require("../middlewares/signUpExpressValidator");


// =================== USER ROUTES ===================
router.post("/signup", signUpExpressValidator, userSignUpController);
router.post("/signin", userSignInController);
router.post("/signout", authMiddleware, signOutController);
router.post("/request-password-reset", requestPasswordResetController);
router.post("/reset-password", passwordResetController);
router.get("/verify-email", verifyEmailController);

module.exports = router;
