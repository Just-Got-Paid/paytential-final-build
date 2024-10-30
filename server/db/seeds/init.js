const User = require('../../models/User');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
	// Clear tables in dependency order
	await knex("transaction_history").del();
	await knex("budgets").del();
	await knex("events").del();
	await knex("user_profile").del();
	await knex("simulations").del();
	await knex("users").del();

	// Reset sequences for primary keys
	await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
	await knex.raw("ALTER SEQUENCE simulations_id_seq RESTART WITH 1");
	await knex.raw("ALTER SEQUENCE transaction_history_id_seq RESTART WITH 1");
	await knex.raw("ALTER SEQUENCE budgets_id_seq RESTART WITH 1");
	await knex.raw("ALTER SEQUENCE events_id_seq RESTART WITH 1");

	// Seed Users
	const users = await knex("users")
		.insert([
			{ id: 1, username: "adamsmith", password_hash: "123" },
			{ id: 2, username: "billybowers", password_hash: "123" },
			{ id: 3, username: "calebwells", password_hash: "123" },
		])
		.returning("id");

	// Seed Simulations
	const simulations = await knex("simulations")
		.insert([
			{
				id: 1,
				user_id: 1,
				current_month: "march",
				net_worth: 24000.05,
				is_complete: false,
			},
			{
				id: 2,
				user_id: 2,
				current_month: "april",
				net_worth: 2000.05,
				is_complete: false,
			},
			{
				id: 3,
				user_id: 1,
				current_month: "june",
				net_worth: 20.41,
				is_complete: true,
			},
		])
		.returning("id");

	// Seed Events
	const events = await knex("events")
		.insert([
			{
				id: 1,
				event_name: "tempforLifestyle",
				event_description: "tempforLifestyle",
				impact_amount: -200,
				impact_type: "needs",
			},
			{
				id: 2,
				event_name: "tempforLifestyle",
				event_description: "tempforLifestyle",
				impact_amount: 500,
				impact_type: "wants",
			},
			{
				id: 3,
				event_name: "tempforLifestyle",
				event_description: "tempforLifestyle",
				impact_amount: 1000,
				impact_type: "savings",
			},
		])
		.returning("id");

	// Seed Transaction History
	const transactionHistory = await knex("transaction_history")
		.insert([
			{
				id: 1,
				simulation_id: 1,
				event_id: 1, // Ensure this exists in events
				amount: 5000.11,
				category: "needs",
				description: "temp",
				month: "march",
			},
			{
				id: 2,
				simulation_id: 2,
				event_id: 2, // Ensure this exists in events
				amount: 340.23,
				category: "wants",
				description: "temp",
				month: "october",
			},
			{
				id: 3,
				simulation_id: 1,
				event_id: 3, // Ensure this exists in events
				amount: 54.23,
				category: "savings",
				description: "temp",
				month: "june",
			},
		])
		.returning("id");

	// Seed Budgets
	const budgets = await knex("budgets")
		.insert([
			{
				id: 1,
				simulation_id: 1,
				needs: 3517.58,
				wants: 2110.55,
				savings: 1407.03,
				life_style: "moderate",
			},
			{
				id: 2,
				simulation_id: 2,
				needs: 5434.25,
				wants: 3260.55,
				savings: 2173.7,
				life_style: "luxury",
			},
			{
				id: 3,
				simulation_id: 3,
				needs: 2267.96,
				wants: 1360.78,
				savings: 907.18,
				life_style: "basic",
			},
		])
		.returning("id");

	// Seed User Profiles
	const userProfile = await knex("user_profile").insert([
		{ user_id: 1, organization: "marcy", is_admin: true },
		{ user_id: 2, organization: "apple", is_admin: false },
		{ user_id: 3, organization: "obt", is_admin: false },
	]);
};
