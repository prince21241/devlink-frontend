import React, { useState } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "../../components/Icons/Icons";
import { useToast } from "../../components/Toast/Toast";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      addToast("Welcome to DevLink! Registration successful", "success");
      navigate("/dashboard");
    } catch (err) {
      addToast(err.response?.data?.msg || "Registration failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        {/* Form only */}
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DevLink
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Join DevLink
            </h2>
            <p className="mt-2 text-gray-600">
              Create your account and start connecting
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <UserIcon className="w-5 h-5" />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <MailIcon className="w-5 h-5" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <LockIcon className="w-5 h-5" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-blue-600 hover:text-purple-600 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Back to home */}
          <div className="text-center mt-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
