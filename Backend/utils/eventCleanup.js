import supabase from '../utils/supabaseClient.js';
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
        (res) => { res.resume(); }
    );
    req.on('error', (err) => console.warn(`ImageKit cleanup skip (${fileId}):`, err.message));
    req.end();
};
