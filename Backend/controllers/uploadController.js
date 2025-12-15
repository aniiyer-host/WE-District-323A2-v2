import crypto from 'crypto';

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
