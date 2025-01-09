import React from "react";
import styles from "../styles/Dashboard.module.css";

const Dashboard = ({ user }) => {
  return (
    <div className={styles.dashboardContainer}>
      <h1>Welcome, {user?.username || "User"}!</h1>
      <p>This is your dashboard.</p>
    </div>
  );
};

export default Dashboard;