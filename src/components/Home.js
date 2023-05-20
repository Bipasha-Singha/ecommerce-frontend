import React from 'react';
import styled from 'styled-components';
import HeroSection from './HeroSection';
import Services from './Services';
import Trusted from './Trusted';
import Footer from './Footer';
import { useProductContext } from "../context/productContext";
const HomeWrapper = styled.div`
  background-color:"#6495ED";
`;

const Home = () => {
  const { myName }= useProductContext();

  const data = {
    name: "Singha store",
  };

  return (
    <HomeWrapper>
      {myName}
      <HeroSection name={data.name} />
      <Services />
      <Trusted />
      <Footer/>
    </HomeWrapper>
  );
};

export default Home;
