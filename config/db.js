const mongoose = require("mongoose");

let cached = global._mongoose;
if (!cached) {
    cached = global._mongoose = { conn: null, promise: null };
    }

    async function connectDB(mongoURI) {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
        .connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((mongooseInstance) => mongooseInstance.connection);
    }

    try {
        cached.conn = await cached.promise;
        console.log("✅ MongoDB connected");
        return cached.conn;
    } catch (err) {
        cached.promise = null; // reset if failed
        console.error("❌ MongoDB connection error:", err);
        throw err;
    }
}

module.exports = connectDB;
