import React from "react";
import "./Home.css";
import {useNavigate} from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleTask = () =>{
    navigate("/todo")
  }
  return (
    <div className="home-container d-flex justify-content-center align-items-center">
      <div className="container  d-flex flex-column justify-content-center align-items-center home-content">
        <h1 className="text-center home-title">
          Organize your <br /> work and life, finally!
        </h1>
        <p className="home-subtitle">
          Become focused, organized and calm with <br /> todo app. The world's
          #1 task manage app
        </p>
        <button className="home-btn home-primary-btn" onClick={handleTask}>Manage Tasks</button>
      </div>
    </div>
  );
};

export default Home;
