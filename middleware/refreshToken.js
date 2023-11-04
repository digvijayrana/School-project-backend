const jwt = require("jsonwebtoken");
const {generateAccessToken} = require('../middleware/verifyToken')
const Redis = require('../helper/redis')

const callRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const redis = await new Redis()
    const redisToken = await redis.get(refreshToken)
    if (!redisToken) {
      throw new Error('Invalid refresh token')
    }
    const decoded = await jwt.verify(refreshToken, process.env.REFRESH_SESSION_SECRET);
    const accessToken = await generateAccessToken(decoded.role, decoded.fullName,decoded.email)
    res.status(200).json({ message:'successfull',accessToken:accessToken ,refreshToken:refreshToken});
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
}


module.exports = {
  callRefreshToken
}