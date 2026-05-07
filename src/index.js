import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Handle preflight
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    // JSON response header
    res.setHeader("Content-Type", "application/json");

    // Routes
    if (req.url === "/api/register" || req.url === "/api/login") {
        userRoutes(req, res);
    } else if (req.url.startsWith("/api/profile")) {
        profileRoutes(req, res);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, message: "Route not found" }));
    }
});


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});