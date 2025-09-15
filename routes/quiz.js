const express = require('express');
const router = express.Router();
const auth = require('../utils/authMiddleware');
const Question = require('../models/Question');
const Result = require('../models/Result');


router.get('/questions', auth, async (req, res) => {
    const quizId = 'default-quiz';
    const questions = await Question.find({ quizId }).select('-correctAnswer');
    res.json({ questions });
    });

    router.get('/questions/:quizId', auth, async (req, res) => {
    const { quizId } = req.params;
    const questions = await Question.find({ quizId }).select('-correctAnswer');
    res.json({ questions });
});

// POST submit answers -> calculate result, store and return score
// expects: { quizId, answers: [{ questionId, answer }] }
router.post('/submit', auth, async (req, res) => {
    try {
        const { quizId = 'default-quiz', answers = [] } = req.body;
        // fetch correct answers
        const qIds = answers.map(a => a.questionId);
        const questions = await Question.find({ _id: { $in: qIds }});
        let correctCount = 0;
        for (const a of answers) {
        const q = questions.find(x => x._id.toString() === a.questionId);
        if (q && q.correctAnswer === a.answer) correctCount++;
        }
        const total = questions.length;
        const score = Math.round((correctCount / Math.max(1, total)) * 100);
        const passingPercent = Number(process.env.PASSING_PERCENT || 50);
        const passed = score >= passingPercent;

        const result = new Result({
        userId: req.user.id,
        quizId,
        score,
        total,
        passed
        });
        await result.save();

        res.json({ score, total, passed, resultId: result._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
