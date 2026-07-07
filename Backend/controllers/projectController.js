import prisma from '../utils/prismaClient.js';

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @desc  Get all active projects (with their items)
 * @route GET /api/projects
 * @access Public
 */
export const getAllProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            where:   { isActive: true },
            orderBy: { sortOrder: 'asc' },
            include: {
                items: {
                    orderBy: { sortOrder: 'asc' },
                },
            },
        });

        res.status(200).json({ success: true, count: projects.length, data: { projects } });
    } catch (error) {
        console.error('Get all projects error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching projects', error: error.message });
    }
};

/**
 * @desc  Get a single project by slug (with its items)
 * @route GET /api/projects/:slug
 * @access Public
 */
export const getProjectBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const project = await prisma.project.findUnique({
            where:   { slug },
            include: {
                items: {
                    orderBy: { sortOrder: 'asc' },
                },
            },
        });

        if (!project) {
            return res.status(404).json({ success: false, message: `Project '${slug}' not found` });
        }

        res.status(200).json({ success: true, data: { project } });
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching project', error: error.message });
    }
};

/**
 * @desc  Create a new project (category)
 * @route POST /api/projects
 * @access Private (admin only)
 */
export const createProject = async (req, res) => {
    try {
        const { slug, title, subtitle, sortOrder } = req.body;

        if (!slug || !title) {
            return res.status(400).json({ success: false, message: 'slug and title are required' });
        }

        const project = await prisma.project.create({
            data: { slug, title, subtitle: subtitle ?? null, sortOrder: sortOrder ?? 0 },
        });

        res.status(201).json({ success: true, message: 'Project created', data: { project } });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ success: false, message: 'A project with this slug already exists' });
        }
        console.error('Create project error:', error);
        res.status(500).json({ success: false, message: 'Server error while creating project', error: error.message });
    }
};

/**
 * @desc  Update a project (title, subtitle, active status)
 * @route PUT /api/projects/:slug
 * @access Private (admin only)
 */
export const updateProject = async (req, res) => {
    try {
        const { slug } = req.params;
        const { title, subtitle, isActive, sortOrder } = req.body;

        const project = await prisma.project.update({
            where: { slug },
            data: {
                ...(title     !== undefined && { title }),
                ...(subtitle  !== undefined && { subtitle }),
                ...(isActive  !== undefined && { isActive }),
                ...(sortOrder !== undefined && { sortOrder }),
            },
        });

        res.status(200).json({ success: true, message: 'Project updated', data: { project } });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        console.error('Update project error:', error);
        res.status(500).json({ success: false, message: 'Server error while updating project', error: error.message });
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT ITEMS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @desc  Add an item to a project
 * @route POST /api/projects/:slug/items
 * @access Private (admin only)
 */
export const addProjectItem = async (req, res) => {
    try {
        const { slug } = req.params;
        const { clubId, description, imageUrl, sortOrder } = req.body;

        const project = await prisma.project.findUnique({ where: { slug } });
        if (!project) {
            return res.status(404).json({ success: false, message: `Project '${slug}' not found` });
        }

        const item = await prisma.projectItem.create({
            data: {
                projectId:   project.id,
                clubId:      clubId    ?? null,
                description: description ?? null,
                imageUrl:    imageUrl  ?? null,
                sortOrder:   sortOrder ?? 0,
            },
        });

        res.status(201).json({ success: true, message: 'Item added', data: { item } });
    } catch (error) {
        console.error('Add project item error:', error);
        res.status(500).json({ success: false, message: 'Server error while adding item', error: error.message });
    }
};

/**
 * @desc  Update a project item
 * @route PUT /api/projects/items/:itemId
 * @access Private (admin only)
 */
export const updateProjectItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { clubId, description, imageUrl, sortOrder } = req.body;

        const item = await prisma.projectItem.update({
            where: { id: itemId },
            data: {
                ...(clubId      !== undefined && { clubId }),
                ...(description !== undefined && { description }),
                ...(imageUrl    !== undefined && { imageUrl }),
                ...(sortOrder   !== undefined && { sortOrder }),
            },
        });

        res.status(200).json({ success: true, message: 'Item updated', data: { item } });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        console.error('Update project item error:', error);
        res.status(500).json({ success: false, message: 'Server error while updating item', error: error.message });
    }
};

/**
 * @desc  Delete a project item
 * @route DELETE /api/projects/items/:itemId
 * @access Private (admin only)
 */
export const deleteProjectItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        await prisma.projectItem.delete({ where: { id: itemId } });

        res.status(200).json({ success: true, message: 'Item deleted' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        console.error('Delete project item error:', error);
        res.status(500).json({ success: false, message: 'Server error while deleting item', error: error.message });
    }
};
