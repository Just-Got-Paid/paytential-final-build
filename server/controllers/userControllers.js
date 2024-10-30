const { isAuthorized } = require("../utils/auth-utils");
const User = require("../models/User");

// Create a new user
exports.createUser = async (req, res) => {
	const { username, password } = req.body;

	// Check if the username is taken
	const existingUser = await User.findByUsername(username);
	if (existingUser) {
		return res.status(409).json({ error: "Username is already taken." });
	}

	try {
		const user = await User.create(username, password);
		req.session.userId = user.id; // Log in the user after creation
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: "Failed to create user." });
	}
};

// List all users
exports.listUsers = async (req, res) => {
	try {
		const users = await User.list();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve users." });
	}
};

// Show a single user by ID
exports.showUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.find(id);
		if (!user) return res.sendStatus(404);
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve user." });
	}
};

// Update a user by ID
exports.updateUser = async (req, res) => {
	const { username } = req.body;
	const { id } = req.params;

	// Not only do users need to be logged in to update a user, they
	// need to be authorized to perform this action for this particular
	// user (users should only be able to change their own profiles)
	if (!isAuthorized(id, req.session)) return res.sendStatus(403);

	try {
		const updatedUser = await User.update(id, username);
		if (!updatedUser) return res.sendStatus(404);
		res.json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: "Failed to update user." });
	}
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
	const { id } = req.params;

	// Check if the user is authorized to delete the account
	if (!isAuthorized(id, req.session)) return res.sendStatus(403);

	try {
		const deleted = await User.delete(id);
		if (!deleted) return res.sendStatus(404); // Not found or already deleted
		res.sendStatus(204); // No Content
	} catch (error) {
		res.status(500).json({ error: "Failed to delete user." });
	}
};

// Delete all users (usually for testing)
exports.deleteAllUsers = async (req, res) => {
	try {
		await User.deleteAll();
		res.sendStatus(204); // No Content
	} catch (error) {
		res.status(500).json({ error: "Failed to delete users." });
	}
};
