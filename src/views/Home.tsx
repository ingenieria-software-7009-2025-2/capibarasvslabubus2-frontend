import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Urban Incidents App</h1>
      <button onClick={goToLogin}>Log In</button>
    </div>
  );
}

export default Home;
