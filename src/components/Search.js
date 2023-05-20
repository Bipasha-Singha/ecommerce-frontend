import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

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
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <img src={`http://localhost:5000/api/v1/products/${product._id}/image`} alt={product.name} />
              <p>{product.name}</p>
              <p>Price: &#x20b9;{product.price}</p>
              {product.quantity - quantityInCart > 1 ? (
                <p>In stock</p>
              ) : (
                <p>Out of stock</p>
              )}
              <Link to={`/products/${product._id}`}>
                <button className="product-button">More Details</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Search;
