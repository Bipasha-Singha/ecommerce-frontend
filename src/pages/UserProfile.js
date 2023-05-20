import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        navigate('/login');
      } 
      
    fetch(`http://localhost:5000/api/v1/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [navigate]);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome {user.name}</h1>
          <p>Address: {user.address}</p>
          <p>Phone Number: {user.phone}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default UserProfile;
