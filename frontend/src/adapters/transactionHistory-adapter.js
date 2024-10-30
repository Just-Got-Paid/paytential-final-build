// Import the necessary utility functions for making API requests
import {
	fetchHandler,
	getPostOptions,
	getPatchOptions,
	getDeleteOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/transactions";

// Create a new transaction
export const createTransaction = async ({
	simulationId,
	eventId,
	amount,
	category,
	description,
	month,
}) => {
	return fetchHandler(
		baseUrl,
		getPostOptions({
			simulationId,
			eventId,
			amount,
			category,
			description,
			month,
		})
	);
};

// Get a transaction by ID
export const getTransaction = async (id) => {
	return fetchHandler(`${baseUrl}/${id}`);
};

// Update a transaction by ID
export const updateTransaction = async (id, updates) => {
	return fetchHandler(`${baseUrl}/${id}`, getPatchOptions(updates));
};

// Delete a transaction by ID
export const deleteTransaction = async (id) => {
	return fetchHandler(`${baseUrl}/${id}`, getDeleteOptions());
};

// Get all transactions for a specific simulation
export const getTransactionsBySimulation = async (simulationId) => {
	return fetchHandler(`${baseUrl}/simulation/${simulationId}`);
};

// Get all transactions for a specific simulation and month
export const getTransactionsBySimulationAndMonth = async (
	simulationId,
	month
) => {
	return fetchHandler(`${baseUrl}/simulation/${simulationId}/month/${month}`);
};
