import prisma from '../utils/prismaClient.js';
import { deleteFromImageKit } from '../utils/eventCleanup.js';

const clubInclude = {
    eventRecords: {
        orderBy: [
            { date: 'desc' },
            { createdAt: 'desc' },
        ],
    },
};

const toDateOrNull = (value) => {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};

const normalizeEventInput = (event) => ({
    id: event.id || undefined,
    title: event.title || 'Event',
    description: event.description || null,
    date: toDateOrNull(event.date),
    location: event.location || null,
    category: event.category || null,
    coverImage: event.cover_image || event.coverImage || null,
    images: (event.images || [])
        .map(img => (typeof img === 'string' ? img : img?.url))
        .filter(Boolean)
        .slice(0, 2),
    isFeatured: event.isFeatured ?? event.is_featured ?? false,
});

const normalizeLegacyEvent = (event) => ({
    ...event,
    cover_image: event.cover_image || event.coverImage || '',
    coverImage: event.coverImage || event.cover_image || '',
    images: (event.images || [])
        .map(img => (typeof img === 'string' ? img : img?.url))
        .filter(Boolean)
        .slice(0, 2),
});

const serializeEvent = (event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date ? event.date.toISOString() : null,
    location: event.location,
    category: event.category,
    cover_image: event.coverImage || '',
    coverImage: event.coverImage || '',
    images: event.images || [],
    is_featured: event.isFeatured,
    isFeatured: event.isFeatured,
    created_at: event.createdAt?.toISOString?.() ?? null,
    updated_at: event.updatedAt?.toISOString?.() ?? null,
});

const getClubEvents = (club) => {
    if (Array.isArray(club.eventRecords) && club.eventRecords.length > 0) {
        return club.eventRecords.map(serializeEvent);
    }

    return Array.isArray(club.legacyEvents)
        ? club.legacyEvents.map(normalizeLegacyEvent)
        : [];
};

const serializeClub = (club) => ({
    id: club.id,
    club_id: club.clubId,
    name: club.name,
    description: club.description,
    president: club.president,
    events: getClubEvents(club),
    images: club.images || [],
    cover_image: club.coverImage,
    logo: club.logo,
    established: club.established?.toISOString?.() ?? null,
    is_active: club.isActive,
    created_at: club.createdAt?.toISOString?.() ?? null,
    updated_at: club.updatedAt?.toISOString?.() ?? null,
});

const sanitizeEvents = (events = []) => {
    const trimmedEvents = events
        .map(normalizeLegacyEvent)
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    const keptEvents = trimmedEvents.slice(0, 20);
    const removedEvents = trimmedEvents.slice(20);

    return { keptEvents, removedEvents };
};

const clubDataFromRequest = (body) => ({
    ...(body.name !== undefined && { name: body.name }),
    ...(body.description !== undefined && { description: body.description || null }),
    ...(body.president !== undefined && { president: body.president || null }),
    ...(body.images !== undefined && { images: Array.isArray(body.images) ? body.images : [] }),
    ...(body.cover_image !== undefined && { coverImage: body.cover_image || null }),
    ...(body.coverImage !== undefined && { coverImage: body.coverImage || null }),
    ...(body.logo !== undefined && { logo: body.logo || null }),
    ...(body.established !== undefined && { established: toDateOrNull(body.established) }),
    ...(body.is_active !== undefined && { isActive: body.is_active }),
    ...(body.isActive !== undefined && { isActive: body.isActive }),
});

const replaceClubEvents = async (tx, clubId, events) => {
    await tx.event.deleteMany({ where: { clubId } });

    for (const event of events.map(normalizeEventInput)) {
        await tx.event.create({
            data: {
                ...(event.id && { id: event.id }),
                clubId,
                title: event.title,
                description: event.description,
                date: event.date,
                location: event.location,
                category: event.category,
                coverImage: event.coverImage,
                images: event.images,
                isFeatured: event.isFeatured,
            },
        });
    }
};

