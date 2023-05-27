import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Navigate, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const log = useGoogleLogin({
    onSuccess: (coderesponse) => {
      console.log(coderesponse.access_token);
      localStorage.setItem('accessToken', coderesponse.access_token);
      navigate('/product');
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post('http://localhost:5000/api/v1/login', { email, password })
      .then((response) => {
        const { token, user } = response.data;

        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('userId', user._id);
        localStorage.setItem('role', user.role);
        localStorage.setItem('address', user.address);
        setIsLoggedIn(true);
        navigate('/product');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Invalid email or password.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>

        <button onClick={() => log()} className="btn btn-primary">
          Google
        </button>
        <NavLink className="nav-link" to="/ForgotPassword">
            ForgotPassword
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
