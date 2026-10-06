const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const agentRoutes = require("./routes/agentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Make Socket.io available to controllers
app.set("io", io);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to TripEasy Travel Booking API"
    });
});

// Test route
app.get("/api/test", (req, res) => {
    res.json({
        message: "TripEasy backend is working!"
    });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/notifications", notificationRoutes);

// Socket.io connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log(`TripEasy server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server could not start:", error.message);
        process.exit(1);
    }
};

startServer();


























