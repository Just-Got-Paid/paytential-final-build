const Event = require("../models/Event");

// Get an event by ID
exports.showEvent = async (req, res) => {
	const { id } = req.params;

	try {
		const event = await Event.find(id);
		if (!event) return res.sendStatus(404); // Not found
		res.json(event);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve event." });
	}
};
