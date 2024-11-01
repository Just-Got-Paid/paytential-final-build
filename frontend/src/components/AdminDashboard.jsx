import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import { getUserProfilesByOrganization, deleteUserProfile } from '../adapters/userProfile-adapter';

export default function AdminDashboard() {
  const { currentUser, orgUsers, setOrgUsers } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    const studentsInOrg = async () => {
      const [users, error] = await getUserProfilesByOrganization(currentUser.organization);
      if (error) return setErrorText(error.message);
      console.log("teams", users);
      setOrgUsers(users);
    };

    studentsInOrg();
  }, [currentUser.organization, setOrgUsers]);

  // Delete student function
  const handleDeleteStudent = async (event, studentId) => {
    event.preventDefault();
    setErrorText('');

    const [user, error] = await deleteUserProfile(studentId);
    if (error) return setErrorText(error.message);

    setOrgUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== studentId));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Students in {currentUser.organization}:</h3>
      {errorText && <p style={{ color: 'red' }}>{errorText}</p>}
      <ul>
        {orgUsers?.map((student) => (
          <li key={student.user_id}>
            {student.username}
            <button onClick={(event) => handleDeleteStudent(event, student.user_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


