const knex = require("../db/knex");

class Event {
	// Model for interacting with the Event table
	constructor({
		id,
		event_name,
		event_description,
		impact_amount,
		impact_type,
	}) {
		this.id = id;
		this.eventName = event_name;
		this.eventDescription = event_description;
		this.impactAmount = impact_amount;
		this.impactType = impact_type;
	}

	// Fetch a event by ID
	static async find(id) {
		const query = `SELECT * FROM events WHERE id = ?`;
		const result = await knex.raw(query, [id]);
		const rawData = result.rows[0];
		return rawData ? new Event(rawData) : null;
	}
}

module.exports = Event;
