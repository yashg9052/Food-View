import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function UserRegister() {
  //   const [form, setForm] = useState({ fullName: '', email: '', password: '' })

  //   function handleChange(e){
  //     const { name, value } = e.target
  //     setForm(prev => ({ ...prev, [name]: value }))
  //   }
  const navigate = useNavigate();
  async function handleSubmit(e) {
  e.preventDefault();

  try {
    
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Submitting:", { fullName, email, password });

    const response = await axios.post(
      "http://localhost:5000/api/auth/user/register",
      { fullName, email, password },
      { withCredentials: true }
    );

    console.log("Registration successful:", response.data);
    alert("Registration successful!");
    navigate("/");

  } catch (error) {
    console.error("Backend error:", error);
    alert(error.response?.data?.message || "Registration failed");
  }
}



  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">FoodView</div>
          <div className="auth-title">Create your account</div>
          <div className="auth-desc">
            Sign up as a food lover to discover and order from nearby
            restaurants.
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Full name</label>
            <input name="fullName" className="input" placeholder="John Doe" />
          </div>

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
            <div className="muted-link">Already have an account?</div>
            <button type="submit" className="btn">
              Create account
            </button>
          </div>
        </form>

        <div className="small-note">
          By signing up you agree to our terms and privacy policy.
          <div style={{ marginTop: 8 }}>
            <Link to="/food-partner/register" className="muted-link">
              Register as a partner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
