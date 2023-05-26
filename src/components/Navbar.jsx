import React from "react";
import Logo from "../assets/logo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaSearch, FaPowerOff } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = React.useState(false);
  const [inputHover, setInputHover] = React.useState(false);

  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Movies",
      link: "/movies",
    },
    {
      name: "TV Shows",
      link: "/tv",
    },
    {
      name: "My List",
      link: "/mylist",
    },
  ];
  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="flex left a-center">
          <div className="a-center j-center brand flex">
            <div className="brand flex a-center j-center">
              <img src={Logo} alt="Netflix" />
            </div>
            <ul className="links flex">
              {links.map((link) => (
                <li key={link.name}>
                  <Link to={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right flex a-center">
          <div className={`${showSearch ? "show_search" : ""} search`}>
            <button
              onFocus={() => {
                setShowSearch(true);
              }}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              name="Search"
              id="Search"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
            <button
              onClick={() => {
                signOut(firebaseAuth);
              }}
            >
              <FaPowerOff />
            </button>
          </div>
        </div>
      </nav>
    </Container>
  );
}
const Container = styled.div`
  .scrolled {
    background: black;
  }
  nav {
    position: fixed;
    top: 0;
    height: 6.8rem;
    width: 100vw;
    justify-content: space-between;
    padding: 0 4rem;
    align-items: center;
    .left {
      gap: 2rem;
      .brand {
        img {
            height: 4rem;
            width: 9.25rem;
        }
      }
    }
  }
  .links {
    list-style: none;
    gap: 2rem;

    li {
      a {
        color: white;
        text-decoration: none;
      }
    }
  }
  .right {
    gap: 1rem;
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
    .search {
      display: flex;
      gap: 0.4rem;
      align-items: center;
      padding: 0.2rem 0.2rem 0.2rem 0.5rem;
      .button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
      }
    }
    input {
      width: 0;
      opacity: 0;
      visibility: hidden;
      transition: 0.3s ease-in-out;
      background-color: transparent;
      border: none;
      color: white;
      &:focus {
        outline: none;
      }
    }
    .show_search {
      border: 1px solid white;
      background-color: rgba(0,0,0,0.5);
      input{
        width:100%
        opacity:1;
        visibility:visible;
        padding: 0.3rem;
      }
    }
  }
`;
