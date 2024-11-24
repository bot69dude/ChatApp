require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/Auth.route");
const messageRoutes = require("./src/routes/message.route");
const { ConnectDB } = require("./src/lib/db");
const { App, server } = require("./src/lib/socket");

// Middleware setup
App.use(express.json({ limit: "10mb" }));
App.use(express.urlencoded({ limit: "10mb", extended: true }));
App.use(cookieParser());
App.use(cors({
    origin: ["http://localhost:5173"], // Allowed origins
    credentials: true,                // Allow credentials
}));

// Routes
App.use("/api/auth", authRoutes);
App.use("/api/messages", messageRoutes);

// Start server function
async function startServer() {
    try {
        console.log("Connecting to database...");
        await ConnectDB(); // Ensure database is connected

        const port = process.env.PORT || 5001;
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1); // Exit process if server fails to start
    }
}

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Shutting down server...");
    // Close database connection if applicable
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});


startServer();
