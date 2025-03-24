import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="home-container">
      <h1>Welcome to the App</h1>
      <button onClick={goToLogin}>Sign In</button>
      <button onClick={goToRegister}>Register</button>
    </div>
  );
}

export default Home;
