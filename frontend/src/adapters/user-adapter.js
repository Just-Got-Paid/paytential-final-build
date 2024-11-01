// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
	fetchHandler,
	getPostOptions,
	getPatchOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/users";

const createProfileUrl = "/api/create_user"

export const createUser = async ({ username, password, organization, isAdmin }) => {
	return fetchHandler(createProfileUrl, getPostOptions({ username, password, organization, isAdmin }));
};

// For this one adapter, if an error occurs, we handle it here by printing
// the error and return an empty array
export const getAllUsers = async () => {
	const [users, error] = await fetchHandler(baseUrl);
	if (error) console.log(error); // print the error for simplicity.
	return users || [];
};

export const getUser = async (id) => {
	return fetchHandler(`${baseUrl}/${id}`);
};

export const updateUsername = async ({ username,id }) => {
	return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ username }));
};

// Delete a user by ID
export const deleteUser = async (id) => {
	return fetchHandler(`${baseUrl}/${id}`, getDeleteOptions());
};

// Delete all users (don't think we need)
export const deleteAllUsers = async () => {
	return fetchHandler(baseUrl, getDeleteOptions());
};
