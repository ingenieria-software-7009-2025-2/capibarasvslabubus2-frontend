import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8080/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('token', user.token);
        navigate('/myaccount');
      } else if (response.status === 404) {
        setMessage('Incorrect email or password');
      } else {
        setMessage('An error occurred during login');
      }
    } catch (error) {
      console.error('Error connecting to the backend:', error);
      setMessage('Error connecting to the server');
    }
  };

  return (
    <div className="login-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
}

export default Login;
