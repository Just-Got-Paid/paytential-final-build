const express = require("express");
const userProfileRouter = express.Router();
const userProfileControllers = require("../controllers/userProfileControllers");

// Get a user profile by user_id, joined with user details
userProfileRouter.get("/", userProfileControllers.showUserProfile);

// Create a new user profile
// userProfileRouter.post("/", userProfileControllers.createUserProfile);

// Update an existing user profile
userProfileRouter.put("/:userId", userProfileControllers.updateUserProfile);

// Delete a user profile by user_id
userProfileRouter.delete("/:userId", userProfileControllers.deleteUserProfile);

// Get all user profiles by organization where isAdmin is false
userProfileRouter.get(
	"/organization/:organization",
	userProfileControllers.findUserProfilesByOrganization
);

userProfileRouter.get('/organization/users')

module.exports = userProfileRouter;
