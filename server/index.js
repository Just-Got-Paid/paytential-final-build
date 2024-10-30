///////////////////////////////
// Imports
///////////////////////////////
require("dotenv").config();
const path = require("path");
const express = require("express");
const authRoutes = require("./routes/authRouter");
const budgetRoutes = require("./routes/budgetRouter");
const eventRoutes = require("./routes/eventRouter");
const simulationRoutes = require("./routes/simulationRouter");
const transactionHistoryRoutes = require("./routes/transactionHistoryRouter");
const userProfileRoutes = require("./routes/userProfileRouter");
const userRoutes = require("./routes/userRouter");

// middleware imports
const handleCookieSessions = require("./middleware/handleCookieSessions");
const logRoutes = require("./middleware/logRoutes");
const checkAuthentication = require("./middleware/checkAuthentication");

// controller imports
const authControllers = require("./controllers/authControllers");
const userControllers = require("./controllers/userControllers");
const app = express();

// middleware
app.use(handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Serve static assets from the dist folder of the frontend

// Routes
app.use("/api", authRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/simulation", simulationRoutes);
app.use("/api/transactionHistory", transactionHistoryRoutes);
app.use("/api/userProfile", userProfileRoutes);
app.use("/api/user", userRoutes);

///////////////////////////////
// Fallback Route
///////////////////////////////

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get("*", (req, res, next) => {
	if (req.originalUrl.startsWith("/api")) return next();
	res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

///////////////////////////////
// Start Listening
///////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
