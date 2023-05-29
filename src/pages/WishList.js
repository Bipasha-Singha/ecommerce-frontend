import React, { useEffect, useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wishlist = () => {
  const userId = localStorage.getItem('userId'); // Replace with the actual user ID
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlistItems = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/wishlist/${userId}`);
      const wishlistItems = await response.json();
      setWishlistItems(wishlistItems);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    fetchWishlistItems();
  }, [fetchWishlistItems]);

  const removeItemFromWishlist = async (wishlistItemId) => {
    try {
      await fetch(`http://localhost:5000/api/v1/wishlist/${wishlistItemId}`, {
        method: 'DELETE',
      });
      fetchWishlistItems();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <div className="wishlist">
        {wishlistItems.map((item) => (
          <div className="wishlist-item" key={item._id}>
            <h3>{item.product.name}</h3>
            <p>Price: {item.price}</p>
            <img
              className="product-img"
              src={`http://localhost:5000/api/v1/products/${item.product._id}/image`}
              alt={item.product.name}
            />
            <Link to={`/products/${item.product._id}`}>
              <button className="product-button">More Details</button>
            </Link>
            <button className="remove-button" onClick={() => removeItemFromWishlist(item._id)}>
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .wishlist {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .wishlist-item {
    width: 200px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 5px;
    text-align: center;
  }

  .product-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .product-button, .remove-button {
    display: block;
    width: 100%;
    padding: 8px 12px;
    background-color: #2ecc71;
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
  }

  .product-button:hover, .remove-button:hover {
    background-color: #27ae60;
  }
`;

export default Wishlist;
