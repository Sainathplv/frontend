import React from "react";
import SignupForm from "../components/SignupForm";
import styles from "../styles/SignupForm.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.signupContainer}>
      <SignupForm />
    </div>
  );
};

export default RegisterPage;