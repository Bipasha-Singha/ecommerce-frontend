import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [searchQuery] = useState(() => new URLSearchParams(location.search).get('q'));
  const [quantityInCart] = useState(0);

  useEffect(() => {
    const searchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/search?q=${searchQuery}`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    searchProducts();
  }, [searchQuery]);

  return (
    <Wrapper>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <div className="product-container">
                <div className='product-card'>
                  <img src={`http://localhost:5000/api/v1/products/${product._id}/image`} alt={product.name} />
                  <div className="product-details">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">Price: &#x20b9;{product.price}</p>
                    {product.quantity - quantityInCart > 1 ? (
                      <p className="product-stock">In stock</p>
                    ) : (
                      <p className="product-stock">Out of stock</p>
                    )}
                    <Link to={`/products/${product._id}`}>
                      <button className="product-button">More Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ul {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
  }

  li {
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .product-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .product-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .product-name {
    font-weight: bold;
  }

  .product-price {
    margin-bottom: 10px;
  }

  .product-stock {
    color: ${props => props.theme.smokePink};
    margin-bottom: 10px;
  }

  .product-button {
    padding: 8px 12px;
    background-color: ${props => props.theme.smokePink};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .product-card {
    background-color: #fef0f3;
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    width: 80%; /* Adjust the width as desired */
  }
  
  .product-button:hover {
    background-color: ${props => props.theme.darkSmokePink};
  }

  img {
    width: 50%;
    height: auto;
  }

  @media (max-width: 768px) {
    ul {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }

  @media (max-width: 480px) {
    ul {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }
`;

export default Search;
