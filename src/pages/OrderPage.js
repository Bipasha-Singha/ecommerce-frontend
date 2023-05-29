import React, { useEffect, useState } from 'react';

const OrderPage = () => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    // Fetch order items
    const fetchOrderItems = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Replace with the actual user ID
        const response = await fetch(`http://localhost:5000/api/v1/orders/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setOrderItems(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderItems();
  }, []);

  return (
    <div>
      <h1>Order Items</h1>
      {orderItems.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orderItems.map(order => (
            <li key={order._id}>
              <h3>Product Name: {order.product}</h3>
              <p>Total Price Paid: Rs{order.amount}</p>
              <p>Expected Delivery Date: {calculateExpectedDeliveryDate(order.createdAt)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Function to calculate the expected delivery date (one week from the created date)
const calculateExpectedDeliveryDate = createdAt => {
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const createdDateObj = new Date(createdAt);
  const expectedDeliveryDateObj = new Date(createdDateObj.getTime() + oneWeekInMilliseconds);
  return expectedDeliveryDateObj.toDateString();
};

export default OrderPage;
