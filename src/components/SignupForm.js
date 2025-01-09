import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/SignupForm.module.css";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (
      !email ||
      !firstName ||
      !lastName ||
      !gender ||
      !dateOfBirth ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // API call to the User Service
      const response = await fetch(`${process.env.REACT_APP_USER_BACKEND_URL}/users`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
          gender,
          date_of_birth: dateOfBirth,
          phone_number: phoneNumber,
          password,
        }),
      });
      console.log("Backend URL:", process.env.REACT_APP_USER_BACKEND_URL);

      const result = await response.json();
      

      if (response.ok) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login page after 3 seconds
      } else {
        setError(result.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.signupBox}>
      <h2>Sign Up</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={styles.inputField}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={styles.inputField}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className={styles.inputField}
          required
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className={styles.inputField}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={styles.inputField}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.inputField}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
      <div className={styles.linkContainer}>
        Already have an account?{" "}
        <Link to="/login" className={styles.link}>
          Login
        </Link>
        <br></br>
        <Link to="/" className={styles.link}>
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;