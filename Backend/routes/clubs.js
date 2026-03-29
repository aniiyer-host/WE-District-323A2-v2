import express from 'express';
import {
    getAllClubs,
    getClubById,
    createClub,
    updateClub,
    deleteClub,
    permanentDeleteClub,
    getEventsByCategory,
    cleanupPastEvents
} from '../controllers/clubController.js';
import { authenticate, requireAdmin, requireClubAccess } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ── Public (no auth needed) ──────────────────────────────────────────────────
router.get('/', getAllClubs);
router.get('/events/:category', getEventsByCategory);
router.get('/:clubId', getClubById);

// ── Admin only ───────────────────────────────────────────────────────────────
router.post('/', authenticate, requireAdmin, createClub);
router.delete('/:clubId', authenticate, requireAdmin, deleteClub);
router.delete('/:clubId/permanent', authenticate, requireAdmin, permanentDeleteClub);

// ── Admin or club owner ──────────────────────────────────────────────────────
router.put('/:clubId', authenticate, requireClubAccess, updateClub);
router.delete('/:clubId/cleanup-past-events', authenticate, requireClubAccess, cleanupPastEvents);

export default router;