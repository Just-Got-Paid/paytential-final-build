const UserProfile = require("../models/UserProfile");

// Get a user profile by user_id
exports.showUserProfile = async (req, res) => {
	const { userId } = req.params;

	try {
		const userProfile = await UserProfile.find(userId);
		if (!userProfile) return res.sendStatus(404); // Not found
		res.json(userProfile);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve user profile." });
	}
};

// Create a new user profile
exports.createUserProfile = async (req, res) => {
	const { userId, organization, isAdmin } = req.body;

	try {
		const newUserProfile = new UserProfile({
			user_id: userId,
			organization,
			is_admin: isAdmin,
		});

		const createdProfile = await UserProfile.create(
			newUserProfile.userId,
			newUserProfile.organization,
			newUserProfile.isAdmin
		);
		res.status(201).json(createdProfile);
	} catch (error) {
		res.status(500).json({ error: "Failed to create user profile." });
	}
};

// Update an existing user profile
exports.updateUserProfile = async (req, res) => {
	const { userId } = req.params;
	const updates = req.body;

	try {
		const updatedProfile = await UserProfile.update(userId, updates);
		if (!updatedProfile) return res.sendStatus(404); // Not found
		res.json(updatedProfile);
	} catch (error) {
		res.status(500).json({ error: "Failed to update user profile." });
	}
};

// Delete a user profile by user_id
exports.deleteUserProfile = async (req, res) => {
	const { userId } = req.params;

	try {
		const deleted = await UserProfile.delete(userId);
		if (!deleted) return res.sendStatus(404); // Not foundsr
		res.sendStatus(204); // No content, successful deletion
	} catch (error) {
		res.status(500).json({ error: "Failed to delete user profile." });
	}
};

// Get all user profiles by organization where isAdmin is false
exports.findUserProfilesByOrganization = async (req, res) => {
	const { organization } = req.params;

	try {
		const profiles = await UserProfile.findByOrganization(organization);
		res.json(profiles);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve user profiles." });
	}
};
