// Import the necessary utility functions for making API requests
import { fetchHandler } from "../utils/fetchingUtils";

const baseUrl = "/api/event";

// Get an event by ID
export const getEvent = async (id) => {
	const [event, error] = await fetchHandler(`${baseUrl}/${id}`);

	if (error) {
		console.log(error); // Print the error for simplicity
		return null; // Return null if there's an error
	}

	return event; // Return the event if found
};
