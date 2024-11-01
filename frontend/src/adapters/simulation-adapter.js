import {
	fetchHandler,
	getPostOptions,
	getPatchOptions,
	getDeleteOptions,
} from "../utils/fetchingUtils";

const baseUrl = '/api/simulations';

// Create a new simulation
export const createSimulation = async ({ user_id, current_month, is_complete, net_worth }) => {
  return fetchHandler(baseUrl, getPostOptions({ user_id, current_month, is_complete, net_worth }));
};

// Retrieve all simulations for a specific user
export const getAllSimulations = async (userId) => {
  const [simulations, error] = await fetchHandler(`${baseUrl}/${userId}`);
  if (error) console.log(" error occure", error); 

  return simulations || [];
};

// Retrieve a specific simulation by its ID
export const getSimulation = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

// Update a simulation's details //by sim-id
export const updateSimulation = async ({ current_month, is_complete, net_worth }) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ current_month, is_complete, net_worth }));
}

// Delete a simulation by its ID
export const deleteSimulation = async (id) => {
  const response = await fetchHandler(`${baseUrl}/${id}`, getDeleteOptions);
	console.log(response)
  if (response) {
    return true; // Successfully deleted
  } else {
    // const errorText = await response.text(); // Use text() for non-JSON responses
    console.error("Error deleting simulation:");
    return false; // Deletion failed
  }
};