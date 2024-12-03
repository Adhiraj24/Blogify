const { validateToken } = require("../services/authService");

function checkForAuth(tokens) {
    return (req, res, next) => {
        // Access token from cookies
        const tokenValue = req.cookies[tokens]

        // console.log(tokenValue);

        if (!tokenValue) {
            return next(); // Proceed if no token is found (user might be logged out)
        }

        try {
            // Validate token and attach user to request
            const payload = validateToken(tokenValue);
            req.user = payload; // Attach the payload (user information) to the request object for further use
        } catch (error) {
            console.error('Token validation failed:', error.message); // Log error for debugging
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid Token' }); // Unauthorized error if token is invalid
        }

        next(); // Continue to the next middleware or route handler
    };
}

module.exports = { checkForAuth };
