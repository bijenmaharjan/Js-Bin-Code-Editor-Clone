const express = require("express");
const cors = require("cors");
const logger = require('morgan');
const path = require("path");
const cookieParser = require("cookie-parser");

const db = require("./config/mongoose-connection");
const indexRouters = require("./routes/indexRouter");

const app = express();
const Port = 3000;

// Set up view engine (EJS)
app.set("view engine", "ejs");

// Middleware
app.use(logger("dev"));
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Cookie parser middleware
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Content Security Policy
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-inline';"
  );
  next();
});

// Route handling
app.use("/", indexRouters);

// Start the server
app.listen(Port, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Server is running on http://localhost:${Port}`);
  }
});
