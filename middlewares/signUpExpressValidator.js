const {body, validationResult} = require('express-validator');

// Middleware for express validator
function signUpExpressValidator(req, res, next) {
    
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required') 

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
    
}

module.exports = signUpExpressValidator;