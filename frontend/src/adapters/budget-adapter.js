// Import the necessary utility functions for making API requests
import {
	fetchHandler,
	getPostOptions,
	getPatchOptions,
} from "../utils/fetchingUtils";

const baseUrl = '/api/budget';

// Get all budgets for a specific simulation
export const getBudgetsBySimulationId = async (simulationId) => {
	const [budgets, error] = await fetchHandler(
		`${baseUrl}/simulation/${simulationId}`
	);
	if (error) {
		console.log(error);
		return []; // Return an empty array if there's an error
	}
	return budgets; // Return the list of budgets
};

// Get budget for a specific simulation and current month
export const getBudgetBySimulationAndMonth = async (
	simulationId,
	currentMonth
) => {
	const [budget, error] = await fetchHandler(
		`${baseUrl}/simulation/${simulationId}/month/${currentMonth}`
	);
	if (error) {
		console.log(error);
		return null; // Return null if there's an error
	}
	return budget; // Return the budget object
};

// Get a budget by ID
export const getBudgetById = async (id) => {
	const [budget, error] = await fetchHandler(`${baseUrl}/${id}`);
	if (error) {
		console.log(error);
		return null; // Return null if there's an error
	}
	return budget; // Return the budget object
};

// Create a new budget
export const createBudget = async ({
	simulationId,
	needs,
	wants,
	savings,
	lifeStyle,
}) => {
	return fetchHandler(
		baseUrl,
		getPostOptions({ simulationId, needs, wants, savings, lifeStyle })
	);
};

// Update an existing budget
export const updateBudget = async (id, updates) => {
	return fetchHandler(`${baseUrl}/${id}`, getPatchOptions(updates));
};

// Delete a budget by ID
export const deleteBudget = async (id) => {
	const [_, error] = await fetchHandler(`${baseUrl}/${id}`, {
		method: "DELETE",
	});

	if (error) {
		console.log(error);
		return false; // Return false if there's an error
	}
	return true; // Return true if deletion was successful
};
