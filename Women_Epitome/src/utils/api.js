import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
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

export default api;

// ImageKit upload helper: obtains auth and uploads a file, returns URL
export async function uploadImageToImageKit(file, folder = '/clubs/events') {
    if (!file) throw new Error('No file provided');
    // 1) Get auth from backend
    const authRes = await api.get('/uploads/imagekit/auth');
    const { signature, token, expire, publicKey, urlEndpoint } = authRes.data.data;

    // 2) Build form data for ImageKit
    const form = new FormData();
    form.append('file', file);
    form.append('fileName', file.name || `upload_${Date.now()}`);
    form.append('folder', folder);
    form.append('publicKey', publicKey);
    form.append('signature', signature);
    form.append('token', token);
    form.append('expire', String(expire));

    const uploadEndpoint = 'https://upload.imagekit.io/api/v1/files/upload';
    const resp = await fetch(uploadEndpoint, {
        method: 'POST',
        body: form,
    });

    if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`ImageKit upload failed: ${txt}`);
    }
    const json = await resp.json();
    console.log('ImageKit upload response:', json);
    
    // ImageKit returns the URL directly as 'url' property
    if (json.url) {
        return json.url;
    }
    
    // Fallback: construct URL from filePath
    if (json.filePath) {
        return `${urlEndpoint}${json.filePath}`;
    }
    
    throw new Error('No URL returned from ImageKit upload');
}
