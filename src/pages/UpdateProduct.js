import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLogout from './AdminLogout';
const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/products');
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      console.log('Product deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminLogout/>
      <h1>All Products</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product._id}</td>
              <td>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


  );
};

export default AllProducts;
