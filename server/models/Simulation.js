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

	  // New simulation recorded
		static async create(user_id, current_month, is_complete, net_worth) {
			const query = `
					INSERT INTO simulations (user_id, current_month, is_complete, net_worth)
					VALUES (?, ?, ?, ?) RETURNING *
			`;
	
			// console.log('Creating simulation with:', { user_id, current_month, is_complete, net_worth });
	
			try {
					const result = await knex.raw(query, [user_id, current_month, is_complete, net_worth]);
					const rawSimulationData = result.rows[0];
					return rawSimulationData;
			} catch (error) {
					// console.error('Error creating simulation:', error);
					throw new Error('Could not create simulation');
			}
		}
	
		// Retrieves all simulations associated with a specific user ID
		static async findByUserId(user_id) {
			const query = `
				SELECT * FROM simulations WHERE user_id = ?
			`;
			const result = await knex.raw(query, [user_id]);
			// console.log(result.rows)
			return result.rows
		}
	
		// Id here represents simulation_id
		// Retrieves a simulation by its ID
		static async findById(id) {
			const query = `
				SELECT * FROM simulations WHERE id = ?
			`;
			const result = await knex.raw(query, [id]);
			return result.rows.length ? new Simulation(result.rows[0]) : null;
		}
	
		// Updates a simulation’s details based on its id(simulation_id)
		static async update(id, current_month, is_complete, net_worth) {
			const query = `
				UPDATE simulations
				SET current_month = ?, is_complete = ?, net_worth = ?
				WHERE id = ?
				RETURNING *
			`;
			const result = await knex.raw(query, [current_month, is_complete, net_worth, id]);
			const updatedSimulation = result.rows[0];
			return new Simulation(updatedSimulation);
		}
	
		static async delete(id) {
			return knex('simulations').where({ id }).del();
		}
	}
	
	module.exports = Simulation;
