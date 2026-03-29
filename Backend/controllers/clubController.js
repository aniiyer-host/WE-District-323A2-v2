import supabase from '../utils/supabaseClient.js';
import { deleteFromImageKit } from '../utils/eventCleanup.js';

// @desc    Get all active clubs
// @route   GET /api/clubs
// @access  Private (authenticated users)
export const getAllClubs = async (req, res) => {
    try {
        const { data: clubs, error } = await supabase
            .from('clubs')
            .select('*')
            .eq('is_active', true)
            .order('name', { ascending: true });

        if (error) throw error;

        res.status(200).json({ success: true, count: clubs.length, data: { clubs } });
    } catch (error) {
        console.error('Get all clubs error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching clubs', error: error.message });
    }
};

// @desc    Get single club by club_id
// @route   GET /api/clubs/:clubId
// @access  Private (authenticated users)
export const getClubById = async (req, res) => {
    try {
        const { clubId } = req.params;

        const { data: club, error } = await supabase
            .from('clubs')
            .select('*')
            .eq('club_id', clubId)
            .maybeSingle();

        if (error || !club) {
            const { data: allClubs } = await supabase.from('clubs').select('club_id, name');
            return res.status(404).json({ success: false, message: 'Club not found' });
        }

        res.status(200).json({ success: true, data: { club } });
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
        const clubData = req.body;

        // Check duplicate
        const { data: existing } = await supabase
            .from('clubs')
            .select('id')
            .eq('club_id', clubData.club_id)
            .single();

        if (existing) {
            return res.status(400).json({ success: false, message: 'Club with this ID already exists' });
        }

        const { data: club, error } = await supabase
            .from('clubs')
            .insert(clubData)
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({ success: true, message: 'Club created successfully', data: { club } });
    } catch (error) {
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
        const updateData = req.body;
console.log('UPDATE payload members:', updateData.members?.slice(0, 2));

        //console.log(`[updateClub] clubId from URL: "${clubId}"`);
        //console.log(`[updateClub] req.user.club_id: "${req.user?.club_id}", role: "${req.user?.role}"`);

        // Prevent changing club_id
        delete updateData.club_id;
        delete updateData.id;

        // Prevent exceeding the limit of 20 events per club
        if (updateData.events && Array.isArray(updateData.events)) {

            // Enforce limit of maximum 2 extra photos per event
            updateData.events = updateData.events.map(ev => {
                if (ev.images && Array.isArray(ev.images) && ev.images.length > 2) {
                    ev.images = ev.images.slice(0, 2);
                }
                return ev;
            });

            if (updateData.events.length > 20) {
                // Sort events by date descending (newest first)
                updateData.events.sort((a, b) => {
                    const dateA = new Date(a.date || 0);
                    const dateB = new Date(b.date || 0);
                    return dateB - dateA;
                });

                // Remove the oldest events that exceed the 20 limit
                const eventsToRemove = updateData.events.slice(20);
                updateData.events = updateData.events.slice(0, 20);

                // Best-effort cleanup for cover images of removed events
                for (const ev of eventsToRemove) {
                    const fileId = ev.cover_image_file_id || ev.coverImageFileId;
                    if (fileId) {
                        try {
                            deleteFromImageKit(fileId);
                        } catch (err) {
                            console.error('ImageKit cleanup error:', err);
                        }
                    }
                }
            }
        }

        // First verify the club exists
        const { data: existing, error: findError } = await supabase
            .from('clubs')
            .select('club_id')
            .eq('club_id', clubId)
            .maybeSingle();

        //console.log(`[updateClub] maybeSingle result — existing: ${JSON.stringify(existing)}, findError: ${JSON.stringify(findError)}`);

        if (findError) throw findError;
        if (!existing) {
            // List all clubs to help debug
            const { data: allClubs } = await supabase.from('clubs').select('club_id, name');
            //console.log('[updateClub] All club_ids in DB:', allClubs?.map(c => c.club_id));
            return res.status(404).json({
                success: false,
                message: `Club '${clubId}' not found. Check that this club_id exists in the database.`,
                availableIds: allClubs?.map(c => c.club_id)
            });
        }

        // Do the update
        const { data: clubs, error } = await supabase
            .from('clubs')
            .update(updateData)
            .eq('club_id', clubId)
            .select();

        if (error) throw error;

        res.status(200).json({ success: true, message: 'Club updated successfully', data: { club: clubs[0] } });
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

        const { data: club, error } = await supabase
            .from('clubs')
            .update({ is_active: false })
            .eq('club_id', clubId)
            .select()
            .single();

        if (error || !club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }

        res.status(200).json({ success: true, message: 'Club deleted successfully', data: { club } });
    } catch (error) {
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

        const { data: club, error } = await supabase
            .from('clubs')
            .delete()
            .eq('club_id', clubId)
            .select()
            .single();

        if (error || !club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }

        res.status(200).json({ success: true, message: 'Club permanently deleted', data: { club } });
    } catch (error) {
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

        // Fetch all active clubs and filter events JSONB array in JS
        // (Supabase doesn't support filtering inside a JSONB array via the client directly)
        const { data: clubs, error } = await supabase
            .from('clubs')
            .select('club_id, name, events')
            .eq('is_active', true);

        if (error) throw error;

        const events = [];
        for (const club of clubs) {
            if (!Array.isArray(club.events)) continue;
            for (const ev of club.events) {
                if (ev.category === category) {
                    events.push({
                        ...ev,
                        club_id: club.club_id,
                        club_name: club.name,
                        club_link: `/clubs/${club.club_id}`
                    });
                }
            }
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

        const { data: club, error: fetchError } = await supabase
            .from('clubs')
            .select('club_id, events')
            .eq('club_id', clubId)
            .single();

        if (fetchError || !club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }

        const events = Array.isArray(club.events) ? club.events : [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const pastEvents = events.filter(ev => ev.date && new Date(ev.date) < today);

        if (pastEvents.length === 0) {
            return res.status(200).json({ success: true, message: 'No past events to clean up', data: { removed: 0 } });
        }

        // Best-effort ImageKit cleanup for cover images
        for (const ev of pastEvents) {
            if (ev.coverImageFileId) deleteFromImageKit(ev.coverImageFileId);
        }

        // Write back only the future events
        const futureEvents = events.filter(ev => !(ev.date && new Date(ev.date) < today));

        const { error: updateError } = await supabase
            .from('clubs')
            .update({ events: futureEvents })
            .eq('club_id', clubId);

        if (updateError) throw updateError;

        res.status(200).json({
            success: true,
            message: `Removed ${pastEvents.length} past event(s)`,
            data: { removed: pastEvents.length }
        });
    } catch (error) {
        console.error('Cleanup past events error:', error);
        res.status(500).json({ success: false, message: 'Server error while cleaning up events', error: error.message });
    }
};