import React, { useState} from 'react';
import axios from 'axios';
import AdminLogout from './AdminLogout';
const CreateCategory = () =>  {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/v1/create-category', { name });
      
      if (response.status === 201) {
        setMessage('New category created');
        setName('');
      } else if (response.status === 200) {
        setMessage('Category already exists');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error creating category');
    }
  };

  return (
    <div>
      <AdminLogout/>
      <h1>Create Category</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Create</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
export default CreateCategory;