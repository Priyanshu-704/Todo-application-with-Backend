import React from "react";
import { GiWhiteBook } from "react-icons/gi";
import { toast } from "react-toastify";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store";
import axios from "axios";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await axios.post("http://localhost:5000/api/v1/logout", {
          refreshToken,
        });
        sessionStorage.clear(); // clears all session keys
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(authActions.logout());
        toast.success("You have logged out successfully");
      }
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <b>
            <GiWhiteBook />
            Todo App
          </b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active" aria-current="page" to="/about">
                About Us
              </Link>
            </li>
           
            {!isLoggedIn && (
              <>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link nav-btn"
                    aria-current="page"
                    to="/signup"
                  >
                    Sign up
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link nav-btn"
                    aria-current="page"
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
               <li className="nav-item mx-2">
              <Link className="nav-link active" aria-current="page" to="/todo">
                Add Task
              </Link>
            </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link nav-btn"
                    aria-current="page"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link " aria-current="page" to="#">
                    <img
                      src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                      alt="user"
                      className="img-fluid user-avatar"
                    />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
