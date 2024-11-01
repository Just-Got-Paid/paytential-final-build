import { useState, useEffect } from 'react';
import CurrentUserContext from './current-user-context';

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [orgUsers, setOrgUsers] = useState([]);
  const [simulations, setSimulations] = useState([]);

  // Flag to trigger redirection only once after role selection
  const [redirectToGame, setRedirectToGame] = useState(false);


  const updateRoleAndOrganization = (role, organization) => {
    setCurrentUser((prevUser) => ({ ...prevUser, role, organization }));

    if (role === 'student') {
      setRedirectToGame(true); // Trigger redirect for students
    }
  };


  const context = {
    currentUser,
    setCurrentUser,
    orgUsers,
    setOrgUsers,
    simulations,
    setSimulations,
    redirectToGame,
    setRedirectToGame,
    updateRoleAndOrganization,
  };

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}
