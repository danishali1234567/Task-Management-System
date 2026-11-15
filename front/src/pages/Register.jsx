
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="brand-icon">T</span> TaskFlow
        </div>

        <div className="auth-message">
          <span className="eyebrow">START SOMETHING GREAT</span>
          <h1>Turn your plans into achievements.</h1>
          <p>
            One place to organize tasks, projects
            and your daily productivity.
          </p>
        </div>
      </div>

      <div className="auth-right">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <p>Start organizing your work today.</p>

          <label>
            Full Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              minLength="6"
              required
            />
          </label>

          {error && <div className="error-message">{error}</div>}

          <button className="primary-btn full-btn" disabled={busy}>
            {busy ? "Creating account..." : "Create Account →"}
          </button>

          <div className="auth-switch">
            Already have an account?
            <Link to="/login"> Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
