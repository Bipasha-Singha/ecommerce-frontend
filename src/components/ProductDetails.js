import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
//const jwtDecode = require('jwt-decode');
//import jwt_decode from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

/*function decodeToken(token) {
  const decodedToken = jwtDecode(token);
  return decodedToken;
}*/

const ProductDetails = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Initialize the quantity with 1
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/products/${Id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [Id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (quantity <= 0) {
      setMessage('Out of stock');
      return;
    }
    const token = localStorage.getItem('token');/*
    const decodedToken = jwtDecode(token);
    const userId = decodedToken._id;*/
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/register'); // Redirect to register page if no userId is present
      return;
    }
    axios.post(`http://localhost:5000/api/v1/cart/${userId}`, {
      user: userId,
      product: Id,
      quantity: quantity
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setMessage('Item added to cart');
      console.log(response.data);
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.log(error);
      }
    });
  };
  
  const handleQuantityChange = event => {
    setQuantity(event.target.value);
  };

  const quantityOptions = [];
  for (let i = 1; i <= 5; i++) {
    quantityOptions.push(<option key={i} value={i}>{i}</option>);
  }

  return (
    <Wrapper>
    <div className="Container-image">
      <h1>{product.name}</h1>
      <img src={`http://localhost:5000/api/v1/products/${Id}/image`} alt={product.name} />
    </div>
    <div className='details'>
      <p>{product.description}</p>
      <p>Price: &#x20b9;{product.price}</p>
      <div>
        <label>Quantity:</label>
        <select value={quantity} onChange={handleQuantityChange}>
          {quantityOptions}
        </select>
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {message && <p>{message}</p>}
    </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`

`;
export default ProductDetails;
