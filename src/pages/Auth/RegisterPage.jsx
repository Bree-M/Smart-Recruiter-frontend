import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/glass-ui.css"; // Keep this for global glass styles
import "../../styles/RegisterPage.css"; // <--- Add this new import!


const RegisterPage = () => {
  const location = useLocation();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: new URLSearchParams(location.search).get("role") || "",
  });
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const fullNameRef = useRef(null);

  useEffect(() => {
    if (fullNameRef.current) {
      fullNameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (submitAttempted) {
      validateForm();
    }
  }, [form, submitAttempted]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10,}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be at least 10 digits.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/\d/.test(form.password)) {
      newErrors.password = "Password needs uppercase, lowercase, and a number.";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (validateForm()) {
      console.log("Registering user:", form);
    } else {
      console.log("Form has errors, preventing submission.");
    }
  };

  const getRoleTitle = (role) => {
    if (role === "candidate") return "Candidate";
    if (role === "recruiter") return "Recruiter";
    return "User";
  };

  return (
    <div className="glass-page register-page">
      <div className="glass-card register-card">
        <div className="glass-blur" />

        <h2 className="glass-title">
          Create {form.role ? `${getRoleTitle(form.role)} Account` : "Account"}
        </h2>
        {form.role && (
          <p className="glass-role-text">
            Registering as a <span className="highlight-role">{getRoleTitle(form.role)}</span>
          </p>
        )}


        <form onSubmit={handleSubmit} className="glass-form register-form">
          <div className="input-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              aria-invalid={errors.fullName ? "true" : "false"}
              aria-describedby="fullName-error"
              ref={fullNameRef}
            />
            {errors.fullName && <p id="fullName-error" className="error-message">{errors.fullName}</p>}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby="email-error"
            />
            {errors.email && <p id="email-error" className="error-message">{errors.email}</p>}
          </div>

          <div className="input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone (e.g., +1234567890)"
              value={form.phone}
              onChange={handleChange}
              required
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby="phone-error"
            />
            {errors.phone && <p id="phone-error" className="error-message">{errors.phone}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby="password-error"
            />
            {errors.password && <p id="password-error" className="error-message">{errors.password}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              aria-describedby="confirmPassword-error"
            />
            {errors.confirmPassword && <p id="confirmPassword-error" className="error-message">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="glass-button primary register-button">
            Register
          </button>
        </form>

        <p className="glass-footer">
          Already have an account? <Link to="/login" className="glass-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;