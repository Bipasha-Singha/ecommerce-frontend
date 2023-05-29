import React from 'react';
//import styled from 'styled-components';
import HeroSection from './HeroSection';
import Services from './Services';
import Trusted from './Trusted';
import Footer from './Footer';
import { useProductContext } from "../context/productContext";
/*const HomeWrapper = styled.div`
  background-color: #e8f9fd;
`;*/

const Home = () => {
  const { myName }= useProductContext();

  const data = {
    name: "Shopping App",
  };

  return (
      <div>
      {myName}
      <HeroSection name={data.name} />
      <Services />
      <Trusted />
      <Footer/>
      </div>
  );
};

export default Home;
