import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

interface User {
  id: string;
  email: string;
  token: string;
  password: string;
}

function MyAccount() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token provided. Please login.');
      return;
    }

    fetch('http://localhost:8080/v1/users/me', {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Failed to fetch user info');
      })
      .then(data => {
        setUser(data);
        setUpdateEmail(data.email); // Pre-fill the email field with current email
      })
      .catch(err => {
        console.error(err);
        setError('Error fetching user info');
      });
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token available for logout');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/v1/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
      });
      if (response.ok) {
        localStorage.removeItem('token');
        navigate('/');
      } else {
        setError('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setError('Error connecting to logout endpoint');
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token provided. Please login.');
      return;
    }

    // Prepare update data
    const updateData: any = { email: updateEmail };
    // Solo incluir password si se ha ingresado un valor
    if (updatePassword.trim() !== '') {
      updateData.password = updatePassword;
    }

    try {
      const response = await fetch('http://localhost:8080/v1/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(updateData)
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setUpdateMessage('User info updated successfully.');
      } else {
        setUpdateMessage('Failed to update user info.');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      setUpdateMessage('Error connecting to update endpoint.');
    }
  };

  return (
    <div className="myaccount-container">
      <h1>My Account</h1>
      {error && <p className="error">{error}</p>}
      {user ? (
        <div className="user-info">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Token:</strong> {user.token}</p>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
      
      <div className="update-user">
        <h2>Update Your Information</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="updateEmail">Email:</label>
            <input
              type="email"
              id="updateEmail"
              value={updateEmail}
              onChange={(e) => setUpdateEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="updatePassword">New Password:</label>
            <input
              type="password"
              id="updatePassword"
              value={updatePassword}
              onChange={(e) => setUpdatePassword(e.target.value)}
              placeholder="Enter new password (optional)"
            />
          </div>
          <button type="submit">Update</button>
        </form>
        {updateMessage && <p>{updateMessage}</p>}
      </div>
      
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default MyAccount;
