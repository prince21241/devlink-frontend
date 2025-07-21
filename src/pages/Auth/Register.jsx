import React, { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      alert("Registration successful!");
      navigate("/dashboard"); // ✅ Redirect after register
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" onChange={handleChange} placeholder="Name" />
        <br />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <br />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
