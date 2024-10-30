const express = require("express");
const budgetRouter = express.Router();
const budgetControllers = require("../controllers/budgetControllers");

// Get all budgets for a specific simulation
budgetRouter.get(
	"/simulation/:simulationId",
	budgetControllers.listBudgetsBySimulationId
);

// Get budget for a specific simulation and current month
budgetRouter.get(
	"/simulation/:simulationId/month/:currentMonth",
	budgetControllers.showBudgetBySimulationAndMonth
);

// Get a budget by ID
budgetRouter.get("/:id", budgetControllers.showBudget);

// Create a new budget
budgetRouter.post("/", budgetControllers.createBudget);

// Update an existing budget
budgetRouter.put("/:id", budgetControllers.updateBudget);

// Delete a budget by ID
budgetRouter.delete("/:id", budgetControllers.deleteBudget);

module.exports = budgetRouter;
