const TransactionHistory = require("../models/TransactionHistory");

// Create a new transaction
exports.createTransaction = async (req, res) => {
	const { simulationId, eventId, amount, category, description, month } =
		req.body;

	try {
		const transaction = await TransactionHistory.create(
			simulationId,
			eventId,
			amount,
			category,
			description,
			month
		);
		res.status(201).json(transaction);
	} catch (error) {
		res.status(500).json({ error: "Failed to create transaction." });
	}
};

// Get a transaction by ID
exports.showTransaction = async (req, res) => {
	const { id } = req.params;

	try {
		const transaction = await TransactionHistory.find(id);
		if (!transaction) return res.sendStatus(404); // Not found
		res.json(transaction);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve transaction." });
	}
};

// Update a transaction by ID
exports.updateTransaction = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	try {
		const updatedTransaction = await TransactionHistory.update(id, updates);
		if (!updatedTransaction) return res.sendStatus(404); // Not found
		res.json(updatedTransaction);
	} catch (error) {
		res.status(500).json({ error: "Failed to update transaction." });
	}
};

// Delete a transaction by ID
exports.deleteTransaction = async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await TransactionHistory.delete(id);
		if (!deleted) return res.sendStatus(404); // Not found
		res.sendStatus(204); // No Content
	} catch (error) {
		res.status(500).json({ error: "Failed to delete transaction." });
	}
};

// Get all transactions for a specific simulation
exports.listTransactionsBySimulation = async (req, res) => {
	const { simulationId } = req.params;

	try {
		const transactions = await TransactionHistory.findBySimulation(
			simulationId
		);
		res.json(transactions);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve transactions." });
	}
};

// Get all transactions for a specific simulation and month
exports.listTransactionsBySimulationAndMonth = async (req, res) => {
	const { simulationId, month } = req.params;

	try {
		const transactions = await TransactionHistory.findBySimulationAndMonth(
			simulationId,
			month
		);
		res.json(transactions);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Failed to retrieve transactions for the month." });
	}
};
