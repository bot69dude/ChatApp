const mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
        // Await the connection to the database
        const conn = await mongoose.connect(process.env.MONGODB_URL);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        // Log any connection errors
        console.error("MongoDB Connection error: ", error);
    }
};

module.exports = { ConnectDB };
