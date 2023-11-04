/*eslint-env es6*/ 
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const Redis = require('../helper/redis')



const verifyToken = (requiredRoles) => (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).send('A token is required for authentication');
  }
  const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer" header
  if (!token) {
    return res.status(403).send('A valid Bearer token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN);
    req.user = decoded;
    // Check if user role is allowed
    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).send('Access denied. Insufficient role privileges.');
    }
    next();
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};


async function generateAccessToken(role,name,email) {
  return jwt.sign({ role:role,fullName:name ,email:email}, ACCESS_TOKEN, { expiresIn: '1h' });
}

async function generateRefreshToken(role,name,email) {
  const refreshToken = jwt.sign({role:role,fullName:name,email:email }, process.env.REFRESH_SESSION_SECRET);
  const redis = new Redis()
  await redis.set(refreshToken,role)
  return refreshToken;
}

module.exports = {
  verifyToken,
  generateAccessToken,
  generateRefreshToken
};