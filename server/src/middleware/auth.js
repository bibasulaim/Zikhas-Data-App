const { verifyToken, getTokenFromRequest } = require('../config/jwt');

/**
 * Verify JWT Token Middleware
 * Checks if token exists and is valid
 * Attaches decoded token to req.user
 */
const authenticate = (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login to continue.',
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Attach decoded token to request
    req.user = decoded;
    req.token = token;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Invalid or expired token.',
    });
  }
};

/**
 * Check if user has specific role
 * @param {string|array} allowedRoles - Role(s) allowed to access
 * @returns {function} Middleware function
 */
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user is authenticated (authenticate middleware should be called first)
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required.',
        });
      }

      // Convert single role to array
      const roles = Array.isArray(allowedRoles)
        ? allowedRoles
        : [allowedRoles];

      // Check if user role is in allowed roles
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Only ${roles.join(', ')} can access this resource.`,
        });
      }

      next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: 'Authorization failed.',
      });
    }
  };
};

/**
 * Optional Authentication Middleware
 * Authenticates user if token is provided, but allows access without token
 */
const optionalAuth = (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (token) {
      const decoded = verifyToken(token);
      req.user = decoded;
      req.token = token;
    }

    next();
  } catch (error) {
    // Continue without user if token verification fails
    next();
  }
};

/**
 * Check if user is admin
 * Must be used after authenticate middleware
 */
const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required.',
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Authorization failed.',
    });
  }
};

/**
 * Check if user is regular user
 * Must be used after authenticate middleware
 */
const isUser = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    if (req.user.role !== 'user') {
      return res.status(403).json({
        success: false,
        message: 'User access required.',
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Authorization failed.',
    });
  }
};

module.exports = {
  authenticate,
  authorize,
  optionalAuth,
  isAdmin,
  isUser,
};