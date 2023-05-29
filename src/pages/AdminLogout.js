import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AdminLogout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logging out...");
    axios.post(`http://localhost:5000/api/v1/admin/logout`)
      .then(response => {
        console.log(response.data);
        // clear local storage and redirect to home page
        localStorage.clear();
        // Clear the admin token cookie
       //document.cookie = 'token_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
       const cookies = document.cookie.split(';');
       cookies.forEach(cookie => {
         const cookieParts = cookie.split('=');
         const cookieName = cookieParts[0].trim();
         document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
       });
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default AdminLogout;
