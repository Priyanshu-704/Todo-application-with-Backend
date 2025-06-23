import React, { useState } from "react";
import "./Signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import HeadingComp from "./HeadingComp";

const Signin = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/login",
        inputs
      );
      const { accessToken, refreshToken, user } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("id", user._id);
        sessionStorage.setItem("username", user.username);
      dispatch(authActions.login());
      navigate("/todo");
    } catch (error) {
      console.error("Login error", error);
      alert("Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="signin-container">
      <div className="container signin-wrapper">
        <div className="row signin-row">
          <div className="col-lg-4 col-left d-flex justify-content-center align-items-center signin-header-column">
            <HeadingComp first="Sign" second="In" />
          </div>
          <div className="col-lg-8 d-flex justify-content-center align-items-center signin-form-column">
            <div className="d-flex flex-column w-100 p-2 signin-form">
              <input
                type="email "
                placeholder="Enter your email"
                className="p-2 my-3 signin-input"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />

              <input
                type="password "
                placeholder="Enter your password"
                className="p-2 my-3 signin-input"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
              <button className=" p-2 signin-button" onClick={handleSubmit}>
                sign in
              </button>
              <p className="signin-footer-text">
                Don't have an account?{" "}
                <a href="/signup" className="signin-link">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
