const express = require("express");
const eventRouter = express.Router();
const eventControllers = require("../controllers/eventControllers");

// Get an event by ID
eventRouter.get("/:id", eventControllers.showEvent);

module.exports = eventRouter;
