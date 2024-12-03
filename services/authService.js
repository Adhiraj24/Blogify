const jwt = require('jsonwebtoken');
const secret = 'adhirajojha';

function createToken(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName, // Make sure fullName is in the user object
        email: user.email,
        profileImage: user.profileImage,
        role: user.role
    };

    const token = jwt.sign(payload, secret, { expiresIn: '7d' });  // Optional expiration time
    return token;
}

function validateToken(token) {
    try {
        const payload = jwt.verify(token, secret);
        return payload;
    } catch (error) {
        console.error('Token validation failed:', error.message);
        throw new Error('Invalid or expired token');
    }
}

module.exports = { createToken, validateToken };
