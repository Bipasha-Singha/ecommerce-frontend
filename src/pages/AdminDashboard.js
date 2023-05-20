import React from 'react';
import { Link } from 'react-router-dom';
import AdminLogout from './AdminLogout';
import styled from 'styled-components';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  return (
    <Wrapper>
      <div className="dashboard-content">
        <div className="dashboard-col">
          <h1>Welcome Admin</h1>
          <div className="dashboard-logout">
            <AdminLogout />
          </div>
          <div className="dashboard-container">
            <div className="dashboard-row">
              <div className="dashboard-col-3 bg-light">
                <ul className="dashboard-list-group">
                  <Link to="/pages/AdminProfile">
                    <button className="dashboard-button">Profile</button>
                  </Link>
                  <Link to="/pages/CreateProduct">
                    <button className="dashboard-button">Product</button>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .dashboard-content {
    flex-grow: 1;
  }

  .dashboard-col {
    background-color: skyblue;
    color: white;
    padding: 20px;
  }

  .dashboard-logout {
    text-align: right;
    margin-bottom: 20px;
  }

  .dashboard-container {
    background-color: blue;
    padding: 20px;
  }

  .dashboard-row {
    display: flex;
    justify-content: center;
  }

  .dashboard-col-3 {
    flex-basis: 25%;
  }

  .bg-light {
    background-color: skyblue;
  }

  .dashboard-list-group {
    list-style: none;
    padding: 0;
  }

  .dashboard-button {
    width: 100%;
    height: 40px; /* Specify a fixed height for the buttons */
    padding: 10px;
    margin-bottom: 5px;
    background-color: skyblue;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .dashboard-button:hover {
    background-color: deepskyblue;
  }

  /* Responsive Styles */
  @media screen and (max-width: 768px) {
    .dashboard-row {
      flex-wrap: wrap;
    }

    .dashboard-col-3 {
      flex-basis: 50%;
    }
  }

  @media screen and (max-width: 480px) {
    .dashboard-col-3 {
      flex-basis: 100%;
    }
  }
`;

export default AdminDashboard;
