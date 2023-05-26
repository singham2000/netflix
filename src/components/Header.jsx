import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <Container className="flex a-center j-between">
      <div className="logo">
        <img src={Logo} alt="Netflix" />
      </div>
      <button
        className="button-signup"
        onClick={() => {
          navigate(props.login ? "/login" : "/signup");
        }}
      >
        {props.login ? "Login" : "Signup"}
      </button>
    </Container>
  );
}
const Container = styled.div`
  padding: 0;
  height: 5.375rem;
  margin: 10px 50px;
  .logo {
    img {
      height: 4rem;
      width: 9.25rem;
    }
  }
  .button-signup {
    padding: 1rem 3rem;
    margin-top: 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bolder;
    font-size: 1rem;
    color: white;
  }
`;
