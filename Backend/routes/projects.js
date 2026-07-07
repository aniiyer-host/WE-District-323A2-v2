import express from 'express';
import {
    getAllProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    addProjectItem,
    updateProjectItem,
    deleteProjectItem,
} from '../controllers/projectController.js';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ── Public ────────────────────────────────────────────────────────────────────
router.get('/',           getAllProjects);
router.get('/:slug',      getProjectBySlug);

// ── Admin only ────────────────────────────────────────────────────────────────
router.post('/',                       authenticate, requireAdmin, createProject);
router.put('/:slug',                   authenticate, requireAdmin, updateProject);

// Project item sub-resource
router.post('/:slug/items',            authenticate, requireAdmin, addProjectItem);
router.put('/items/:itemId',           authenticate, requireAdmin, updateProjectItem);
router.delete('/items/:itemId',        authenticate, requireAdmin, deleteProjectItem);

export default router;