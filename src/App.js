import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Signup';
import { ToastContainer } from 'react-toastify';
import Product from './components/product';
import Category from "./components/Category";
import ProductDetails from './components/ProductDetails';
import CartPage from "./pages/CartPage";
import Logout from "./pages/logout";
import Search from "./components/Search";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import AdminLogin from "./pages/Adminlogin";
import AdminLogout from "./pages/AdminLogout";
import CreateProduct from "./pages/CreateProduct";
//import SearchPage from "./pages/SearchPage";
const Message = ({ message }) => {
  return <h1>{message}</h1>;
};
const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/message")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Check if it has the 'message' property
        setMessage(data.message);
      })
      .catch((error) => console.log(error));
  }, []);
 
  return (
    <>
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/message" element={<Message message={message} />} />
        <Route exact path="/categories" element={<Category />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/products/:Id" element={<ProductDetails/>} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/pages/UserDashboard" element={<UserDashboard />} />
        <Route exact path="/pages/UserProfile" element={<UserProfile />} />
        <Route exact path="/pages/AdminDashboard" element={<AdminDashboard />} />
        <Route exact path="/pages/AdminProfile" element={<AdminProfile />} />
        <Route exact path="pages/AdminLogin" element={<AdminLogin />} />
        <Route exact path="pages/AdminLogout" element={<AdminLogout />} />
        <Route exact path="pages/CreateProduct" element={<CreateProduct />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
