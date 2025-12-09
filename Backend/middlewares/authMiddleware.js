import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// @desc    Verify JWT token and attach user to request
export const authenticate = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header (Bearer token)
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // If no token found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, no token provided'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this');

            // Get user from token (exclude password)
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authorized, user not found'
                });
            }

            // Attach user to request object
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token invalid or expired'
            });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during authentication',
            error: error.message
        });
    }
};

// @desc    Require admin role
export const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Admin role required.'
        });
    }
};

// @desc    Require admin role OR club ownership
// This middleware checks if the user is either an admin OR owns the specific club
export const requireClubAccess = (req, res, next) => {
    try {
        const { clubId } = req.params;

        // Admin has access to everything
        if (req.user.role === 'admin') {
            return next();
        }

        // Club user can only access their own club
        if (req.user.role === 'club' && req.user.clubId === clubId) {
            return next();
        }

        // No access
        return res.status(403).json({
            success: false,
            message: 'Access denied. You do not have permission to modify this club.'
        });
    } catch (error) {
        console.error('Authorization error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during authorization',
            error: error.message
        });
    }
};
