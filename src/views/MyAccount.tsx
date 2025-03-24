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
        if (response.ok) return response.json();
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
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default MyAccount;
