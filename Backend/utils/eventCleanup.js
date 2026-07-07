import supabase from '../utils/supabaseClient.js';
import https from 'https';

/**
 * Delete a file from ImageKit by fileId (server-side, best-effort).
 * Logs errors but never throws so one bad delete doesn't block the batch.
 */
export const deleteFromImageKit = async (fileId) => {
    if (!fileId) return;

    // Check if it's a Supabase path or URL
    const isSupabase = fileId.includes('supabase.co') || fileId.includes('/');

    if (isSupabase) {
        try {
            let path = fileId;
            if (path.startsWith('http')) {
                const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'district-assets';
                const searchStr = `/object/public/${bucket}/`;
                const index = path.indexOf(searchStr);
                if (index !== -1) {
                    path = path.substring(index + searchStr.length);
                } else {
                    const parts = path.split(`/object/public/`);
                    if (parts.length > 1) {
                        const pathParts = parts[1].split('/');
                        pathParts.shift(); // remove bucket
                        path = pathParts.join('/');
                    }
                }
            }

            const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'district-assets';
            const { error } = await supabase.storage.from(bucket).remove([path]);
            if (error) {
                console.warn(`Supabase cleanup error (${path}):`, error.message);
            }
        } catch (err) {
            console.warn(`Supabase cleanup exception:`, err.message);
        }
        return;
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey) return;

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
