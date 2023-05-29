import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLogout from './AdminLogout';
import styled from 'styled-components';
import Footer from '../components/Footer';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/admin/profile', {
          withCredentials: true, // Include credentials (cookies) in the request
        });
        setProfile(response.data.admin);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdminProfile();
  }, []);

  return (
    <Wrapper>
      <div className="profile-content">
      
        <div className="profile-container">
       
          <h1>Admin Profile</h1>
         
      
          {profile ? (
            <div className="profile-details">
              <p>Name: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <AdminLogout />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .profile-content {
    flex-grow: 1;
    background-color: skyblue;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-container {
    background-color: blue;
    padding: 20px;
    text-align: center;
  }

  .dashboard-logout {
    text-align: right;
    margin-bottom: 20px;
  }

  .profile-details {
    margin-top: 20px;
  }
`;

export default AdminProfile;
