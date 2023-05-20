import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { email, password } = formData;

  useEffect(() => {
    // Check if token is already present in cookie
    const adminToken = document.cookie
      .split(';')
      .find((cookie) => cookie.startsWith('token='));

    if (adminToken) {
      // Redirect to admin dashboard
      window.location.href = '/pages/AdminDashboard';
    }
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/v1/admin/login`,
        { email, password },
        config
      );

      // Save token to cookie
      document.cookie = `token_admin=${data.token}; expires=${new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME
      )}; path=/;`;

      // Redirect to admin dashboard
      window.location.href = '/pages/AdminDashboard';
    } catch (error) {
      setError(error.response.data.message);
      window.alert(error.response.data.message); // Display the error message as an alert
    }
  };

  return (
    <div className="container">
      <h1>Admin Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={document.cookie.includes('token=')}
        >
          {document.cookie.includes('token=') ? 'Dashboard' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
