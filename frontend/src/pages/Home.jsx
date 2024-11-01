import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSimulation } from '../adapters/simulation-adapter';
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";

export default function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null); 
  const [errorText, setErrorText] = useState(null);

  const id = currentUser ? Number(currentUser.id) : null;

  // Load user profile if ID is available
  useEffect(() => {
    if (id) {
      const loadUser = async () => {
        const [user, error] = await getUser(id);
        if (error) {
          setErrorText(error.message);
          console.error("Error fetching user:", error);
        } else {
          setUserProfile(user);
        }
      };
      loadUser();
    }
  }, [id]);

  const handleGetStarted = () => {
    navigate('/sign-up');
  };

  const handleCreateSession = async () => {
    if (!id) {
      setErrorText("User ID not found. Please sign in again.");
      return;
    }

    try {
      const response = await createSimulation({ userId: id });
      
      // Ensure simulation ID is returned in the response
      if (response) {
        const simulationId = response[0].id;
        navigate('/setup', { state: { simulationId } });
      } else {
        setErrorText("Simulation ID not received. Please try again.");
        console.error("Simulation creation failed: Simulation ID missing in response.", response);
      }
    } catch (error) {
      setErrorText("Failed to create simulation session. Please try again.");
      console.error("Simulation creation error:", error);
    }
  };

  useEffect(() => {
    const container = document.querySelector('.home-container');
    const heroSection = document.querySelector('.hero-section');
    
    container.classList.add('fade-in');
    heroSection.classList.add('fade-in-bottom');
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Paytential</h1>
        <p>
          Take control of your finances with our interactive budgeting and simulation game. Build
          better financial habits while navigating real-life scenarios!
        </p>
        <button className="cta-button" onClick={handleGetStarted}>
          Get Started
        </button>
        <button className="cta-button" onClick={handleCreateSession}>
          Start Simulation
        </button>
      </div>

      {errorText && <p className="error-message">{errorText}</p>}

      <section className="features-section">
        <div className="feature">
          <h3>Real-World Scenarios</h3>
          <p>Experience realistic financial events like unexpected expenses and income boosts.</p>
        </div>
        <div className="feature">
          <h3>Customizable Budgets</h3>
          <p>Set your own income level and manage your monthly budgets for needs, wants, and savings.</p>
        </div>
        <div className="feature">
          <h3>Track Your Progress</h3>
          <p>Save your past simulations, review spending history, and see how much you've saved.</p>
        </div>
      </section>
    </div>
  );
}
