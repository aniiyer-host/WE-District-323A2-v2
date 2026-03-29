import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import compression from 'compression';

import authRoutes from './routes/authRoutes.js';
import clubsRoute from './routes/clubs.js';
import projectsRoute from './routes/projects.js';
import projectPagesRoute from './routes/projectPages.js';
import uploadRoutes from './routes/uploadRoutes.js';
import emailRoutes from './routes/emailRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);

        const allowed = (process.env.CLIENT_URL || 'http://localhost:5173')
            .split(',')
            .map(u => u.trim());

        if (allowed.includes(origin)) return callback(null, true);

        callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => res.send('API is running'));

app.use('/api/auth', authRoutes);
app.use('/api/clubs', clubsRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/project-pages', projectPagesRoute);
app.use('/api/uploads', uploadRoutes);
app.use('/api/email', emailRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
});


app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));