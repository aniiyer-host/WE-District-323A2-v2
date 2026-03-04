import Club from '../models/Club.js';
import https from 'https';

/**
 * Delete a file from ImageKit by fileId (server-side, best-effort).
 * Logs errors but never throws so one bad delete doesn't block the batch.
 */
export const deleteFromImageKit = (fileId) => {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey || !fileId) return;

    const credentials = Buffer.from(`${privateKey}:`).toString('base64');

    const req = https.request(
        {
            hostname: 'api.imagekit.io',
            path: `/v1/files/${fileId}`,
            method: 'DELETE',
            headers: { Authorization: `Basic ${credentials}` },
        },
        (res) => {
            // consume response so the socket is freed
            res.resume();
        }
    );
    req.on('error', (err) => console.warn(`ImageKit cleanup skip (${fileId}):`, err.message));
    req.end();
};

/**
 * Remove events older than 6 months from every active club.
 * Also deletes associated images from ImageKit (best-effort).
 *
 * Runs as a background job — errors are logged, never thrown.
 */
export const purgeOldEvents = async () => {
    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const clubs = await Club.find({ isActive: true, 'events.date': { $lt: sixMonthsAgo } });

        let totalRemoved = 0;

        for (const club of clubs) {
            const oldEvents = club.events.filter((ev) => ev.date && new Date(ev.date) < sixMonthsAgo);

            if (oldEvents.length === 0) continue;

            // Best-effort ImageKit cleanup for each old event
            for (const ev of oldEvents) {
                if (ev.coverImageFileId) deleteFromImageKit(ev.coverImageFileId);
                // images are stored as plain URL strings in the DB,
                // so we don't have fileIds for extra images — skip those.
            }

            // Remove old events from the array
            club.events = club.events.filter((ev) => !(ev.date && new Date(ev.date) < sixMonthsAgo));
            await club.save();

            totalRemoved += oldEvents.length;
            console.log(`[Event Cleanup] Removed ${oldEvents.length} old event(s) from "${club.name}"`);
        }

        if (totalRemoved > 0) {
            console.log(`[Event Cleanup] Done — ${totalRemoved} event(s) purged across ${clubs.length} club(s).`);
        } else {
            console.log('[Event Cleanup] No old events found.');
        }
    } catch (err) {
        console.error('[Event Cleanup] Error:', err);
    }
};

/**
 * Schedule the cleanup to run once every 24 hours.
 * Also runs once immediately on server start so stale events are cleaned right away.
 */
export const startEventCleanupScheduler = () => {
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

    // Run once on startup (with a small delay so DB connection is ready)
    setTimeout(() => purgeOldEvents(), 10_000);

    // Then repeat every 24 hours
    setInterval(() => purgeOldEvents(), TWENTY_FOUR_HOURS);

    console.log('[Event Cleanup] Scheduler started — runs every 24 hours.');
};
