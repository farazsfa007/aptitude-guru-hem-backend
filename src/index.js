const connectDB = require('../config/db'); 
const app = require('./app');

(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('DB connected (from serverless entry).');
    } catch (err) {
        console.error('DB connection error (serverless entry):', err);
    }
})();

module.exports = app;
