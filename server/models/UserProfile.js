const knex = require("../db/knex");

class UserProfile {
	constructor({ user_id, organization, is_admin }) {
		this.userId = user_id;
		this.organization = organization;
		this.isAdmin = is_admin;
	}

	// Retrieve a single user profile by user_id, joined with user details
	static async find(userId) {
		const query = `
      SELECT up.*, u.username
      FROM user_profile AS up
      JOIN users AS u ON up.user_id = u.id
      WHERE up.user_id = ?
    `;
		const result = await knex.raw(query, [userId]);
		const rawData = result.rows[0]; 
		return rawData ? rawData : null;
	}

	// Create a new user profile
	static async create(userId, organization, isAdmin) {
		const query = `
      INSERT INTO user_profile (user_id, organization, is_admin)
      VALUES (?, ?, ?) RETURNING *
    `;
		const result = await knex.raw(query, [userId, organization, isAdmin]);
		return new UserProfile(result.rows[0]);
	}

	// Update an existing user profile
	static async update(userId, updates) {
		const { organization, isAdmin } = updates;
		const query = `
      UPDATE user_profile
      SET organization = ?, is_admin = ?
      WHERE user_id = ?
      RETURNING *
    `;
		const result = await knex.raw(query, [organization, isAdmin, userId]);
		return result.rows[0] ? new UserProfile(result.rows[0]) : null;
	}

	// Delete a user profile by user_id
	static async delete(userId) {
		return knex("user_profile").where({ user_id: userId }).del();
	}

	// Retrieve all user profiles of a specific organization where isAdmin is false
	static async findByOrganization(organization) {
		const query = `
      SELECT up.*, u.username
      FROM user_profile AS up
      JOIN users AS u ON up.user_id = u.id
      WHERE up.organization = ? AND up.is_admin = false
    `;
		const result = await knex.raw(query, [organization]);
		// return result.rows.map((data) => new UserProfile(data));
		return result.rows;
	}
}

module.exports = UserProfile;
