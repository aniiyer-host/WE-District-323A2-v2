import express from 'express';
import {
    getImageKitAuth,
    deleteImageKitFile,
    uploadSupabaseFile,
    deleteSupabaseFile
} from '../controllers/uploadController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Auth credentials for client-side ImageKit uploads
router.get('/imagekit/auth', authenticate, getImageKitAuth);

// Delete a file from ImageKit by fileId (server-side, uses private key)
router.delete('/imagekit/:fileId', authenticate, deleteImageKitFile);

// Supabase Storage endpoints
router.post('/supabase', authenticate, uploadSupabaseFile);
router.delete('/supabase', authenticate, deleteSupabaseFile);

export default router;
