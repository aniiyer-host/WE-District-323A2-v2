import axios from 'axios';

// Determine API base URL based on environment.  
// - During development the backend usually runs locally.  
// - In production we default to the deployed URL unless VITE_API_URL is set (e.g. to override).  
// By reading import.meta.env.PROD we can choose an appropriate default.
const DEFAULT_PROD_URL = 'https://we-district-323a2-v2.onrender.com/api';
const BASE_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.PROD ? DEFAULT_PROD_URL : 'http://localhost:5000/api');

// Create axios instance with base URL
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ── ImageKit helpers ─────────────────────────────────────────────────────────

/**
 * Upload a File object to ImageKit via server-authenticated direct upload.
 * Returns an object: { url, fileId }
 *
 * @param {File}   file        - The file to upload
 * @param {string} folder      - ImageKit destination folder, e.g. '/clubs/abc/events'
 * @returns {Promise<{ url: string, fileId: string }>}
 */
export const uploadImageToImageKit = async (file, folder = '/uploads') => {
    const token = localStorage.getItem('token');

    // 1. Get auth credentials from our backend
    const authRes = await axios.get(`${BASE_URL}/uploads/imagekit/auth`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const { signature, token: ikToken, expire, publicKey, urlEndpoint } = authRes.data.data;

    // 2. Build multipart form for ImageKit upload endpoint
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', `${Date.now()}_${file.name}`);
    formData.append('folder', folder);
    formData.append('publicKey', publicKey);
    formData.append('signature', signature);
    formData.append('expire', expire);
    formData.append('token', ikToken);

    // 3. Upload directly to ImageKit
    const { data } = await axios.post(
        `${urlEndpoint.replace(/\/$/, '')}/api/v2/files/upload`.replace('https://ik.imagekit.io', 'https://upload.imagekit.io'),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return { url: data.url, fileId: data.fileId };
};

/**
 * Delete an image from ImageKit via our backend.
 * Silently ignores errors so it never blocks the UI flow.
 *
 * @param {string} fileId - The ImageKit fileId returned at upload time
 */
export const deleteImageFromImageKit = async (fileId) => {
    if (!fileId) return;
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${BASE_URL}/uploads/imagekit/${fileId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (err) {
        // Non-critical — log but don't throw
        console.warn('ImageKit delete skipped:', err?.response?.data?.message || err.message);
    }
};

export default api;
