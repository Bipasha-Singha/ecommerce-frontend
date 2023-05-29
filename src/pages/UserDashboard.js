import React from 'react';
import "./Dashboard.css";
import { Link } from 'react-router-dom';
const UserDashboard = () => {
  return (
        <div className="dashboard-col">
          <h1>Welcome customer</h1>
        
        <div className="dashboard-container">
        <div className="dashboard-row">
          <div className="dashboard-col-3 bg-light">
            <ul className="dashboard-list-group">
            <Link to="/pages/UserProfile">
              <button>
                Profile 
              </button>
              </Link>
              <Link to="/pages/OrderPage">
              <button>
                Orders
              </button>
              </Link>
              <Link to="/pages/WishList">
              <button>
                WishList
              </button>
              </Link>
            </ul>
          </div>
          </div>
      </div>
    </div>
  );
};

export default UserDashboard;
