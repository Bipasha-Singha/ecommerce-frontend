import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // get all products
  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:5000/api/v1/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="product-container">
      <div className='product-page'>
        <div className="main-content">
          <h1>Products</h1>
          <div className='products'>
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
                    <div className="product" key={index}>
                      <img
                        className="img"
                        src={`http://localhost:5000/api/v1/products/${product._id}/image`}
                        alt={product.name}
                      />
                      <Link to={`/product/${product._id}`}>
                        <h6>{product.name}</h6>
                      </Link>
                      {/*<p>{product.description}</p>*/}
                      <p>Price: &#x20b9;{product.price}</p>
                      {product.quantity - quantityInCart > 1 ? (
                        <p>In stock</p>
                      ) :
                      (
                        <p>Out of stock</p>
                      )}
                      <Link to={`/products/${product._id}`}>
                      <button className="product-button">More Details</button>
                      </Link>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Product;
