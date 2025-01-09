import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/LoginForm.module.css"; // Import modular CSS

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // Updated API call for login
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Match backend's expected payload
      });

      const result = await response.json();

      if (response.ok) {
        // Save token in localStorage (or session storage)
        localStorage.setItem("token", result.token);

        // Call parent function to store user data
        onLogin(result);

        // Navigate to the dashboard
        navigate(`/dashboard/${result.userId}`);
      } else {
        setError(result.error || "Incorrect email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.loginBox}>
      <h1>Login</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={styles.inputField}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.inputField}
          required
        />
        <input type="submit" value="Login" className={styles.submitButton} />
      </form>
      <div className={styles.linkContainer}>
        <Link to="/register" className={styles.link}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;