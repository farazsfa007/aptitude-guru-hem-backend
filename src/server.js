require("dotenv").config();
const connectDB = require("../config/db");
const app = require("../src/app");

const PORT = process.env.PORT || 4444;

(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
        console.log(`✅ Server started on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
})();
