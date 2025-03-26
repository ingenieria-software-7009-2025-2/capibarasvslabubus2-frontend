import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const goToMyAccount = () => {
    navigate('/myaccount');
  };

  return (
    <div className="home-container">
      <h1>Welcome to the App</h1>
      <button onClick={goToLogin}>Sign In</button>
      <button onClick={goToRegister}>Register</button>
      <button onClick={goToMyAccount}>My Account</button>
    </div>
  );
}

export default Home;
