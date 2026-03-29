import supabase from '../utils/supabaseClient.js';

// @desc    Verify Supabase JWT and attach user to request
export const authenticate = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
        }

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
        }

        req.user = {
            id: user.id,
            email: user.email,
            username: user.user_metadata.username,
            role: user.user_metadata.role,
            club_id: user.user_metadata.club_id ?? null,
        };

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ success: false, message: 'Server error during authentication', error: error.message });
    }
};

// @desc    Require admin role
export const requireAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') return next();
    res.status(403).json({ success: false, message: 'Access denied. Admin role required.' });
};

// @desc    Require admin role OR ownership of the club
export const requireClubAccess = (req, res, next) => {
    const { clubId } = req.params;

    if (req.user.role === 'admin') return next();

    if (req.user.role === 'club' && req.user.club_id === clubId) return next();

    return res.status(403).json({
        success: false,
        message: 'Access denied. You do not have permission to modify this club.'
    });
};