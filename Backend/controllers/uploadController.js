import crypto from 'crypto';
import https from 'https';
import supabase from '../utils/supabaseClient.js';

const getStorageBucket = () => process.env.SUPABASE_STORAGE_BUCKET || 'club-images';

const sanitizePathPart = (value = '') =>
  value
    .toString()
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-zA-Z0-9/_-]/g, '-')
    .replace(/-+/g, '-');

const sanitizeFileName = (value = 'upload') =>
  value
    .toString()
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-');

const getBase64Payload = (base64, dataUrl) => {
  if (base64) return base64;
  if (!dataUrl) return '';
  return dataUrl.includes(',') ? dataUrl.split(',').pop() : dataUrl;
};

// Supabase Storage upload endpoint
// Accepts JSON to avoid introducing multipart dependencies during migration.
export const uploadSupabaseFile = async (req, res) => {
  try {
    const { fileName, contentType, folder = 'uploads', base64, dataUrl } = req.body;
    const payload = getBase64Payload(base64, dataUrl);

    if (!fileName || !payload) {
      return res.status(400).json({ success: false, message: 'fileName and file data are required' });
    }

    if (contentType && !contentType.startsWith('image/')) {
      return res.status(400).json({ success: false, message: 'Only image uploads are supported' });
    }

    const bucket = getStorageBucket();
    const safeFolder = sanitizePathPart(folder) || 'uploads';
    const safeFileName = sanitizeFileName(fileName);
    const path = `${safeFolder}/${Date.now()}_${safeFileName}`;
    const buffer = Buffer.from(payload, 'base64');

    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, buffer, {
        contentType: contentType || 'application/octet-stream',
        upsert: false,
      });

    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);

    return res.status(201).json({
      success: true,
      data: {
        bucket,
        path,
        url: data.publicUrl,
        fileId: path,
      },
    });
  } catch (err) {
    console.error('Supabase upload error:', err);
    return res.status(500).json({ success: false, message: 'Failed to upload image', error: err.message });
  }
};

// Supabase Storage delete endpoint
export const deleteSupabaseFile = async (req, res) => {
  try {
    const path = req.body?.path || req.query?.path;

    if (!path) {
      return res.status(400).json({ success: false, message: 'path is required' });
    }

    const bucket = getStorageBucket();
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) throw error;

    return res.status(200).json({ success: true, message: 'Image deleted from Supabase Storage' });
  } catch (err) {
    console.error('Supabase delete error:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete image', error: err.message });
  }
};

// ImageKit authentication endpoint
// Returns signature, token, and expire (timestamp) for client-side uploads
export const getImageKitAuth = async (req, res) => {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

    if (!privateKey || !publicKey || !urlEndpoint) {
      return res.status(500).json({
        success: false,
        message: 'ImageKit environment variables not configured',
      });
    }

    // token can be any random string; expire is a UNIX timestamp in seconds
    const token = crypto.randomBytes(16).toString('hex');
    const expire = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes

    const signature = crypto
      .createHmac('sha1', privateKey)
      .update(token + expire)
      .digest('hex');

    return res.status(200).json({
      success: true,
      data: {
        signature,
        token,
        expire,
        publicKey,
        urlEndpoint,
      },
    });
  } catch (err) {
    console.error('ImageKit auth error:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ImageKit delete endpoint
// Deletes a file from ImageKit by its fileId using the private key (Basic Auth)
export const deleteImageKitFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!privateKey) {
      return res.status(500).json({ success: false, message: 'ImageKit private key not configured' });
    }

    if (!fileId) {
      return res.status(400).json({ success: false, message: 'fileId is required' });
    }

    // ImageKit REST API: DELETE https://api.imagekit.io/v1/files/:fileId
    // Auth: Basic base64(privateKey:)
    const credentials = Buffer.from(`${privateKey}:`).toString('base64');

    await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.imagekit.io',
        path: `/v1/files/${fileId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      };

      const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
          if (response.statusCode === 204 || response.statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(`ImageKit delete failed: ${response.statusCode} ${data}`));
          }
        });
      });

      request.on('error', reject);
      request.end();
    });

    return res.status(200).json({ success: true, message: 'Image deleted from ImageKit' });
  } catch (err) {
    console.error('ImageKit delete error:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete image', error: err.message });
  }
};
