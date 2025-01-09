import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/");
        const response = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("User fetch error:", err);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  return <Dashboard user={user} />;
};

export default DashboardPage;