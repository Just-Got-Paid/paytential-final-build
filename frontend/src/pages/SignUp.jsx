import { useContext, useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Redirect if the user is already logged in
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  useEffect(() => {
    const container = document.querySelector('.signup-container');
    container.classList.add('fade-in');
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');

    // Validate form fields
    if (!username || !password || !organization) {
      return setErrorText('Missing username, password, or organization');
    } 

    // Create the user via the user-adapter
    const [user, error] = await createUser({ username, password, organization, isAdmin });
    if (error) return setErrorText(error.message);
    
    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target; // Get the type of the input
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (name === 'organization') setOrganization(value);
    if (name === 'isAdmin') setIsAdmin(checked); // Use checked for checkboxes
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} onChange={handleChange} aria-labelledby="create-heading">
        <h2 id="create-heading">Create New User</h2>
        
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />

        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <label htmlFor="organization">Organization</label>
        <input
          autoComplete="off"
          type="text"
          id="organization"
          name="organization"
          onChange={handleChange}
          value={organization}
        />

        <label htmlFor="isAdmin">
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            checked={isAdmin}
            onChange={handleChange}
          />
          Admin
        </label>

        <button>Sign Up Now!</button>
      </form>
      {!!errorText && <p>{errorText}</p>}
      <p>Already have an account with us? <Link to="/login">Log in!</Link></p>
    </div>
  );
}
