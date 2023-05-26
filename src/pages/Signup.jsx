import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroudImage";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [showpassword, setShowpassword] = useState(false);
  const [formValues, setformValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    console.log(
      `formValues.email ${formValues.email}`,
      `formValues.password ${formValues.password}`
    );

    createUserWithEmailAndPassword(
      firebaseAuth,
      formValues.email,
      formValues.password
    )
      .then((userCredential) => {
        console.log(userCredential);
        // Signed in
        const user = userCredential.user;
        console.log("User Details", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        navigate("/");
      }
    });
  };

  return (
    <Container showpassword={showpassword}>
      <BackgroundImage />
      <div className="content">
        <Header signup />
        <div className="body flex columnn a-center j-center">
          <div className="text flex column a-center j-center">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere, Cancel Anytime</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>

            <div className="form">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                value={formValues.email}
                onChange={(e) => {
                  // console.log(e)
                  setformValues({
                    ...formValues,
                    [e.target.id]: e.target.value,
                  });
                }}
              />
              {showpassword && (
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formValues.pass}
                  onChange={(e) =>
                    setformValues({
                      ...formValues,
                      [e.target.id]: e.target.value,
                    })
                  }
                />
              )}

              {!showpassword && (
                <button
                  onClick={() => setShowpassword(true)}
                  className="button"
                >
                  Get Started
                </button>
              )}
            </div>
            <button className="button-login" onClick={handleSignIn}>
              Login
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 1fr 5fr;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0, 0.5);
    .body {
      gap: 1rem;
      text-align: center;
      font-size: 1rem;
      .text {
        font-size: 1rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showpassword }) =>
          showpassword ? "1fr 1fr" : "2fr 1fr"};

        width: 68%;
        input {
          text-align: center;
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        .button {
          padding: 1.5rem 1rem;
          margin: 0;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          border-radius: 0;
          font-weight: bolder;
          font-size: 1rem;
          color: white;
        }
      }
    }
    .button-login {
      padding: 1.5rem 3rem;
      margin-top: 1rem;
      background-color: #e50914;
      border: none;
      cursor: pointer;
      border-radius: 0;
      font-weight: bolder;
      font-size: 1rem;
      color: white;
      border-radius: 5px;
    }
  }
`;
