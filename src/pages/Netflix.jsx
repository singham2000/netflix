import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Home from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";

const Netflix = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  useEffect(() => {
    dispatch(getGenres());
  });
  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  });

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
        <div className="container">
          <img src={MovieLogo} alt="Movie title" />
          <div className="button flex">
            <button
              onClick={() => {
                navigate("/player");
              }}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>

            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Netflix;
const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background_image {
      filter: brightness(60%);
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
  .container {
    position: absolute;
    bottom: 15rem;
    margin-left: 5rem;
    .logo {
      img {
        width: 100%;
        height: 100%;
        margin-left: 5rem;
      }
    }
  }
  .button {
    margin: 5em;
    gap: 2rem;
    button {
      font-size: 1.4rem;
      gap: 1rem;
      border-radius: 0.2rem;
      padding: 0.5rem 2rem 0.5rem 2.4rem;
      border: none;
      cursor: pointer;
      transition: 0.2s ease-in-out;
      &:hover {
        opacity: 0.8;
      }
      &:nth-of-type(2) {
        background-color: rgba(109, 109, 110, 0.7);
        color: white;
        svg {
          font-size: 1.8rem;
        }
      }
    }
  }
`;
//
