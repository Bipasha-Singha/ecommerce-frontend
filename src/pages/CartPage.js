import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  //const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios
        .get(`http://localhost:5000/api/v1/cart/${userId}`)
        .then(response => {
          setCartItems(response.data.data);
          const priceArray = response.data.data.map(item => item.price);
          const totalPrice = priceArray.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          setTotalPrice(totalPrice);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  const refreshCartItems = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios
        .get(`http://localhost:5000/api/v1/cart/${userId}`)
        .then(response => {
          setCartItems(response.data.data);
          const priceArray = response.data.data.map(item => item.price);
          const totalPrice = priceArray.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          setTotalPrice(totalPrice);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleRemoveItem = cartItemId => {
    const userId = localStorage.getItem('userId');
    axios
      .delete(`http://localhost:5000/api/v1/cart/${userId}/${cartItemId}`)
      .then(response => {
        console.log(response.data.msg);
        // Refresh the cart items after successful removal
        refreshCartItems();
      })
      .catch(error => {
        console.log(error);
      });
  };
  const verifyPayment = (paymentId, orderId, signature) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ razorpay_payment_id: paymentId, razorpay_order_id: orderId, razorpay_signature: signature }),
    };
  
    fetch(`http://localhost:5000/api/v1/verify`, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Process the response and handle the payment verification status
        const { message } = data;
        if (message === 'Payment verified successfully') {
          // Payment is verified, you can perform further actions here
          console.log('Payment verified successfully');
        } else {
          // Payment verification failed, handle accordingly
          console.log('Payment verification failed');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  const pay = () => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      .split('=')[1];
      
    const { name, email } = token;
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalPrice, name: name, email: email }),
    };
  
    fetch(`http://localhost:5000/api/v1/orders`, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Process the response and initiate payment using the received order data
        //const { order } = data;
        const { razorpay_order_id, amount, currency, description, prefill } = data.data; 
        const razorpayOptions = {
          key: 'rzp_test_BDjrqrw1wMqZzx', // Replace with your Razorpay API key
          amount: amount,
          currency: currency,
          name: name,
          description: description,
          prefill: {
            name: name,
            email: email,
            ...prefill
          },
          order_id: razorpay_order_id,
          handler: function (response) {
            // Handle successful payment response
            console.log(response);
            // Verify the payment on the backend
            verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
          },
        };
  
        const razorpay = new window.Razorpay(razorpayOptions);
        razorpay.open();
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  return (
    <Wrapper>
    <div className='container'>
      <div className='row'>
        <h1>Your Cart</h1>
        <ul>
        {cartItems.map(item => (
            <li key={item._id}>
              <div className="cart-item">
                {item.product.image && (
                  <img
                    src={`http://localhost:5000/api/v1/products/${item.product._id}/image`}
                    alt={item.product.name}
                  />
                )}
                <div className="item-details">
                  <h4>{item.product.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                </div>
              </div>
              <button onClick={() => handleRemoveItem(item._id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <h4>Total Price: {totalPrice}</h4>
        <button onClick={pay}>Proceed to Buy</button>
      </div>
    </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f1f8ff; /* Light blue background */
  }

  .row {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background-color: #e0f0ff; /* Light sky blue background */
    padding: 10px;
    border-radius: 5px;
  }

  .cart-item {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  img {
    width: 50px;
    height: auto;
    object-fit: cover;
    margin-right: 10px;
  }

  .item-details {
    flex: 1;
  }

  button {
    padding: 5px 10px;
    background-color: #f44336;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  h4 {
    margin-bottom: 5px;
  }

  p {
    margin: 5px 0;
  }

  .total-price {
    font-weight: bold;
  }

  button.pay-btn {
    background-color: #4caf50;
    margin-top: 20px;
  }
`;

export default CartPage;
