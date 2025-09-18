import React, { useEffect, useState } from 'react';

const BASE_URL =  'https://user-backend-bg84.onrender.com';

function UserComponent() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const [error, setError] = useState('');

  // Fetch all users on component mount
  useEffect(() => {
    fetch(`${BASE_URL}/allUsers`)
  .then(res => res.json())
  .then(data => setUsers(data))
  .catch(err => {
    console.error('Error fetching users:', err);
    setError('Failed to load users.');
  });
  }, []);

  // Fetch user by ID
  const handleFindUser = () => {
    if (!userId) return;

    fetch(`${BASE_URL}/find/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('User not found');
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setFoundUser(data);
          setError('');
        } else {
          setFoundUser(null);
          setError('User not found.');
        }
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        setFoundUser(null);
        setError('User not found.');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} (ID: {user.id})</li>
        ))}
      </ul>

      <hr />

      <h2>Find User by ID</h2>
      <input
        type="number"
        placeholder="Enter user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleFindUser}>Find User</button>

      {foundUser && (
        <div>
          <h3>Result:</h3>
          <p>
            Name: {foundUser.name} <br />
            ID: {foundUser.id}
          </p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UserComponent;