// @desc    Get all active clubs
// @route   GET /api/clubs
// @access  Public
export const getAllClubs = async (req, res) => {
    try {
        const clubs = await prisma.club.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
            include: clubInclude,
        });

        const serializedClubs = clubs.map(serializeClub);
        res.status(200).json({ success: true, count: serializedClubs.length, data: { clubs: serializedClubs } });
    } catch (error) {
        console.error('Get all clubs error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching clubs', error: error.message });
    }
};

// @desc    Get single club by club_id
// @route   GET /api/clubs/:clubId
// @access  Public
export const getClubById = async (req, res) => {
    try {
        const { clubId } = req.params;

        const club = await prisma.club.findUnique({
            where: { clubId },
            include: clubInclude,
        });

        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }

        res.status(200).json({ success: true, data: { club: serializeClub(club) } });
    } catch (error) {
        console.error('Get club error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching club', error: error.message });
    }
};

// @desc    Create new club
// @route   POST /api/clubs
// @access  Private (admin only)
export const createClub = async (req, res) => {
    try {
        const clubId = req.body.club_id || req.body.clubId;

        if (!clubId || !req.body.name) {
            return res.status(400).json({ success: false, message: 'club_id and name are required' });
        }

        const { keptEvents } = sanitizeEvents(req.body.events || []);

        const club = await prisma.$transaction(async (tx) => {
            await tx.club.create({
                data: {
                    clubId,
                    ...clubDataFromRequest(req.body),
                    legacyEvents: keptEvents,
                },
            });

            if (keptEvents.length > 0) {
                await replaceClubEvents(tx, clubId, keptEvents);
            }

            return tx.club.findUnique({ where: { clubId }, include: clubInclude });
        });

        res.status(201).json({ success: true, message: 'Club created successfully', data: { club: serializeClub(club) } });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ success: false, message: 'Club with this ID already exists' });
        }

        console.error('Create club error:', error);
        res.status(500).json({ success: false, message: 'Server error while creating club', error: error.message });
    }
};

// @desc    Update club
// @route   PUT /api/clubs/:clubId
// @access  Private (admin or club owner)
export const updateClub = async (req, res) => {
    try {
        const { clubId } = req.params;
        const updateData = { ...req.body };

        delete updateData.club_id;
        delete updateData.clubId;
        delete updateData.id;
        delete updateData.members;

        const existing = await prisma.club.findUnique({
            where: { clubId },
            include: clubInclude,
        });

        if (!existing) {
            return res.status(404).json({ success: false, message: `Club '${clubId}' not found.` });
        }

        const hasEventPayload = Array.isArray(updateData.events);
        const { keptEvents, removedEvents } = hasEventPayload
            ? sanitizeEvents(updateData.events)
            : { keptEvents: getClubEvents(existing), removedEvents: [] };

        for (const event of removedEvents) {
            const fileId = event.cover_image_file_id || event.coverImageFileId;
            if (fileId) {
                try {
                    deleteFromImageKit(fileId);
                } catch (err) {
                    console.error('ImageKit cleanup error:', err);
                }
            }
        }

        const club = await prisma.$transaction(async (tx) => {
            await tx.club.update({
                where: { clubId },
                data: {
                    ...clubDataFromRequest(updateData),
                    ...(hasEventPayload && { legacyEvents: keptEvents }),
                },
            });

            if (hasEventPayload) {
                await replaceClubEvents(tx, clubId, keptEvents);
            }

            return tx.club.findUnique({ where: { clubId }, include: clubInclude });
        });

        res.status(200).json({ success: true, message: 'Club updated successfully', data: { club: serializeClub(club) } });
    } catch (error) {
        console.error('Update club error:', error);
        res.status(500).json({ success: false, message: 'Server error while updating club', error: error.message });
    }
};

