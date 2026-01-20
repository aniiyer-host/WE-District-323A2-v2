import express from 'express';
import {
    getAllClubs,
    getClubById,
    createClub,
    updateClub,
    deleteClub,
    permanentDeleteClub,
    getEventsByCategory
} from '../controllers/clubController.js';
import { authenticate, requireAdmin, requireClubAccess } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes - anyone can view clubs
router.get('/', getAllClubs);
router.get('/events/:category', getEventsByCategory);
router.get('/:clubId', getClubById);

// Protected routes - require authentication
// Create club - admin only
router.post('/', authenticate, requireAdmin, createClub);

// Update club - admin or club owner
router.put('/:clubId', authenticate, requireClubAccess, updateClub);

// Soft delete club - admin only
router.delete('/:clubId', authenticate, requireAdmin, deleteClub);

// Permanent delete club - admin only
router.delete('/:clubId/permanent', authenticate, requireAdmin, permanentDeleteClub);

export default router;
