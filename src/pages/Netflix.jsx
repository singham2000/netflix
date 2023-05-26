import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Home from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";

const Netflix = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <Container>
      <Navbar isScrolled={isScrolled}></Navbar>
      <div className="hero">
        <img src={Home} alt="background" className="background_image" />
      </div>
    </Container>
  );
};

export default Netflix;
const Container = styled.div`

`;
