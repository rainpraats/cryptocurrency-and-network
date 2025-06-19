import { useState } from 'react';
import { useNavigate } from 'react-router';
import ClientService from '../services/clientService';
import './Login.css';

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
      const success = await new ClientService().signUp({
        email: email,
        password: password,
      });

      if (success) {
        loginUser();
      }
    } catch (error) {
      setError('There was a problem when signing up.');
      console.error(error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLoginFormSubmit}>
      <h1>Cryptocurrency client application</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError('');
        }}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError('');
        }}
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
