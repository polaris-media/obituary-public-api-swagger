const jwt = require('jsonwebtoken');

const TOKEN_SECRET = 'your-secret-key'; // Use the same secret key used to sign tokens

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  console.log('Authorization Header:', req.headers['authorization']);

  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  // Verify the token
  jwt.verify(token, TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden', message: 'Invalid token' });
    }

    // Add the payload (decoded token data) to the request object for use in the endpoint
    req.user = payload;
    next();
  });
}

module.exports = authenticateToken;
