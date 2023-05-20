import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Perform the logout logic here, e.g. remove tokens from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('accessToken');
    // Clear the user token cookie
    //document.cookie = 'token_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Simulate a loading delay
    const timer = setTimeout(() => {
      // Redirect to the login page
      navigate('/login');
      setIsLoading(false);
    }, 2000);

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  // Show a loading spinner while the user is being redirected
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null;
};

export default Logout;
