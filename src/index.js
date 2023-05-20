import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { AppProvider } from './context/productContext';
import {CartProvider} from './context/CartContext';
import {GoogleOAuthProvider} from '@react-oauth/google';
//import { AuthProvider } from './context/auth';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <GoogleOAuthProvider clientId='173734562087-iutk13vrig43kgi87itiljnmg3irq21k.apps.googleusercontent.com'>
      <AppProvider>
        <CartProvider>
          <App />
          </CartProvider>
      </AppProvider>
      </GoogleOAuthProvider>
        </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
