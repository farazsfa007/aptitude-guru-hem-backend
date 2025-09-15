const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quizId: { type: String, default: 'default-quiz' },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
