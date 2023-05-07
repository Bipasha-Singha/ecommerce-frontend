import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import jwt_decode from 'jsonwebtoken';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios.post("http://localhost:5000/api/v1/login", { email, password })
    .then((response) => {
      const { token, user } = response.data;
      localStorage.setItem('token', JSON.stringify(token)); // save the token to local storage
      localStorage.setItem('userId', user._id); // save the user ID to local storage
      setIsLoggedIn(true);
      navigate('/product');
    })
    .catch((error) => {
      console.log(error);
      toast.error("Invalid email or password.");
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
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;