import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const Login = () => {
    navigate("/login");
  };
  const Signup = () => {
    navigate("/signup");
  };
  return (
    <div className="home_page">
      <h1>Welcome My Friend</h1>
      <button onClick={Login}>Login</button>
      <button onClick={Signup}>Signup</button>
    </div>
  );
}
