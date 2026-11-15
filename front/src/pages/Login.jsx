
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          <span className="eyebrow">YOUR WORKSPACE, SIMPLIFIED</span>
          <h1>Make every day a productive day.</h1>
          <p>
            Organize your work, manage your projects
            and achieve your goals.
          </p>

          <div className="auth-decoration">
            <div className="decoration-card">✓ Complete your goals</div>
            <div className="decoration-card">◷ Stay on schedule</div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Welcome back!</h2>
          <p>Login to continue to TaskFlow.</p>

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
              placeholder="Enter password"
              required
            />
          </label>

          {error && <div className="error-message">{error}</div>}

          <button className="primary-btn full-btn" disabled={busy}>
            {busy ? "Please wait..." : "Sign In →"}
          </button>

          <div className="auth-switch">
            Don't have an account?
            <Link to="/register"> Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
