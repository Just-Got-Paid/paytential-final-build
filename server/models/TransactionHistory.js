const knex = require("../db/knex");

class TransactionHistory {
    // Model for interacting with the Tramsaction table
	constructor({
		id,
		simulation_id,
		event_id,
		amount,
		category,
		description,
		month,
		simulation_user_id,
		event_name,
		event_description,
		impact_amount,
		impact_type,
	}) {
		this.id = id;
		this.simulationId = simulation_id;
		this.eventId = event_id;
		this.amount = amount;
		this.category = category;
		this.description = description;
		this.month = month;
		this.simulationUserId = simulation_user_id; // user_id from simulations table
		this.eventName = event_name;
		this.eventDescription = event_description;
		this.eventImpactAmount = impact_amount;
		this.eventImpactType = impact_type;
	}

	// Get a transaction by ID, joining simulations and events for additional data
	static async find(id) {
		const query = `
      SELECT 
        th.*, s.user_id AS simulation_user_id, 
        e.event_name, e.event_description, e.impact_amount, e.impact_type
      FROM transaction_history AS th
      JOIN simulations AS s ON th.simulation_id = s.id
      JOIN events AS e ON th.event_id = e.id
      WHERE th.id = ?
    `;
		const result = await knex.raw(query, [id]);
		const rawData = result.rows[0];
		return rawData ? new TransactionHistory(rawData) : null;
	}

	// Create a new transaction
	static async create(
		simulationId,
		eventId,
		amount,
		category,
		description,
		month
	) {
		const query = `
      INSERT INTO transaction_history (simulation_id, event_id, amount, category, description, month)
      VALUES (?, ?, ?, ?, ?, ?) RETURNING *
    `;
		const result = await knex.raw(query, [
			simulationId,
			eventId,
			amount,
			category,
			description,
			month,
		]);
		return new TransactionHistory(result.rows[0]);
	}

	// Update an existing transaction
	static async update(id, updates) {
		const { amount, category, description, month } = updates;
		const query = `
      UPDATE transaction_history
      SET amount = ?, category = ?, description = ?, month = ?
      WHERE id = ?
      RETURNING *
    `;
		const result = await knex.raw(query, [
			amount,
			category,
			description,
			month,
			id,
		]);
		return result.rows[0] ? new TransactionHistory(result.rows[0]) : null;
	}

	// Delete a transaction by ID
	static async delete(id) {
		return knex("transaction_history").where({ id }).del();
	}

	// Get all transactions of a specific simulation, joining simulations and events for more details
	static async findBySimulation(simulationId) {
		const query = `
      SELECT 
        th.*, s.user_id AS simulation_user_id, 
        e.event_name, e.event_description, e.impact_amount, e.impact_type
      FROM transaction_history AS th
      JOIN simulations AS s ON th.simulation_id = s.id
      JOIN events AS e ON th.event_id = e.id
      WHERE th.simulation_id = ?
    `;
		const result = await knex.raw(query, [simulationId]);
		return result.rows.map((data) => new TransactionHistory(data));
	}

	// Get all transactions of a specific simulation for a specific month
	static async findBySimulationAndMonth(simulationId, month) {
		const query = `
      SELECT 
        th.*, s.user_id AS simulation_user_id, 
        e.event_name, e.event_description, e.impact_amount, e.impact_type
      FROM transaction_history AS th
      JOIN simulations AS s ON th.simulation_id = s.id
      JOIN events AS e ON th.event_id = e.id
      WHERE th.simulation_id = ? AND th.month = ?
    `;
		const result = await knex.raw(query, [simulationId, month]);
		return result.rows.map((data) => new TransactionHistory(data));
	}
}

module.exports = TransactionHistory;
