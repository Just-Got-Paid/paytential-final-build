const express = require("express");
const simulationRouter = express.Router();
const simulationControllers = require("../controllers/simulationControllers");

// Create a new simulation
simulationRouter.post("/", simulationControllers.createSimulation);

// Get simulations by User Id
simulationRouter.get("/:id", simulationControllers.getSimulationsByUser);

// Get a simulation by ID
// simulationRouter.get("/:id", simulationControllers.showSimulation);

// Update a simulation by sim ID
simulationRouter.patch("/:id", simulationControllers.updateSimulation);

// Delete a simulation by sim ID
simulationRouter.delete("/:id", simulationControllers.deleteSimulation);

module.exports = simulationRouter;


