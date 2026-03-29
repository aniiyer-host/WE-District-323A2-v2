import express from 'express';
import {
    register,
    login,
    logout,
    getCurrentUser,
    getPendingUsers,
    approveUser,
    rejectUser,
    getAllUsers,
    updateUser,
    deleteUser,
} from '../controllers/authController.js';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public
router.post('/register', register);
router.post('/login', login);

// Authenticated
router.get('/me', authenticate, getCurrentUser);
router.post('/logout', authenticate, logout);

// Admin — pending approvals
router.get('/pending', authenticate, requireAdmin, getPendingUsers);
router.patch('/approve/:userId', authenticate, requireAdmin, approveUser);
router.delete('/reject/:userId', authenticate, requireAdmin, rejectUser);

// Admin — user management
router.get('/users', authenticate, requireAdmin, getAllUsers);
router.patch('/users/:userId', authenticate, requireAdmin, updateUser);
router.delete('/users/:userId', authenticate, requireAdmin, deleteUser);

export default router;