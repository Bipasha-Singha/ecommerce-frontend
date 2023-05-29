import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product_styles.css';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import icons from react-icons
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeroSection from "./HeroSection";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/v1/products');
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToWishlist = async (productId) => {
    try {
      const userId = localStorage.getItem('userId'); // Replace with the actual user ID
      if (!userId) {
        navigate('/register');
        return;
      }
      const product = products.find((product) => product._id === productId);

      if (!product) {
        console.log('Product not found');
        return;
      }
      const response = await axios.post(`http://localhost:5000/api/v1/wishlist/${userId}`, {
        user: userId,
        product: productId,
        price: product.price,
      });
      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return { ...product, isInWishlist: true };
        }
        return product;
      });

      setProducts(updatedProducts);
      console.log(response.data); // Handle the response data as needed
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error); 
        // Log the error message from the backend
      } else {
        console.log(error.message); // Log other types of errors
      }
    }
  };

  return (
    <div>
    <HeroSection/>
    
    <div className="product-container">
      
      <div className="product-page">
        <div className="main-content">
          <h1>Products</h1>
          <div className="products">
            {isLoading ? (
              <div className="loading">
                <Spin />
              </div>
            ) : (
              <>
                {products.map((product, index) => {
                  const quantityInCart = products.filter(
                    (p) => p._id === product._id && p.quantity < product.quantity
                  ).length;
                  return (
                    <div className="product-card" key={index}>
                      <img
                        className="product-img"
                        src={`http://localhost:5000/api/v1/products/${product._id}/image`}
                        alt={product.name}
                      />
                        <h6 className="product-name">{product.name}</h6>
                      <p className="product-price">Price: &#x20b9;{product.price}</p>
                      {product.quantity - quantityInCart > 1 ? (
                        <p className="product-stock">In stock</p>
                      ) : (
                        <p className="product-stock">Out of stock</p>
                      )}
                      <Link to={`/products/${product._id}`}>
                        <button className="product-button"> Go to More Details</button>
                      </Link>
                      <button
                        className={`product-button ${product.isInWishlist ? 'wishlist-added' : ''}`}
                        onClick={() => addToWishlist(product._id)}
                      >
                        {product.isInWishlist ? (
                          <FaHeart className="wishlist-icon" />
                        ) : (
                          <FaRegHeart className="wishlist-icon" />
                        )}
                        Add to wishlist
                      </button>
      
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Product;
