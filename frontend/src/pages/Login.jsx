import { useState } from 'react';
import { useNavigate } from 'react-router';
import ClientService from '../services/clientService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = async () => {
    setError('');
    try {
      const token = await new ClientService().getLoginToken({
        email: email,
        password: password,
      });
      localStorage.setItem('jwt', token);
      navigate('/');
    } catch (error) {
      setError('Login failed');
      console.error(error);
    }
  };

  const signUpUser = async () => {
    try {
      const success = await new ClientService().signUp();

      if (success) {
        loginUser();
      } else {
        setError('There was a problem when signing up.');
      }
    } catch (error) {
      console.error(error);
    }

    loginUser();
  };

  return (
    <form onSubmit={handleLoginFormSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Log In</button>
      <button type="button" onClick={signUpUser}>
        Sign Up
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
