const knex = require("../db/knex");

class Budget {
	constructor({ id, simulation_id, needs, wants, savings, life_style }) {
		this.id = id;
		this.simulationId = simulation_id;
		this.needs = needs;
		this.wants = wants;
		this.savings = savings;
		this.lifeStyle = life_style;
	}

	// Retrieve all budgets for a specific simulation_id
	static async getAllBySimulationId(simulationId) {
		const query = `
      SELECT b.*, s.current_month
      FROM budgets AS b
      JOIN simulations AS s ON b.simulation_id = s.id
      WHERE b.simulation_id = ?
    `;
		const result = await knex.raw(query, [simulationId]);
		return result.rows.map((rawBudgetData) => new Budget(rawBudgetData));
	}

	// Retrieve budget for a specific simulation_id and current_month
	static async getBySimulationIdAndCurrentMonth(simulationId, currentMonth) {
		const query = `
      SELECT b.*, s.current_month
      FROM budgets AS b
      JOIN simulations AS s ON b.simulation_id = s.id
      WHERE b.simulation_id = ? AND s.current_month = ?
    `;
		const result = await knex.raw(query, [simulationId, currentMonth]);
		return result.rows[0] ? new Budget(result.rows[0]) : null;
	}

	// Retrieve a budget by ID
	static async find(id) {
		const query = `SELECT * FROM budgets WHERE id = ?`;
		const result = await knex.raw(query, [id]);
		const rawBudgetData = result.rows[0];
		return rawBudgetData ? new Budget(rawBudgetData) : null;
	}

	// Create a new budget
	static async create(simulationId, needs, wants, savings, lifeStyle) {
		const query = `
      INSERT INTO budgets (simulation_id, needs, wants, savings, life_style)
      VALUES (?, ?, ?, ?, ?) RETURNING *
    `;
		const result = await knex.raw(query, [
			simulationId,
			needs,
			wants,
			savings,
			lifeStyle,
		]);
		return new Budget(result.rows[0]);
	}

	// Update an existing budget
	static async update(id, updates) {
		const { needs, wants, savings, lifeStyle } = updates;
		const query = `
      UPDATE budgets
      SET needs = ?, wants = ?, savings = ?, life_style = ?
      WHERE id = ?
      RETURNING *
    `;
		const result = await knex.raw(query, [
			needs,
			wants,
			savings,
			lifeStyle,
			id,
		]);
		return result.rows[0] ? new Budget(result.rows[0]) : null;
	}

	// Delete a budget by ID
	static async delete(id) {
		const result = await knex("budgets").where({ id }).del();
		return result > 0; // Returns true if a row was deleted
	}
}

module.exports = Budget;
