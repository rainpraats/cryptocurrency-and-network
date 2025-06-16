import { useNavigate } from 'react-router';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  return (
    <header>
      <p>Cryptocurrency Client Application</p>
      <button onClick={handleSignOut}>Log out</button>
    </header>
  );
};

export default Header;