// @desc    Soft delete club (set is_active = false)
// @route   DELETE /api/clubs/:clubId
// @access  Private (admin only)
export const deleteClub = async (req, res) => {
    try {
        const { clubId } = req.params;

        const club = await prisma.club.update({
            where: { clubId },
            data: { isActive: false },
            include: clubInclude,
        });

        res.status(200).json({ success: true, message: 'Club deleted successfully', data: { club: serializeClub(club) } });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }

        console.error('Delete club error:', error);
        res.status(500).json({ success: false, message: 'Server error while deleting club', error: error.message });
    }
};

// @desc    Hard delete club
// @route   DELETE /api/clubs/:clubId/permanent
// @access  Private (admin only)
export const permanentDeleteClub = async (req, res) => {
    try {
        const { clubId } = req.params;

        const club = await prisma.club.delete({
            where: { clubId },
            include: clubInclude,
        });

        res.status(200).json({ success: true, message: 'Club permanently deleted', data: { club: serializeClub(club) } });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }

        console.error('Permanent delete club error:', error);
        res.status(500).json({ success: false, message: 'Server error while deleting club', error: error.message });
    }
};

// @desc    Get events by category (across all active clubs)
// @route   GET /api/clubs/events/:category
// @access  Public
export const getEventsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const relationalEvents = await prisma.event.findMany({
            where: {
                category,
                club: { isActive: true },
            },
            orderBy: [
                { date: 'desc' },
                { createdAt: 'desc' },
            ],
            include: {
                club: {
                    select: {
                        clubId: true,
                        name: true,
                    },
                },
            },
        });

        let events = relationalEvents.map(event => ({
            ...serializeEvent(event),
            club_id: event.club.clubId,
            clubId: event.club.clubId,
            club_name: event.club.name,
            clubName: event.club.name,
            club_link: `/clubs/${event.club.clubId}`,
            clubLink: `/clubs/${event.club.clubId}`,
        }));

        if (events.length === 0) {
            const clubs = await prisma.club.findMany({
                where: { isActive: true },
                select: {
                    clubId: true,
                    name: true,
                    legacyEvents: true,
                },
            });

            events = clubs.flatMap(club =>
                (Array.isArray(club.legacyEvents) ? club.legacyEvents : [])
                    .filter(event => event.category === category)
                    .map(event => ({
                        ...normalizeLegacyEvent(event),
                        club_id: club.clubId,
                        clubId: club.clubId,
                        club_name: club.name,
                        clubName: club.name,
                        club_link: `/clubs/${club.clubId}`,
                        clubLink: `/clubs/${club.clubId}`,
                    }))
            );
        }

        res.status(200).json({ success: true, count: events.length, data: { events } });
    } catch (error) {
        console.error('Get events by category error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching events', error: error.message });
    }
};

// @desc    Clean up past events for a specific club
// @route   DELETE /api/clubs/:clubId/cleanup-past-events
// @access  Private (admin or club owner)
export const cleanupPastEvents = async (req, res) => {
    try {
        const { clubId } = req.params;

        const club = await prisma.club.findUnique({
            where: { clubId },
            include: clubInclude,
        });

        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const events = getClubEvents(club);
        const pastEvents = events.filter(event => event.date && new Date(event.date) < today);

        if (pastEvents.length === 0) {
            return res.status(200).json({ success: true, message: 'No past events to clean up', data: { removed: 0 } });
        }

        for (const event of pastEvents) {
            const fileId = event.cover_image_file_id || event.coverImageFileId;
            if (fileId) deleteFromImageKit(fileId);
        }

        const futureEvents = events.filter(event => !(event.date && new Date(event.date) < today));

        await prisma.$transaction(async (tx) => {
            await tx.club.update({
                where: { clubId },
                data: { legacyEvents: futureEvents },
            });

            await replaceClubEvents(tx, clubId, futureEvents);
        });

        res.status(200).json({
            success: true,
            message: `Removed ${pastEvents.length} past event(s)`,
            data: { removed: pastEvents.length },
        });
    } catch (error) {
        console.error('Cleanup past events error:', error);
        res.status(500).json({ success: false, message: 'Server error while cleaning up events', error: error.message });
    }
};
