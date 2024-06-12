const jwt = require('jsonwebtoken')



const SECRET_KEY = 'your_secret_key';


  function GenerateToken(req, res, next)  {
    console.log(req.headers,"URL")
   const user = "AKMR"
    if (user === 'AKMR') {
        const userData = { id: 1, username: 'testuser' };

        // Generate JWT token
        const token = jwt.sign(userData, SECRET_KEY, { expiresIn: '1h' });
       
        // Set the token in an HTTP-only cookie
        res.cookie('tokenAuth', token, { httpOnly: true, sameSite: 'Strict',domain: 'localhost:3000' });

        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ message: 'Invalid credentials not Authorized' });
    }
};

module.exports = GenerateToken;