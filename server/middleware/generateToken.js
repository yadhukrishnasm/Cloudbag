const jwt = require('jsonwebtoken');
const secretKey = 'cloudbag';

function generateToken(user) {
  // Customize the token payload based on your requirements
  const payload = {
    username: user.username,
    // Add more user-related data if needed
  };

  // Token expiration time (adjust as needed)
  const expiresIn = '1h';

  // Sign the token with the secret key
  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
}

module.exports = generateToken;