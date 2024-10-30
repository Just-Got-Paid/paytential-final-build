const express = require("express");
const simulationRouter = express.Router();
const simulationControllers = require("../controllers/simulationControllers");

// Create a new simulation
simulationRouter.post("/", simulationControllers.createSimulation);

// Get a simulation by ID
simulationRouter.get("/:id", simulationControllers.showSimulation);

// Update a simulation by ID
simulationRouter.put("/:id", simulationControllers.updateSimulation);

module.exports = simulationRouter;
