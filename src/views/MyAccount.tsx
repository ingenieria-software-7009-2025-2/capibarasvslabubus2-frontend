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
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch user info');
      })
      .then(data => {
        setUser(data);
      })
      .catch(err => {
        console.error(err);
        setError('Error fetching user info');
      });
  }, []);

  return (
    <div className="myaccount-container">
      <h1>My Account</h1>
      {error && <p>{error}</p>}
      {user ? (
        <div className="user-info">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Token:</strong> {user.token}</p>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
      </div>
    </div>
  );
}

export default MyAccount;
