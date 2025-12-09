import express from 'express';
import { register, login, logout, getCurrentUser } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authenticate, getCurrentUser);
router.post('/logout', authenticate, logout);

export default router;
