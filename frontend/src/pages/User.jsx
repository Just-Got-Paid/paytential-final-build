import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import AdminDashboard from "../components/AdminDashboard";
import StudentDashboard from "../components/StudentDashboard"

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, redirectToGame, setRedirectToGame } = useContext(CurrentUserContext);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <>
      <h1>Welcome {currentUser.username}</h1>
      <p>Your role is {currentUser.isAdmin? "Admin" : "Student"} in the {currentUser.organization} organization.</p>

      {/* Show Admin Dashboard based on isAdmin property */}
      {currentUser.isAdmin ? <AdminDashboard /> : <StudentDashboard />} 

      {<button onClick={handleLogout}>Log Out</button>}
      {<UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser} />}

    </>
  );
}
// <button onClick={handleStartGame}>Start Game</button>

