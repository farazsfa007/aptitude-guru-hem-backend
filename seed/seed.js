require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Question = require('../models/Question');
const User = require('../models/User');
const connectDB = require('../config/db');

const MONGO = process.env.MONGO_URI;

async function seed() {
    await connectDB(MONGO);
    await Question.deleteMany({});
    await User.deleteMany({});

    // sample questions (General + Coding)
    const questions = [
        {
            quizId: 'default-quiz',
            questionText: 'What is the capital of France?',
            options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
            correctAnswer: 'Paris'
        },
        {
            quizId: 'default-quiz',
            questionText: '2 + 2 = ?',
            options: ['3', '4', '5', '22'],
            correctAnswer: '4'
        },
        {
            quizId: 'default-quiz',
            questionText: 'Which language runs in a web browser?',
            options: ['Python', 'Java', 'C++', 'JavaScript'],
            correctAnswer: 'JavaScript'
        },
        {
            quizId: 'default-quiz',
            questionText: 'Which of the following is a JavaScript framework?',
            options: ['Django', 'React', 'Laravel', 'Spring'],
            correctAnswer: 'React'
        },
        {
            quizId: 'default-quiz',
            questionText: 'Which symbol is used for single-line comments in JavaScript?',
            options: ['//', '/* */', '<!-- -->', '#'],
            correctAnswer: '//'
        },
        {
            quizId: 'default-quiz',
            questionText: 'What does CSS stand for?',
            options: [
                'Creative Style Sheets',
                'Cascading Style Sheets',
                'Computer Styled Sections',
                'Colorful Style Sheets'
            ],
            correctAnswer: 'Cascading Style Sheets'
        },
        {
            quizId: 'default-quiz',
            questionText: 'Which HTML tag is used to create a hyperlink?',
            options: ['<p>', '<a>', '<link>', '<href>'],
            correctAnswer: '<a>'
        },
        {
            quizId: 'default-quiz',
            questionText: 'In Python, what is the correct way to define a function?',
            options: [
                'function myFunc():',
                'def myFunc():',
                'func myFunc():',
                'create myFunc():'
            ],
            correctAnswer: 'def myFunc():'
        },
        {
            quizId: 'default-quiz',
            questionText: 'Which of the following is NOT a programming language?',
            options: ['Java', 'HTML', 'Python', 'C#'],
            correctAnswer: 'HTML'
        },
        {
            quizId: 'default-quiz',
            questionText: 'Which command is used to initialize a new Git repository?',
            options: ['git init', 'git start', 'git new', 'git create'],
            correctAnswer: 'git init'
        }
    ];

    await Question.insertMany(questions);

    // test user
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        passwordHash
    });
    await user.save();

    console.log('Seed completed. user email: test@example.com password: password123');
    process.exit(0);
}

seed().catch(err => console.error(err));
