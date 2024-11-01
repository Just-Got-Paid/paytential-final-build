const Simulation = require("../models/Simulation");

// Create a new simulation
exports.createSimulation = async (req, res) => {
	const { userId } = req.body;
	try {
		const simulation = await Simulation.create(userId, "january", 10000, false);
		res.send(simulation);
		// res.status(201).json(simulation);
	} catch (error) {
		res
			.status(500)
			.json({ error: `Failed to create simulation. ${error.message}` });
	}
};

// Get a simulation by ID
exports.showSimulation = async (req, res) => {
	const { id } = req.params;

	try {
		const simulation = await Simulation.find(id);
		if (!simulation) return res.sendStatus(404); // Not found
		res.send(simulation);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve simulation." });
	}
};

// Update a simulation by ID
exports.updateSimulation = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	try {
		const updatedSimulation = await Simulation.update(id, updates);
		if (!updatedSimulation) return res.sendStatus(404); // Not found
		res.send(updatedSimulation);
	} catch (error) {
		res.status(500).json({ error: "Failed to update simulation." });
	}
};
