const jwt = require('jsonwebtoken');

/**
 * Generate JWT Token
 * @param {string} userId - User ID
 * @param {string} role - User role (user or admin)
 * @returns {string} JWT Token
 */
const generateToken = (userId, role = 'user') => {
  const payload = {
    userId,
    role,
    iat: Math.floor(Date.now() / 1000),
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });

  return token;
};

/**
 * Verify JWT Token
 * @param {string} token - JWT Token to verify
 * @returns {object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw error;
  }
};

/**
 * Decode JWT Token without verification
 * @param {string} token - JWT Token to decode
 * @returns {object} Decoded token payload
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

/**
 * Get token from request headers
 * @param {object} req - Express request object
 * @returns {string|null} Token or null if not found
 */
const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
};

/**
 * Refresh JWT Token
 * @param {string} token - Old JWT Token
 * @returns {string} New JWT Token
 * @throws {Error} If token is invalid
 */
const refreshToken = (token) => {
  try {
    const decoded = verifyToken(token);
    
    // Generate new token with same payload
    return generateToken(decoded.userId, decoded.role);
  } catch (error) {
    throw new Error('Cannot refresh token: ' + error.message);
  }
};

/**
 * Create refresh token (longer expiration)
 * @param {string} userId - User ID
 * @param {string} role - User role
 * @returns {string} Refresh token
 */
const generateRefreshToken = (userId, role = 'user') => {
  const payload = {
    userId,
    role,
    type: 'refresh',
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  return token;
};

/**
 * Get token expiration time
 * @param {string} token - JWT Token
 * @returns {number} Expiration timestamp
 */
const getTokenExpiration = (token) => {
  const decoded = decodeToken(token);
  return decoded ? decoded.exp * 1000 : null;
};

/**
 * Check if token is expired
 * @param {string} token - JWT Token
 * @returns {boolean} True if token is expired
 */
const isTokenExpired = (token) => {
  const expirationTime = getTokenExpiration(token);
  return expirationTime ? expirationTime < Date.now() : true;
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
  getTokenFromRequest,
  refreshToken,
  generateRefreshToken,
  getTokenExpiration,
  isTokenExpired,
};
