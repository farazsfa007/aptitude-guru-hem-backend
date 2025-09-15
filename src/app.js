require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('../routes/auth');
const quizRoutes = require('../routes/quiz');
const certRoutes = require('../routes/cert');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: function (origin, callback) {
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            "http://localhost:5173"
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed"));
        }
        },
        credentials: true,
    })
);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/cert', certRoutes);

// health
app.get('/', (req, res) => res.json({ message: 'LMS Microcert Backend' }));

module.exports = app;
