import prisma from '../utils/prismaClient.js';

// ─────────────────────────────────────────────────────────────────────────────
// SITE CONTENT  (CMS key-value store)
// Each "key" maps to a JSON blob of page-specific content.
//
// Reserved keys (Phase 5):
//   landing_hero      — stats, CTA text
//   landing_president — name, photo, bio, title
//   about_mission     — mission text, vision text
//   about_founders    — founders array
//   about_presidents  — past presidents array
//   about_emblem      — emblem description items
//   about_slogan      — slogan quotes array
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @desc  Get all content blocks (or a single block by key)
 * @route GET /api/content
 * @route GET /api/content/:key
 * @access Public
 */
export const getContent = async (req, res) => {
    try {
        const { key } = req.params;

        if (key) {
            const content = await prisma.siteContent.findUnique({ where: { key } });
            if (!content) {
                return res.status(404).json({ success: false, message: `Content block '${key}' not found` });
            }
            return res.status(200).json({ success: true, data: { content } });
        }

        // Return all blocks (used by admin dashboard content editor)
        const contents = await prisma.siteContent.findMany({ orderBy: { key: 'asc' } });
        res.status(200).json({ success: true, count: contents.length, data: { contents } });
    } catch (error) {
        console.error('Get content error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching content', error: error.message });
    }
};

/**
 * @desc  Create or replace a content block
 * @route PUT /api/content/:key
 * @access Private (admin only)
 */
export const upsertContent = async (req, res) => {
    try {
        const { key } = req.params;
        const { value } = req.body;

        if (!key || value === undefined) {
            return res.status(400).json({ success: false, message: 'key and value are required' });
        }

        const content = await prisma.siteContent.upsert({
            where:  { key },
            create: { key, value, updatedBy: req.user?.id ?? null },
            update: { value, updatedBy: req.user?.id ?? null },
        });

        res.status(200).json({ success: true, message: 'Content updated', data: { content } });
    } catch (error) {
        console.error('Upsert content error:', error);
        res.status(500).json({ success: false, message: 'Server error while updating content', error: error.message });
    }
};

/**
 * @desc  Delete a content block
 * @route DELETE /api/content/:key
 * @access Private (admin only)
 */
export const deleteContent = async (req, res) => {
    try {
        const { key } = req.params;

        await prisma.siteContent.delete({ where: { key } });

        res.status(200).json({ success: true, message: `Content block '${key}' deleted` });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Content block not found' });
        }
        console.error('Delete content error:', error);
        res.status(500).json({ success: false, message: 'Server error while deleting content', error: error.message });
    }
};
