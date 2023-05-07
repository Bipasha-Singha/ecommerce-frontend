import React from "react";
import styled from 'styled-components';
//import "./Footer.css";

const Footer =()=>{
  return (
    <Wrapper>
    <footer className="footer-container">
      <div className="footer-about">
        <h3>Singha Technical</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
      </div>
      <div className="footer-links">
        <h3>Links</h3>
        <ul>
          <li><a href="#/">Home</a></li>
          <li><a href="#/">About</a></li>
          <li><a href="#/">Contact</a></li>
        </ul>
      </div>
      <div className="footer-social">
        <h3>Social</h3>
        <ul>
          <li><a href="#/">Facebook</a></li>
          <li><a href="#/">Twitter</a></li>
          <li><a href="#/">Instagram</a></li>
        </ul>
      </div>
    </footer>
    </Wrapper>
  );
}

const Wrapper = styled.section`
.footer-container {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.footer-about,
.footer-links,
.footer-social {
  flex: 1;
  margin-right: 20px;
}

.footer-about h3,
.footer-links h3,
.footer-social h3 {
  font-size: 20px;
}

.footer-about p {
  font-size: 14px;
}

.footer-links ul,
.footer-social ul {
  list-style: none;
  padding-left: 0;
}

.footer-links li,
.footer-social li {
  margin-bottom: 10px;
}

.footer-links a,
.footer-social a {
  color: #fff;
  text-decoration: none;
}

.footer-links a:hover,
.footer-social a:hover {
  text-decoration: underline;
}

`;

export default Footer;