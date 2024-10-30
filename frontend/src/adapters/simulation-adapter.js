// Import the necessary utility functions for making API requests
import {
	fetchHandler,
	getPostOptions,
	getPatchOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/simulations";

// Create a new simulation
export const createSimulation = async ({
	userId,
	currentMonth,
	netWorth,
	isComplete,
}) => {
	return fetchHandler(
		baseUrl,
		getPostOptions({ userId, currentMonth, netWorth, isComplete })
	);
};

// Get a simulation by ID
export const getSimulation = async (id) => {
	return fetchHandler(`${baseUrl}/${id}`);
};

// Update a simulation by ID
export const updateSimulation = async (id, updates) => {
	return fetchHandler(`${baseUrl}/${id}`, getPatchOptions(updates));
};
