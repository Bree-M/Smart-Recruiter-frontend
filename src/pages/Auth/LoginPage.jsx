import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/glass-ui.css";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = form;

    if (email === "req@gmail.com" && password === "12345") {
      localStorage.setItem("token", "fake-jwt-token");
      localStorage.setItem("role", "recruiter");
      navigate("/recruiter");
    } else if (email === "can@gmail.com" && password === "12345") {
      localStorage.setItem("token", "fake-jwt-token");
      localStorage.setItem("role", "candidate");
      navigate("/candidate");
    } else {
      alert("Invalid credentials. Try:\n\nRecruiter: req@gmail.com\nCandidate: can@gmail.com\nPassword: 12345");
    }
  };

  return (
    <div className="glass-page center-content">
      <div className="glass-card auth-card">
        <div className="glass-blur" />

        <h2 className="glass-title">Welcome Back 👋</h2>
        <p className="glass-subtitle">Log in to access your dashboard</p>

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
