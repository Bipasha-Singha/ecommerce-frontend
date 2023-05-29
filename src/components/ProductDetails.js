import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Button } from "../styles/button";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductDetails = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Initialize the quantity with 1
  const [message] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (product) {
      setTotalPrice(product.price);
    }
  }, [product]);
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
    const availableQuantity = product.quantity;
    const desiredQuantity = quantity; // Define desiredQuantity based on quantity
    if (availableQuantity < desiredQuantity) {
      return toast.error(`Only ${availableQuantity} item(s) available`);
    }
  
    const updatedQuantity = availableQuantity - desiredQuantity;
   if (updatedQuantity < 1) {
      return toast.error('We donot have suffiecient stock please try next time');
    }
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/register');
      return;
    }
    const totalPrice = quantity * product.price;
    axios.post(`http://localhost:5000/api/v1/cart/${userId}`, {
      user: userId,
      product: Id,
      quantity: quantity,
      price: totalPrice
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      toast.success('Item added to cart');
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
    const selectedQuantity = parseInt(event.target.value);
    setQuantity(selectedQuantity);
    setTotalPrice(selectedQuantity * product.price);
  };

  const quantityOptions = [];
  for (let i = 1; i <= 5; i++) {
    quantityOptions.push(<option key={i} value={i}>{i}</option>);
  }
  return (
    <Wrapper>
      <ImageContainer>
        <h1>{product.name}</h1>
        <ProductImage src={`http://localhost:5000/api/v1/products/${Id}/image`} alt={product.name} />
      </ImageContainer>
      <DetailsContainer>
        <p>{product.description}</p>
        <p>Price: &#x20b9;{product.price}</p>
        <div>
          <label>Quantity:</label>
          <select value={quantity} onChange={handleQuantityChange}>
            {quantityOptions}
          </select>
        </div>
        <p>Total Price: &#x20b9;{totalPrice}</p>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
        {message && <p>{message}</p>}
      </DetailsContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  text-align: center;
  margin-right: 2rem;
`;

const ProductImage = styled.img`
  width: 300px; /* Set the desired width */
  height: auto;
  object-fit: contain;
`;

const DetailsContainer = styled.div`
  text-align: left;
`;

export default ProductDetails;
