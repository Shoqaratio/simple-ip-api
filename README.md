# simple-ip-api

**simple-ip-api** is a lightweight and efficient API built with Node.js and Express, designed to provide the IP address of users in JSON or HTML format. It includes basic rate-limiting features to protect against DDoS attacks and is designed for easy extensibility with more features coming soon.

## Features

- **Retrieve IP Address**: Get the user's IP address in JSON or HTML format.
- **Rate Limiting**: Integrated `express-rate-limit` to prevent abuse and mitigate DDoS risks.
- **Simple and Fast**: Optimized for performance and ease of use.
- **Scalable**: Designed to support future enhancements and additional functionality.

## Routes
- **JSON Route:** The JSON route is available at /api
- **HTML Route:** The HTML route is available at /

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Shoqaratio/simple-ip-api.git
   cd simple-ip-api

2. Install dependencies:
   ```bash
   npm install
3. Run application:
   ```bash
   node main.js

Now, the application is available at http://localhost:3000! Congrats
