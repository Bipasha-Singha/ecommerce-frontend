import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Navigate, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import Footer from './Footer';

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
      handleGoogleLogin(coderesponse.access_token);
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post('http://localhost:5000/api/v1/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const { token, user } = response.data;

      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('userId', user._id);
      localStorage.setItem('role', user.role);
      localStorage.setItem('address', user.address);
      setIsLoggedIn(true);
      navigate('/product');
    } catch (error) {
      console.log(error);
      toast.error('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (accessToken) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/google-login', {
        access_token: accessToken,
      });
      const { user } = response.data;

      localStorage.setItem('userId', user._id);
      localStorage.setItem('role', user.role);
      localStorage.setItem('address', user.address);
      setIsLoggedIn(true);
      navigate('/product');
    } catch (error) {
      console.log(error);
      toast.error('Google login failed.');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Wrapper>
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
          <div className="button-1">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Login'}
            </button>

            <button onClick={() => log()} className="btn btn-primary">
              Google
            </button>
          </div>
          <NavLink className="nav-link" to="/ForgotPassword">
            ForgotPassword
          </NavLink>
        </form>
      </div>
      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled.section`
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('pngtree-simple-business-e-commerce-web-page-image_20833.jpg');
  background-position: center;
  background-size: cover; 
  background-repeat: no-repeat;
}

.container h1 {
  color: #fff;
}

form {
  background-color: rgba(255, 255, 255, 0.8); 
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 18px;
  margin-bottom: 5px;
}

input[type='email'],
input[type='password'] {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

button.btn-primary {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.btn-primary:hover {
  background-color: #3e8e41;
}

.nav-link {
  color: red;
  text-decoration: underline;
  margin-top: 10px;
}
.button-1 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
`;
export default Login;
