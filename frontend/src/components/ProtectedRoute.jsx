import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sessionId = sessionStorage.getItem("id");

 if (!isLoggedIn && !sessionId) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
