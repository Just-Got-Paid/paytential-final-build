const express = require("express");
const transactionHistoryRouter = express.Router();
const transactionHistoryControllers = require("../controllers/transactionHistoryControllers");

// Create a new transaction
transactionHistoryRouter.post(
	"/",
	transactionHistoryControllers.createTransaction
);

// Get a transaction by ID
transactionHistoryRouter.get(
	"/:id",
	transactionHistoryControllers.showTransaction
);

// Update a transaction by ID
transactionHistoryRouter.put(
	"/:id",
	transactionHistoryControllers.updateTransaction
);

// Delete a transaction by ID
transactionHistoryRouter.delete(
	"/:id",
	transactionHistoryControllers.deleteTransaction
);

// Get all transactions for a specific simulation
transactionHistoryRouter.get(
	"/simulation/:simulationId",
	transactionHistoryControllers.listTransactionsBySimulation
);

// Get all transactions for a specific simulation and month
transactionHistoryRouter.get(
	"/simulation/:simulationId/month/:month",
	transactionHistoryControllers.listTransactionsBySimulationAndMonth
);

module.exports = transactionHistoryRouter;
