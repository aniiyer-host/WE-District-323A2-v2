import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';

import connectDB from './models/db.js';
import authRoutes from './routes/authRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(compression());
app.use(cors({
    origin: process.env.CLIENT_URL?.split(",") || [
        "http://localhost:5173"
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send("API is running....");
});

app.use('/api/auth', authRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/uploads', uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === "production"
            ? "Internal server error"
            : err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});