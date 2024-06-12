const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';

// Middleware to verify the token
function verifyToken(req, res, next) {
    console.log(req.headers,"cookies in back")
    // Get the token from the request cookies or headers
    const token = req.cookies.tokenAuth || req.headers.cookies

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        // Attach the decoded user data to the request object
        req.user = decoded;
        next();
    });
}

module.exports= verifyToken