import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PartnerRegister() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      console.log("Submitting partner register:", {
        name,
        email,
        password,
      });

      const response = await axios.post(
        "http://localhost:5000/api/auth/food-partner/register",
        { name, email, password },
        { withCredentials: true }
      );

      console.log("Partner registration successful:", response.data);
      alert("Partner registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Partner register error:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">FoodView Partner</div>
          <div className="auth-title">Partner account</div>
          <div className="auth-desc">
            Register your restaurant or cloud kitchen to start receiving orders.
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Business name</label>
            <input name="name" className="input" placeholder="My Restaurant" />
          </div>

          <div className="form-row">
            <label> email</label>
            <input
              name="email"
              className="input"
              placeholder="owner@example.com"
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
            <div className="muted-link">Already registered?</div>
            <button type="submit" className="btn">
              Register
            </button>
          </div>
        </form>

        <div className="small-note">
          We'll review your application and get back shortly.
          <div style={{ marginTop: 8 }}>
            <Link to="/user/register" className="muted-link">
              Register as a user
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
