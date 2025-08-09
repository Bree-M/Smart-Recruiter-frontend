import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/glass-ui.css";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email: form.email,
        password: form.password,
      });
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate(response.data.role === "recruiter" ? "/recruiter" : "/candidate");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="glass-page center-content">
      <div className="glass-card auth-card">
        <div className="glass-blur" />
        <h2 className="glass-title">Welcome Back 👋</h2>
        <p className="glass-subtitle">Log in to access your dashboard</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="glass-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="glass-button primary">
            Login
          </button>
        </form>
        <div className="glass-footer">
          <Link to="/forgot-password" className="glass-link">
            Forgot Password?
          </Link>
          <p>
            Don’t have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;