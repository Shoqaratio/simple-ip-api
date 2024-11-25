const express = require("express");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const app = express();

// logging function
app.use(morgan("combined")); // method, URL, IP, response time, etc is logged here

// Apply rate limiter
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 20, // 100 requests every 5 minutes
    message: "You are temporarily blocked! Please try again in 5 minutes.",
    standardHeaders: true,
    legacyHeaders: false,
});

// apply rate lumiter except /health
app.use((req, res, next) => {
    if (req.path === "/health") {
        return next();
    }
    limiter(req, res, next);
});

// Utility function to clean IP
const getCleanIP = (req) => {
    let ip = req.ip;
    return ip.startsWith("::ffff:") ? ip.substring(7) : ip;
};

// html api
app.get("/", (req, res) => {
    const ip = getCleanIP(req);

    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Public IP Address</title>
        </head>
        <body>
            <h1>Your IP address is:</h1>
            <p style="font-size: 1.5em; color: blue;">${ip}</p>
        </body>
        </html>
    `;
    
    res.send(html);
});

// json api
app.get("/api", (req, res) => {
    const ip = getCleanIP(req);
    res.json({ ip });
});

// health api
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", uptime: process.uptime() });
});

// basic infos api
app.get("/info", (req, res) => {
    res.json({
        name: "pbulic-ip-api",
        version: "1.0.0",
        author: "Shoqaratio",
        description: "A simple API to get public IP and basic server info.",
        timestamp: new Date(),
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Not Found</title>
        </head>
        <body>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist. Go back to <a href="/">home</a>.</p>
        </body>
        </html>
    `);
});

// error handler 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
