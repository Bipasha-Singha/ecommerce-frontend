import React, { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogout from './AdminLogout';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    shipping: '',
    image: null,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('quantity', formData.quantity);
    if (formData.shipping) {
        data.append('shipping', formData.shipping);
      }
    data.append('image', formData.image);

    try {
        const response = await axios.post(
            `http://localhost:5000/api/v1/create-products`,
            data,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

      // Handle the response and perform necessary actions
      console.log(response.data);
      window.alert("product created successfully");
    } catch (error) {
      // Handle the error
      toast.error(error);
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  return (
    <Wrapper>
    <Container>
      <h1>Create Product</h1>
      <OuterBorder>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input type="text" name="name" id="name" onChange={handleInputChange} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description:</Label><br/>
          <Textarea name="description" id="description" onChange={handleInputChange}></Textarea>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Price:</Label>
          <Input type="number" name="price" id="price" onChange={handleInputChange} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Category:</Label>
          <Input type="text" name="category" id="category" onChange={handleInputChange} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="quantity">Quantity:</Label>
          <Input type="number" name="quantity" id="quantity" onChange={handleInputChange} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="shipping">Shipping:</Label>
          <Input type="text" name="shipping" id="shipping" onChange={handleInputChange} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="image">Image:</Label>
          <Input type="file" name="image" id="image" onChange={handleInputChange} />
        </FormGroup>

        <Button type="submit">Create Product</Button>
      </Form>
      </OuterBorder>
    </Container>
    <AdminLogout/>
    <Footer/>
    </Wrapper>
  );
};
const Wrapper = styled.section`
min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;`;
const Container = styled.div`
  background-color: orange;
  padding: 20px;
  color: white;
`;

const OuterBorder = styled.div`
  border: 2px solid black;
  padding: 10px;
  background-color: lightorange;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 5px;
  width: 120px; /* Adjust the width as needed */
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  width: 100%; /* Set the width to 100% */
  max-width: 400px; /* Set a maximum width if desired */
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: none;
  width: 100%; /* Set the width to 100% */
  max-width: 400px; /* Set a maximum width if desired */
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%; /* Set the width to 100% */
  max-width: 200px; /* Optional: Set a maximum width if desired */
`;


export default CreateProduct;
