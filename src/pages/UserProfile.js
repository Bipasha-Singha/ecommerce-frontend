import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:5000/api/v1/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate]);

  return (
    <Wrapper>
      <div className="container">
        {user ? (
          <div>
            <h1>Welcome {user.name}</h1>
            <div className="user-profile">
              <div className="profile-image">
                <img src={`http://localhost:5000/api/v1/user/${user._id}/image`} alt={user.name} />
              </div>
              <div className="user-details">
                <p>Address: {user.address}</p>
                <p>Phone Number: {user.phone}</p>
                <p>Email: {user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .user-profile {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  .profile-image img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 20px;
  }

  .user-details {
    display: flex;
    flex-direction: column;
  }
`;

export default UserProfile;
