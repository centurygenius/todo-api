
// Middleware for role-based authorization
function authorizeRolesMiddleware(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        next();
    };
}

module.exports = authorizeRolesMiddleware;
