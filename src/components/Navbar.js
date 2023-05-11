import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink,  useNavigate } from 'react-router-dom';
import cottonlogo from '../image/cottonlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search?q=${searchTerm}`);
    } else {
      navigate('/');
    }
    setSearchTerm('');
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img src={cottonlogo} alt='cottonlogo' className="logo"/>
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/about">About <span className="sr-only"></span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">Registration</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/categories">Categories</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
      </li>
    </ul>
    <ul className="navbar-nav">
        <li className="nav-item">
            <NavLink className="nav-link" to="/cart">
               <FontAwesomeIcon icon={faShoppingCart} />
            </NavLink>
         </li>
         <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
          <div className="d-flex">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={{height: "38px", width: "70px"}}>
            Search
          </button>

          </div>
        </form>
    </ul>
    
        </div>
      </nav>
    </>
  )
}

export default Navbar;
