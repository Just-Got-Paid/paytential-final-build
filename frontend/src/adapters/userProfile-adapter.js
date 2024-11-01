// adapters/user-profile-adapter.js
import {
	fetchHandler,
	getPostOptions,
	getPatchOptions,
	getDeleteOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/userProfile";

const deleteUrl = "/api/delete_user/";

// Get a user profile by user ID
export const getUserProfile = async () => {
	return fetchHandler(`${baseUrl}`);
};

// Update an existing user profile
export const updateUserProfile = async (userId, updates) => {
	return fetchHandler(`${baseUrl}/${userId}`, getPatchOptions(updates));
};

// Delete a user profile by user ID
export const deleteUserProfile = async (userId) => {
	return fetchHandler(`${deleteUrl}/${userId}`, getDeleteOptions);
};

// Get all user profiles by organization
export const getUserProfilesByOrganization = async (organization) => {
	console.log(organization)
	return fetchHandler(`${baseUrl}/organization/${organization}`);
};
