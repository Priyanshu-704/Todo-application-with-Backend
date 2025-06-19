import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
const Signup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/v1/register", inputs)
      .then((response) => {
        if (response.data.message === "user already exist") {
          alert(response.data.message);
        } else {
          alert(response.data.message);

          setInputs({
            email: "",
            username: "",
            password: "",
          });
          navigate("/signin");
        }
      });
  };

  return (
    <div className="signup-container">
      <div className="container signup-wrapper">
        <div className="row signup-row">
          <div className="col-lg-8 d-flex justify-content-center align-items-center column signup-form-column">
            <div className="d-flex flex-column w-100 p-2 signup-form">
              <input
                type="email "
                placeholder="Enter your email"
                className="p-2 my-3 signup-input"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
              <input
                type="text "
                placeholder="Enter your username"
                className="p-2 my-3 signup-input"
                name="username"
                value={inputs.username}
                onChange={handleChange}
              />
              <input
                type="password "
                placeholder="Enter your password"
                className="p-2 my-3 signup-input"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
              <button className=" p-2 signup-button" onClick={handleSubmit}>
                sign up
              </button>
              <p className="signin-footer-text">
                Already have an account?{" "}
                <a href="/signin" className="signup-link">
                  Sign up
                </a>
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-left d-flex justify-content-center align-items-center signup-header-column">
            <HeadingComp first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
