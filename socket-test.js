const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("✅ Socket.io connected!");
    console.log("Socket ID:", socket.id);
});

socket.on("disconnect", () => {
    console.log("❌ Socket.io disconnected");
});

socket.on("connect_error", (error) => {
    console.log("❌ Connection error:", error.message);
});