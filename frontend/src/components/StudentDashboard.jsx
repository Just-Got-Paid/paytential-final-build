import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import CurrentUserContext from '../contexts/current-user-context';
import { createSimulation, getAllSimulations, deleteSimulation } from "../adapters/simulation-adapter";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { currentUser, simulations, setSimulations, redirectToGame, setRedirectToGame  } = useContext(CurrentUserContext);

  useEffect(() => {
    const loadSimulations = async () => {
      if (!currentUser) {
        console.log("User not logged in."); 
        return; // Exit if no user is logged in
      }
      // console.log(currentUser.id); 
      const userSimulations = await getAllSimulations(currentUser.id); 
      console.log("format", userSimulations.simulations)
      setSimulations(userSimulations.simulations || []);
    };
    loadSimulations();

    if (redirectToGame) {
      navigate('/game');
      setRedirectToGame(false); // Reset the redirect trigger
    }

  }, [currentUser, setSimulations, redirectToGame, navigate, setRedirectToGame]);

  const handleStartGame = async(e) => {
    e.preventDefault();
    if (!currentUser) {
      console.error("No user logged in.");
      return;
    }

    try {
      //const currentMonth = 0 //new Date().getMonth() + 1; // Get current month as a number (1-12)
      // const yearComplete = false;

      await createSimulation({
        user_id: currentUser.id, 
        current_month: "january",
        is_complete: false,
        net_worth: 0,
      });

      // Re-fetch simulations after creating a new one
      const userSimulations = await getAllSimulations(currentUser.id);
      console.log("type?", userSimulations, userSimulations[0]?.current_month)
      setSimulations(userSimulations.simulations || []);
    } catch (error) {
      console.error("Error creating simulation:", error);
    }
    navigate('/game');
  };


  // Delete simulation function
  const handleDelete = async (id) => {
    const success = await deleteSimulation(id);
    if (success) {
      setSimulations((prevSimulations) => prevSimulations.filter(sim => sim.id !== id));
    } else {
      console.error("Failed to delete simulation.");
    }
  };  

  console.log('Current simulations:', simulations, simulations.length);

  return (
    <div className="simulation-page">
      {/* Game Rules Section */}
      <section className="game-rules">
        <h1>Welcome to the Paytential Game</h1>
        <p>
          In this game, you will create simulations based on your income.
          Choose your income level to create a simulation and manage your finances as events pop up throughout the game.
        </p>
      </section>

      {/* New Simulation Create Section */}
      <button onClick={handleStartGame}>Start Game</button>

      {/* Simulations List Section */}
      <section className="simulations-list">
        <h2>Your Simulations:</h2>
        {simulations.length > 0 ? (
          <ul>
            {simulations.map((simulation) => (
              <li key={simulation.id}>
                {simulation.is_complete ? (
                  <>Month: {`${simulation.current_month}`} | Cycle Completed?: Yes | Total Net Worth: ${simulation.net_worth.toLocaleString()}</>
                ) : (
                  <Link 
                    // to={`/avatar/${simulation.id}`} // Link to the game or delete as needed
                    style={{ textDecoration: 'none', color: 'blue' }} 
                  >
                    Month: {`${simulation.current_month}`} | Cycle Completed?: No | Total Net Worth: ${simulation.net_worth.toLocaleString()}
                  </Link>
                )}
                <button onClick={() => handleDelete(simulation.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No simulations found yet. Start one!</p> // Message for empty simulations
        )}
      </section>
    </div>
  );
}