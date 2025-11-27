import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2025/api/login", {
        username,
        password,
      });

      console.log("Login response:", response.data);

      // 🔑 Save token (if backend returns token)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        // If no token, save dummy token so ProtectedRoute works
        localStorage.setItem("token", "loggedin");
      }

      // Optionally save user info also
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/"); // Go to Home
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMessage(error.response?.data || "Login failed.");
    }
  };

  return (
    <div className="auth-container">
      <h2>User Login</h2>
      {message && <p className="auth-message">{message}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="auth-link">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
