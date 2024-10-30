const knex = require("../db/knex");

class Simulation {
	// Model for interacting with the Simulation table
	constructor({ id, user_id, current_month, net_worth, is_complete }) {
		this.id = id;
		this.userId = user_id;
		this.currentMonth = current_month;
		this.netWorth = net_worth;
		this.isComplete = is_complete;
	}

	// Fetch a simulation by ID
	static async find(id) {
		const query = `SELECT * FROM simulations WHERE id = ?`;
		const result = await knex.raw(query, [id]);
		const rawData = result.rows[0];
		return rawData ? new Simulation(rawData) : null;
	}

	// Create a new simulation
	static async create(userId, currentMonth, netWorth, isComplete) {
		const query = `
			INSERT INTO simulations (user_id, current_month, net_worth, is_complete)
			VALUES (?, ?, ?, ?) RETURNING *
		`;
		const result = await knex.raw(query, [
			userId,
			currentMonth,
			netWorth,
			isComplete,
		]);
		return new Simulation(result.rows[0]);
	}

	// Update an existing simulation
	static async update(id, updates) {
		const { currentMonth, netWorth, isComplete } = updates;
		const query = `
			UPDATE simulations
			SET current_month = ?, net_worth = ?, is_complete = ?
			WHERE id = ?
			RETURNING *
		`;
		const result = await knex.raw(query, [
			currentMonth,
			netWorth,
			isComplete,
			id,
		]);
		return result.rows[0] ? new Simulation(result.rows[0]) : null;
	}
}

module.exports = Simulation;
