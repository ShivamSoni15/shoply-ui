
import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import ShoplyLogo from "./Logo";
import "animate.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess("");
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validateForm()) return;

    // Never log passwords or credentials.
    console.log("Login form submitted:", {
      email: formData.email,
      rememberMe: formData.rememberMe,
    });

    setSuccess(
      "Form validated successfully! Authentication is not connected yet."
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl min-h-[650px] bg-white rounded-3xl shadow-2xl shadow-slate-200/70 overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Left Branding Section */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-12 text-white relative overflow-hidden">

          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-400/20 rounded-full blur-2xl" />

          <div className="relative z-10">
            <ShoplyLogo variant="light" size="lg" />
          </div>

          <div className="relative z-10 max-w-md animate__animated animate__fadeInUp">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-8">
              <ShoppingBag size={32} />
            </div>

            <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight mb-6">
              Welcome back to your shopping world.
            </h1>

            <p className="text-indigo-100 text-lg leading-relaxed">
              Sign in to discover great products, manage your orders,
              and enjoy a smarter shopping experience.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Discover products you'll love",
                "Track your orders easily",
                "Enjoy a personalized experience",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-indigo-200" />
                  <span className="text-sm text-indigo-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-indigo-200 text-sm">
            <ShieldCheck size={17} />
            Your shopping experience matters to us.
          </div>
        </div>

        {/* Right Login Section */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md animate__animated animate__fadeIn">

            {/* Mobile Logo */}
            <div className="lg:hidden mb-10">
              <ShoplyLogo variant="dark" size="lg" />
            </div>

            <div className="mb-8">
              <span className="inline-flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
                <Lock size={13} />
                Secure Login
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome back!
              </h2>

              <p className="text-slate-500 mt-3 leading-relaxed">
                Enter your details below to access your Shoply account.
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex gap-3 text-green-700">
                <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Email Address
                </label>

                <div className={`relative flex items-center border rounded-xl transition-all ${
                  errors.email
                    ? "border-red-400 bg-red-50/30"
                    : "border-slate-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10"
                }`}>
                  <Mail className="absolute left-4 text-slate-400" size={19} />

                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full bg-transparent py-3.5 pl-12 pr-4 outline-none text-slate-800 placeholder:text-slate-400 rounded-xl"
                  />
                </div>

                {errors.email && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <a
                    href="/forgot-password"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className={`relative flex items-center border rounded-xl transition-all ${
                  errors.password
                    ? "border-red-400 bg-red-50/30"
                    : "border-slate-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10"
                }`}>
                  <Lock className="absolute left-4 text-slate-400" size={19} />

                  <input
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full bg-transparent py-3.5 pl-12 pr-12 outline-none text-slate-800 placeholder:text-slate-400 rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-indigo-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />

                  <span className="text-sm text-slate-600">
                    Remember me
                  </span>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200"
              >
                Sign In
                <ArrowRight size={19} />
              </button>
            </form>

            {/* Signup Link */}
            <p className="text-center text-sm text-slate-500 mt-8">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Create an account
              </a>
            </p>

            <div className="flex items-center justify-center gap-2 mt-10 text-xs text-slate-400">
              <ShieldCheck size={15} />
              Secure shopping starts here.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
