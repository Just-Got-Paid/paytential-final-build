const Budget = require("../models/Budget");

// Get all budgets for a specific simulation
exports.listBudgetsBySimulationId = async (req, res) => {
	const { simulationId } = req.params;

	try {
		const budgets = await Budget.getAllBySimulationId(simulationId);
		res.json(budgets);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve budgets." });
	}
};

// Get budget for a specific simulation and current month
exports.showBudgetBySimulationAndMonth = async (req, res) => {
	const { simulationId, currentMonth } = req.params;

	try {
		const budget = await Budget.getBySimulationIdAndCurrentMonth(
			simulationId,
			currentMonth
		);
		if (!budget) return res.sendStatus(404); // Not found
		res.json(budget);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve budget." });
	}
};

// Get a budget by ID
exports.showBudget = async (req, res) => {
	const { id } = req.params;

	try {
		const budget = await Budget.find(id);
		if (!budget) return res.sendStatus(404); // Not found
		res.send(budget);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve budget." });
	}
};

// Create a new budget
exports.createBudget = async (req, res) => {
	const { simulationId, needs, wants, savings, lifeStyle } = req.body;
	console.log('hi', simulationId, needs, wants, savings, lifeStyle)

	try {
		const budget = await Budget.create(
			simulationId,
			needs,
			wants,
			savings,
			lifeStyle
		);
		res.send(budget);
	} catch (error) {
		res.status(500).json({ error: "Failed to create budget." });
	}
};

// Update an existing budget
exports.updateBudget = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	try {
		const updatedBudget = await Budget.update(id, updates);
		if (!updatedBudget) return res.sendStatus(404); // Not found
		res.json(updatedBudget);
	} catch (error) {
		res.status(500).json({ error: "Failed to update budget." });
	}
};

// Delete a budget by ID
exports.deleteBudget = async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await Budget.delete(id);
		if (!deleted) return res.sendStatus(404); // Not found
		res.sendStatus(204); // No content, successful deletion
	} catch (error) {
		res.status(500).json({ error: "Failed to delete budget." });
	}
};
