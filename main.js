const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

// apply rate limiter
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 min
    max: 100, // 100 requests every 5 min
    message: "You are temporary blocked! Please go back in 5 min.",
    standardHeaders: true,
    legacyHeaders: false,
});

// apply rate limiter
app.use(limiter);

// html api
app.get("/", (req, res) => {
    let ip = req.ip;

    if (ip.startsWith("::ffff:")) {
        ip = ip.substring(7);
    }
    
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
app.get("/api/", (req, res) => {
    let ip = req.ip;

    if (ip.startsWith("::ffff:")) {
        ip = ip.substring(7);
    }

    res.json({"ip": ip});
})

// server start
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
