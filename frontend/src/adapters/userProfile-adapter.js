// adapters/user-profile-adapter.js
import {
	fetchHandler,
	getPostOptions,
	getPatchOptions,
	getDeleteOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/userProfile";

// Create a new user profile
export const createUserProfile = async ({ userId, organization, isAdmin }) => {
	return fetchHandler(
		baseUrl,
		getPostOptions({ userId, organization, isAdmin })
	);
};

// Get a user profile by user ID
export const getUserProfile = async (userId) => {
	return fetchHandler(`${baseUrl}/${userId}`);
};

// Update an existing user profile
export const updateUserProfile = async (userId, updates) => {
	return fetchHandler(`${baseUrl}/${userId}`, getPatchOptions(updates));
};

// Delete a user profile by user ID
export const deleteUserProfile = async (userId) => {
	return fetchHandler(`${baseUrl}/${userId}`, getDeleteOptions());
};

// Get all user profiles by organization
export const getUserProfilesByOrganization = async (organization) => {
	return fetchHandler(`${baseUrl}/organization/${organization}`);
};
