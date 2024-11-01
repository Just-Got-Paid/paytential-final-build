const Simulation = require('../models/Simulation');

exports.createSimulation = async (req, res) => {
  try {
    const { user_id, current_month, is_complete, net_worth } = req.body;
		// console.log(user_id, current_month, is_complete, net_worth)
    const newSimulation = await Simulation.create(user_id, current_month, is_complete, net_worth);
		// console.log("newly created sim", newSimulation)
    res.status(201).json({ simulation: newSimulation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Returns all simulations for the logged-in user
exports.getSimulationsByUser = async (req, res) => {
  try {
    const userId = req.session.userId;
		// console.log(userId)
    const simulations = await Simulation.findByUserId(userId);
		// console.log("array of sim", simulations)
    res.status(200).json({ simulations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Returns simulation info of one avatar run
exports.getSimulationById = async (req, res) => {
  try {
    const { id } = req.params;
    const simulation = await Simulation.findById(id);

    if (simulation) {
      res.status(200).json({ simulation });
    } else {
      res.status(404).json({ error: 'Simulation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Updates simulation info of one avatar run
exports.updateSimulation = async (req, res) => {
  try {
    const { id } = req.params;
    const { current_month, is_complete, net_worth } = req.body;
    const simulation = await Simulation.findById(id);

    if (simulation && simulation.user_id === req.session.userId) {
      const updatedSimulation = await Simulation.update(id, current_month, is_complete, net_worth);
      res.status(200).json({ simulation: updatedSimulation });
    } else {
      res.status(403).json({ error: 'Forbidden: You do not own this simulation' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletes a simulation
exports.deleteSimulation = async (req, res) => {
  console.log("Attempting to delete simulation...");
  try {
    const { id } = req.params;
    const simulation = await Simulation.findById(id);
    
    console.log("Simulation found:", simulation);
    console.log(simulation.userId ,req.session);

		// await Simulation.delete(id);
    // res.status(204).send();  // No content, successfully deleted
			
    if (simulation && simulation.userId === req.session.userId) {
      const deletedCount = await Simulation.delete(id);
    	console.log("Deleted count:", deletedCount);
      res.status(204).send();  // No content, successfully deleted
    } else {
      res.status(403).json({ error: 'Forbidden: You do not own this simulation' });
    }
  } catch (error) {
    console.error("Error deleting simulation:", error);
    res.status(500).json({ error: error.message });
  }
};

