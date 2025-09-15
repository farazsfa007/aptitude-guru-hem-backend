const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    quizId: { type: String, default: 'default-quiz' },
    questionText: { type: String, required: true },
    options: [{ type: String }],
    correctAnswer: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
