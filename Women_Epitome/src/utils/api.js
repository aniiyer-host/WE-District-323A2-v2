import axios from 'axios';

const DEFAULT_PROD_URL = 'https://we-district-323a2-v2.onrender.com/api';
const BASE_URL = import.meta.env.VITE_API_URL
    || (import.meta.env.PROD ? DEFAULT_PROD_URL : 'http://localhost:5000/api');

const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

// Attach token if present
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Only redirect to /login on 401 if the user actually had a token
// (i.e. their session expired). Public pages returning 401 should NOT redirect.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const hadToken = !!localStorage.getItem('token');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('tokenTimestamp');
            if (hadToken) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// ── ImageKit helpers ─────────────────────────────────────────────────────────
export const uploadImageToImageKit = async (file, folder = '/uploads') => {
    const token = localStorage.getItem('token');
    const authRes = await axios.get(`${BASE_URL}/uploads/imagekit/auth`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const { signature, token: ikToken, expire, publicKey, urlEndpoint } = authRes.data.data;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', `${Date.now()}_${file.name}`);
    formData.append('folder', folder);
    formData.append('publicKey', publicKey);
    formData.append('signature', signature);
    formData.append('expire', expire);
    formData.append('token', ikToken);

    const { data } = await axios.post(
        'https://upload.imagekit.io/api/v1/files/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    const url = data.url || (data.filePath ? `${urlEndpoint.replace(/\/$/, '')}${data.filePath}` : '');
    return { url, fileId: data.fileId || '' };
};

export const deleteImageFromImageKit = async (fileId) => {
    if (!fileId) return;
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${BASE_URL}/uploads/imagekit/${fileId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (err) {
        console.warn('ImageKit delete skipped:', err?.response?.data?.message || err.message);
    }
};

export default api;