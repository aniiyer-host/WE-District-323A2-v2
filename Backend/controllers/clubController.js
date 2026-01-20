import Club from '../models/Club.js';

// @desc    Get all clubs
// @route   GET /api/clubs
// @access  Private (authenticated users)
export const getAllClubs = async (req, res) => {
    try {
        const clubs = await Club.find({ isActive: true }).sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: clubs.length,
            data: {
                clubs
            }
        });
    } catch (error) {
        console.error('Get all clubs error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching clubs',
            error: error.message
        });
    }
};

// @desc    Get single club by clubId
// @route   GET /api/clubs/:clubId
// @access  Private (authenticated users)
export const getClubById = async (req, res) => {
    try {
        const { clubId } = req.params;

        const club = await Club.findOne({ clubId });

        if (!club) {
            return res.status(404).json({
                success: false,
                message: 'Club not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                club
            }
        });
    } catch (error) {
        console.error('Get club error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching club',
            error: error.message
        });
    }
};

// @desc    Create new club
// @route   POST /api/clubs
// @access  Private (admin only)
export const createClub = async (req, res) => {
    try {
        const clubData = req.body;

        // Check if club already exists
        const existingClub = await Club.findOne({ clubId: clubData.clubId });
        if (existingClub) {
            return res.status(400).json({
                success: false,
                message: 'Club with this ID already exists'
            });
        }

        const club = await Club.create(clubData);

        res.status(201).json({
            success: true,
            message: 'Club created successfully',
            data: {
                club
            }
        });
    } catch (error) {
        console.error('Create club error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating club',
            error: error.message
        });
    }
};

// @desc    Update club
// @route   PUT /api/clubs/:clubId
// @access  Private (admin or club owner)
export const updateClub = async (req, res) => {
    try {
        const { clubId } = req.params;
        const updateData = req.body;

        // Prevent changing clubId
        delete updateData.clubId;

        const club = await Club.findOneAndUpdate(
            { clubId },
            updateData,
            {
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        );

        if (!club) {
            return res.status(404).json({
                success: false,
                message: 'Club not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Club updated successfully',
            data: {
                club
            }
        });
    } catch (error) {
        console.error('Update club error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating club',
            error: error.message
        });
    }
};

// @desc    Delete club
// @route   DELETE /api/clubs/:clubId
// @access  Private (admin only)
export const deleteClub = async (req, res) => {
    try {
        const { clubId } = req.params;

        // Soft delete by setting isActive to false
        const club = await Club.findOneAndUpdate(
            { clubId },
            { isActive: false },
            { new: true }
        );

        if (!club) {
            return res.status(404).json({
                success: false,
                message: 'Club not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Club deleted successfully',
            data: {
                club
            }
        });
    } catch (error) {
        console.error('Delete club error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting club',
            error: error.message
        });
    }
};

// @desc    Hard delete club (permanently remove)
// @route   DELETE /api/clubs/:clubId/permanent
// @access  Private (admin only)
export const permanentDeleteClub = async (req, res) => {
    try {
        const { clubId } = req.params;

        const club = await Club.findOneAndDelete({ clubId });

        if (!club) {
            return res.status(404).json({
                success: false,
                message: 'Club not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Club permanently deleted',
            data: {
                club
            }
        });
    } catch (error) {
        console.error('Permanent delete club error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting club',
            error: error.message
        });
    }
};

// @desc    Get events by category
// @route   GET /api/clubs/events/:category
// @access  Public
export const getEventsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        // Find all clubs and extract events matching the category
        const clubs = await Club.find({ isActive: true });

        const events = [];
        clubs.forEach(club => {
            if (club.events && club.events.length > 0) {
                club.events.forEach(event => {
                    if (event.category === category) {
                        events.push({
                            ...event.toObject(),
                            clubId: club.clubId,
                            clubName: club.name,
                            clubLink: `/clubs/${club.clubId}`
                        });
                    }
                });
            }
        });

        res.status(200).json({
            success: true,
            count: events.length,
            data: {
                events
            }
        });
    } catch (error) {
        console.error('Get events by category error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching events',
            error: error.message
        });
    }
};
