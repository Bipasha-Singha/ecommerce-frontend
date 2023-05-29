import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { Button } from "../styles/button";

const HeroSection = () => {
  return (
    <Wrapper>
     <div className="hero">
        <div className="row container d-flex">
          <div className="col">
            <span className="subtitle">Limited Time Only For Summer</span>
           <h1>fash<span className="i">i</span>on</h1>
            <p>LOOK YOUR BEST ON YOUR BEST DAY</p>
            <NavLink to="/product">
              <Button>Explore Now!</Button>
              </NavLink>
          </div>
        </div>
      </div>

    </Wrapper>
  );
};

const Wrapper = styled.section`
  .hero {
  position: relative;
  height: 100vh;
  margin: 0 3rem;
  overflow: hidden;
  background-image:url("/back_image.jpg");
  background-size: cover;
  background-position: center;
  }

  .hero .row {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero .row .col {
    margin-right: 5rem;
    position: relative;
  }

  .hero .row .col .subtitle {
    display: block;
    font-size: 1.8rem;
    margin-bottom: 4rem;
  }

  .hero .row .col h1 {
    font-family: 'Aclonica', sans-serif;
    font-size: 13rem;
    line-height: 1;
  }

  .hero .row .col h1 .i {
    color: var(--primary-color);
    position: relative;
  }

  .hero .row .col h1 .i:before {
    content: 'ı';
    position: absolute;
    color: var(--black-color);
  }

  .hero .row .col p {
    font-size: 2rem;
    margin-bottom: 6rem;
  }

  .hero .row .col .btn {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    padding: 1.5rem 6rem;
    border-radius: 1rem;
    color: var(--white-color);
    font-weight: 500;
    font-size: 1.8rem;
    background: var(--btn-gradient);
    border: 2px solid var(--btn-border-color);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .hero .row img {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  @media (max-width: 1600px) {
    .hero .row img {
      width: 40rem;
    }
  }

  @media (max-width: 1200px) {
    .hero .row .col h1 {
      font-size: 8rem;
    }
  }

  @media (max-width: 768px) {
    .hero .row .col {
      position: absolute;
      top: 10%;
      margin-right: 0;
    }

    .hero .row .col .subtitle {
      font-size: 1.6rem;
    }

    .hero .row .col h1 {
      font-size: 7rem;
    }

    .hero .row .col p {
      font-size: 1.6rem;
    }

    .hero .row .col .btn {
      padding: 1.2rem 4rem;
    }

    .hero .row img {
      width: 40rem;
    }
  }

  @media (max-width: 567px) {
    .hero {
      height: 100vh;
      margin: 0 1rem;
    }

    .hero .row .col .subtitle {
      font-size: 1.6rem;
      margin-bottom: 1.5rem;
    }

    .hero .row .col h1 {
      font-size: 7rem;
    }

    .hero .row .col p {
      font-size: 1.6rem;
      margin-bottom: 2rem;
    }

    .hero .row .col .btn {
      padding: 1.2rem 4rem;
    }
  }
`;



export default HeroSection;
