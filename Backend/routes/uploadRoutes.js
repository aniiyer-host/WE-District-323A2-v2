import express from 'express';
import { getImageKitAuth } from '../controllers/uploadController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// If you want this public, remove `protect`.
router.get('/imagekit/auth', authenticate, getImageKitAuth);

export default router;
