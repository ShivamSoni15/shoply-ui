
import React, { useState } from "react";
import {
  UserRound,
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

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const getPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters.";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Please accept the terms and conditions.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validateForm()) return;

    // Never log passwords or credentials.
    console.log("Signup form submitted:", {
      fullName: formData.fullName.trim(),
      email: formData.email,
      agreeToTerms: formData.agreeToTerms,
    });

    setSuccess(
      "Your form has been validated successfully! Connect authentication to create your account."
    );
  };

  const passwordLevels = [
    { label: "Very Weak", color: "bg-red-500" },
    { label: "Weak", color: "bg-orange-500" },
    { label: "Fair", color: "bg-yellow-500" },
    { label: "Strong", color: "bg-lime-500" },
    { label: "Very Strong", color: "bg-green-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl min-h-[700px] bg-white rounded-3xl shadow-2xl shadow-slate-200/70 overflow-hidden grid grid-cols-1 lg:grid-cols-2">

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
              Start your shopping journey with Shoply.
            </h1>

            <p className="text-indigo-100 text-lg leading-relaxed">
              Create your account and discover a smarter way to shop.
              Find products you love and enjoy a seamless shopping experience.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Discover amazing products",
                "Enjoy a personalized shopping experience",
                "Manage your orders in one place",
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

        {/* Right Signup Section */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md animate__animated animate__fadeIn">

            {/* Mobile Logo */}
            <div className="lg:hidden mb-8">
              <ShoplyLogo variant="dark" size="lg" />
            </div>

            {/* Heading */}
            <div className="mb-7">
              <span className="inline-flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
                <UserRound size={14} />
                Create Account
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Join Shoply!
              </h2>

              <p className="text-slate-500 mt-3 leading-relaxed">
                Create your account to get started with smarter shopping.
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-5 p-4 rounded-xl bg-green-50 border border-green-200 flex gap-3 text-green-700">
                <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Full Name
                </label>

                <div className={`relative flex items-center border rounded-xl transition-all ${
                  errors.fullName
                    ? "border-red-400 bg-red-50/30"
                    : "border-slate-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10"
                }`}>
                  <UserRound className="absolute left-4 text-slate-400" size={19} />

                  <input
                    type="text"
                    id="signup-name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full bg-transparent py-3.5 pl-12 pr-4 outline-none text-slate-800 placeholder:text-slate-400 rounded-xl"
                  />
                </div>

                {errors.fullName && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="signup-email"
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
                    id="signup-email"
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
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Password
                </label>

                <div className={`relative flex items-center border rounded-xl transition-all ${
                  errors.password
                    ? "border-red-400 bg-red-50/30"
                    : "border-slate-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10"
                }`}>
                  <Lock className="absolute left-4 text-slate-400" size={19} />

                  <input
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="w-full bg-transparent py-3.5 pl-12 pr-12 outline-none text-slate-800 placeholder:text-slate-400 rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-indigo-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.password}
                  </p>
                )}

                {/* Password Strength */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex gap-1.5">
                      {passwordLevels.map((level, index) => (
                        <div
                          key={level.label}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            index < passwordStrength
                              ? level.color
                              : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-slate-500 mt-2">
                      Password strength:{" "}
                      <span className="font-semibold text-slate-700">
                        {passwordLevels[Math.max(0, passwordStrength - 1)].label}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Confirm Password
                </label>

                <div className={`relative flex items-center border rounded-xl transition-all ${
                  errors.confirmPassword
                    ? "border-red-400 bg-red-50/30"
                    : "border-slate-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10"
                }`}>
                  <Lock className="absolute left-4 text-slate-400" size={19} />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="signup-confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="w-full bg-transparent py-3.5 pl-12 pr-12 outline-none text-slate-800 placeholder:text-slate-400 rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 text-slate-400 hover:text-indigo-600"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />

                  <span className="text-sm text-slate-600 leading-relaxed">
                    I agree to the{" "}
                    <a href="/terms" className="font-semibold text-indigo-600 hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="font-semibold text-indigo-600 hover:underline">
                      Privacy Policy
                    </a>.
                  </span>
                </label>

                {errors.agreeToTerms && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.agreeToTerms}
                  </p>
                )}
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200"
              >
                Create Account
                <ArrowRight size={19} />
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-slate-500 mt-7">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Sign In
              </a>
            </p>

            <div className="flex items-center justify-center gap-2 mt-8 text-xs text-slate-400">
              <ShieldCheck size={15} />
              Your information is protected.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
