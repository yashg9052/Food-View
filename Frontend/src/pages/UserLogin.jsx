import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function UserLogin() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      console.log("Submitting:", { email, password });
      const response = await axios.post(
        "http://localhost:5000/api/auth/user/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login successful:", response.data);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Backend error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">FoodView</div>
          <div className="auth-title">Welcome back</div>
          <div className="auth-desc">
            Sign in to continue ordering your favorite meals.
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input
              name="email"
              className="input"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input
              name="password"
              className="input"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className="actions">
            <div className="muted-link">Forgot password?</div>
            <button type="submit" className="btn">
              Sign in
            </button>
          </div>
        </form>

        <div className="small-note">
          Don't have an account?{" "}
          <Link to="/user/register" className="muted-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
