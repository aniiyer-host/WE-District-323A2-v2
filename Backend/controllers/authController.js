import supabase from '../utils/supabaseClient.js';
import prisma from '../utils/prismaClient.js';

// @desc    Register a new user (public — pending admin approval)
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    try {
        const { email, username, password, clubId } = req.body;

        if (!email || !username || !password || !clubId) {
            return res.status(400).json({ success: false, message: 'Please provide email, username, password, and club' });
        }

        // Create auth user — NOT confirmed so they cannot log in until approved
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: false,
            user_metadata: {
                username: username.toLowerCase().trim(),
                role: 'club',
                club_id: clubId,
                status: 'pending',
            }
        });

        if (error) {
            // Surface duplicate email clearly
            if (error.message.includes('already')) {
                return res.status(400).json({ success: false, message: 'An account with this email already exists' });
            }
            return res.status(400).json({ success: false, message: error.message });
        }

        res.status(201).json({
            success: true,
            message: 'Registration submitted. You will be able to log in once an admin approves your account.',
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration', error: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            // Supabase returns "Email not confirmed" for users pending approval
            if (error.message.includes('Email not confirmed')) {
                return res.status(401).json({ success: false, message: 'Your account is pending admin approval.' });
            }
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const { id, user_metadata } = data.user;

        // Extra check in case metadata status is still pending
        if (user_metadata.status === 'pending') {
            return res.status(401).json({ success: false, message: 'Your account is pending admin approval.' });
        }

        // Attach club name
        let club_name = null;
        if (user_metadata.club_id) {
            const club = await prisma.club.findUnique({
                where: { clubId: user_metadata.club_id },
                select: { name: true }
            });
            if (club) club_name = club.name;
        }

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id,
                    email: data.user.email,
                    username: user_metadata.username,
                    role: user_metadata.role,
                    club_id: user_metadata.club_id ?? null,
                    club_name,
                },
                token: data.session.access_token,
                refresh_token: data.session.refresh_token,
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
    }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
    try {
        const { id, email, username, role, club_id } = req.user;

        let club_name = null;
        if (club_id) {
            const club = await prisma.club.findUnique({
                where: { clubId: club_id },
                select: { name: true }
            });
            if (club) club_name = club.name;
        }

        res.status(200).json({
            success: true,
            data: { user: { id, email, username, role, club_id, club_name } }
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
    res.status(200).json({ success: true, message: 'Logout successful' });
};

// @desc    Get all pending users (awaiting approval)
// @route   GET /api/auth/pending
// @access  Private (admin only)
export const getPendingUsers = async (req, res) => {
    try {
        const { data, error } = await supabase.auth.admin.listUsers();

        if (error) throw error;

        const pending = data.users
            .filter(u => u.user_metadata?.status === 'pending')
            .map(u => ({
                id: u.id,
                email: u.email,
                username: u.user_metadata.username,
                club_id: u.user_metadata.club_id,
                created_at: u.created_at,
            }));

        res.status(200).json({ success: true, count: pending.length, data: { users: pending } });
    } catch (error) {
        console.error('Get pending users error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Approve a pending user
// @route   PATCH /api/auth/approve/:userId
// @access  Private (admin only)
export const approveUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const { data, error } = await supabase.auth.admin.updateUserById(userId, {
            email_confirm: true,
            user_metadata: { status: 'approved' }
        });

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: 'User approved successfully',
            data: {
                user: {
                    id: data.user.id,
                    email: data.user.email,
                    username: data.user.user_metadata.username,
                    club_id: data.user.user_metadata.club_id,
                }
            }
        });
    } catch (error) {
        console.error('Approve user error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Reject and delete a pending user
// @route   DELETE /api/auth/reject/:userId
// @access  Private (admin only)
export const rejectUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const { error } = await supabase.auth.admin.deleteUser(userId);

        if (error) throw error;

        res.status(200).json({ success: true, message: 'User rejected and removed' });
    } catch (error) {
        console.error('Reject user error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Get all registered users (approved)
// @route   GET /api/auth/users
// @access  Private (admin only)
export const getAllUsers = async (req, res) => {
    try {
        const { data, error } = await supabase.auth.admin.listUsers();
        if (error) throw error;

        // Exclude pending users (not confirmed) — those are shown in the pending tab
        const users = data.users
            .filter(u => u.email_confirmed_at && u.user_metadata?.status !== 'pending')
            .map(u => ({
                id: u.id,
                email: u.email,
                username: u.user_metadata?.username ?? null,
                role: u.user_metadata?.role ?? null,
                club_id: u.user_metadata?.club_id ?? null,
                created_at: u.created_at,
                last_sign_in: u.last_sign_in_at ?? null,
            }));

        res.status(200).json({ success: true, count: users.length, data: { users } });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Update a user's role and/or club_id
// @route   PATCH /api/auth/users/:userId
// @access  Private (admin only)
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role, clubId } = req.body;

        if (!role || !['admin', 'club'].includes(role)) {
            return res.status(400).json({ success: false, message: 'Role must be admin or club' });
        }

        if (role === 'club' && !clubId) {
            return res.status(400).json({ success: false, message: 'Club ID is required for club role' });
        }

        // Fetch current metadata so we don't wipe other fields
        const { data: existing, error: fetchError } = await supabase.auth.admin.getUserById(userId);
        if (fetchError) throw fetchError;

        const { data, error } = await supabase.auth.admin.updateUserById(userId, {
            user_metadata: {
                ...existing.user.user_metadata,
                role,
                club_id: role === 'club' ? clubId : null,
            }
        });

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: {
                user: {
                    id: data.user.id,
                    email: data.user.email,
                    username: data.user.user_metadata.username,
                    role: data.user.user_metadata.role,
                    club_id: data.user.user_metadata.club_id ?? null,
                }
            }
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Delete a user permanently
// @route   DELETE /api/auth/users/:userId
// @access  Private (admin only)
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Prevent admin from deleting themselves
        if (userId === req.user.id) {
            return res.status(400).json({ success: false, message: 'You cannot delete your own account' });
        }

        const { error } = await supabase.auth.admin.deleteUser(userId);
        if (error) throw error;

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};