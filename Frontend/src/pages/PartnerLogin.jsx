import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function PartnerLogin(){
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  function handleChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    try{
      const email = e.target.email.value
      const password = e.target.password.value
      console.log('Submitting partner login:', { email, password })

      const response = await axios.post(
        'http://localhost:5000/api/auth/food-partner/login',
        { email, password },
        { withCredentials: true }
      )

      console.log('Partner login successful:', response.data)
      alert('Login successful!')
      navigate('/')
    }catch(error){
      console.error('Partner login error:', error)
      alert(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">FoodView Partner</div>
          <div className="auth-title">Partner sign in</div>
          <div className="auth-desc">Access your partner dashboard and manage orders.</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Business email</label>
            <input name="email" value={form.email} onChange={handleChange} className="input" placeholder="owner@example.com" />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input name="password" value={form.password} onChange={handleChange} className="input" type="password" placeholder="••••••••" />
          </div>

          <div className="actions">
            <div className="muted-link">Need help?</div>
            <button type="submit" className="btn">Sign in</button>
          </div>
        </form>

        <div className="small-note">Not a partner yet? <Link to="/food-partner/register" className="muted-link">Register</Link></div>
      </div>
    </div>
  )
}
