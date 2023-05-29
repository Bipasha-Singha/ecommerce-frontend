import React, { useState } from 'react';
import axios from 'axios';
//import "../register.css";
import { useNavigate }from "react-router-dom";
import styled from "styled-components";
import Footer from './Footer';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const [profile, setProfilePhoto] = useState(null);
  const navigate = useNavigate('');

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('answer', answer);
      formData.append('profile', profile);

      const res = await axios.post('http://localhost:5000/api/v1/register-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res.data);
      alert('Registration Successful!');
      navigate('/login');
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <form onSubmit={handleSubmit}>
        <div className="ProfilePhoto">
  {profile ? (
    <img src={URL.createObjectURL(profile)} alt="Profile" />
  ) : (
    <div className="upload-icon">
      <label htmlFor="profilePhotoInput">
        
        <input
          id="profile"
          type="file"
          accept="image/*"
          placeholder='insert your profile photo'
          onChange={handleProfilePhotoChange}
        />
      </label>
    </div>
  )}
</div>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <label htmlFor="answer">Answer:</label>
            <input type="text" id="answer" placeholder="Write your brother's name" onChange={(e) => setAnswer(e.target.value)} />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.section`
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5e7e8; 
}

form {
  background-color: rgba(255, 255, 255, 0.8); 
  padding: 20px;
  border-radius: 5px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  font-size: 18px;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding:10px 300px; 
  font-size: 18px;
  background-color: #87ceeb; /* Dreamy Blue */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 10%;
  margin-top: 20px;
}

button:hover {
  background-color: #6495ed; /* Light Blue */
}
ProfilePhoto {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;}

  img {
    width: 20%;
    height: 10%;
    object-fit: cover;
  }
`
export default Register;
