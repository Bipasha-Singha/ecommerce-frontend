import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';
import { Select, Spin } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

const Category = () => {
  const [products] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategorySelected, setIsCategorySelected] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let url = 'http://localhost:5000/api/v1/products';
    if (selectedCategories.length > 0) {
      url = `http://localhost:5000/api/v1/categories/${selectedCategories.join()}/products`;
    }
    axios
      .get(url)
      .then((response) => {
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedCategories]);

  const handleCategoryChange = (value) => {
    setSelectedCategories(value);
    setIsCategorySelected(true);
  };

  const hasFilteredProducts = filteredProducts.length > 0;

  return (
    <div className="product-container">
      <div className='product-page'>
        <div className="main-content">
          <h1>Products</h1>
          <div className='container'>
            <div className="filters" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="category-filter" style={{ flex: 1, marginRight: '20px', whiteSpace: "nowrap" }}>
                <h6>Filter By Category</h6>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className='products'>
            {isLoading ? (
              <div className="loading">
                <Spin />
              </div>
            ) : (
              <>
                {!hasFilteredProducts && isCategorySelected && (
                  <p>Please select a category from the dropdown list</p>
                )}
                {filteredProducts.map((product, index) => {
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
                      <p>Price: &#x20b9;{product.price}</p>
                      {product.quantity - quantityInCart > 0 ? (
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

export default Category;
