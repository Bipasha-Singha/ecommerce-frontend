import React from 'react';
import HeroSection from './HeroSection';
import Services from './Services';
import Trusted from './Trusted';
import Footer from './Footer';
import { useProductContext } from "../context/productContext";
const Home = () => {
  const { myName }= useProductContext();

  const data = {
    name: "Singha store",
  };

  return (
    <>
      {myName}
      <HeroSection name={data.name} />
      <Services />
      <Trusted />
      <Footer/>
    </>
  );
};

export default Home;
