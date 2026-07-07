import express from 'express';
import { getContent, upsertContent, deleteContent } from '../controllers/contentController.js';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ── Public ─────────────────────────────────────────────────────────────────────
router.get('/',     getContent);
router.get('/:key', getContent);

// ── Admin only ─────────────────────────────────────────────────────────────────
router.put('/:key',    authenticate, requireAdmin, upsertContent);
router.delete('/:key', authenticate, requireAdmin, deleteContent);

export default router;