const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Express settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const authRoutes = require("./routes/authRoute");
const noteRoutes = require("./routes/noteRoute");
const userRoutes = require("./routes/userRoute");

app.use(authRoutes);
app.use(noteRoutes);
app.use(userRoutes);

module.exports = app;
