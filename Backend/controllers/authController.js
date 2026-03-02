import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || 'your-secret-key-change-this',
        { expiresIn: '7d' } // Token expires in 7 days
    );
};

// @desc    Register a new user (Admin only - will add middleware later)
// @route   POST /api/auth/register
// @access  Public (will be restricted to admin later)
export const register = async (req, res) => {
    try {
        const { username, password, role, clubId } = req.body;

        // Validation
        if (!username || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username, password, and role'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists'
            });
        }

        // For club role, clubId is required
        if (role === 'club' && !clubId) {
            return res.status(400).json({
                success: false,
                message: 'Club ID is required for club role'
            });
        }

        // Create user
        const user = await User.create({
            username,
            password,
            role,
            clubId: role === 'club' ? clubId : null
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user,
                token
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            error: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username and password'
            });
        }

        // Find user (need to explicitly select password as it's excluded by default)
        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        // Remove password from response
        const userResponse = user.toJSON();

        // If user is a club, fetch club details
        if (user.role === 'club' && user.clubId) {
            try {
                const Club = (await import('../models/Club.js')).default;
                const club = await Club.findOne({ clubId: user.clubId });
                if (club) {
                    userResponse.club_name = club.name;
                }
            } catch (error) {
                console.error('Error fetching club details:', error);
            }
        }

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: userResponse,
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
            error: error.message
        });
    }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
    try {
        // req.user is set by authenticate middleware
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const userResponse = user.toJSON();

        // If user is a club, fetch club details
        if (user.role === 'club' && user.clubId) {
            try {
                const Club = (await import('../models/Club.js')).default;
                const club = await Club.findOne({ clubId: user.clubId });
                if (club) {
                    userResponse.club_name = club.name;
                }
            } catch (error) {
                console.error('Error fetching club details:', error);
            }
        }

        res.status(200).json({
            success: true,
            data: {
                user: userResponse
            }
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Logout user (client-side handling)
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
    // With JWT, logout is primarily handled on client-side by removing the token
    // This endpoint is here for consistency and future server-side session management
    res.status(200).json({
        success: true,
        message: 'Logout successful'
    });
};
