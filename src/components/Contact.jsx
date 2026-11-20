
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Log only non-sensitive contact form information.
    console.log("Shoply Contact Form:", formData);

    setSubmitted(true);

    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });

    setErrors({});
  };

  const contactDetails = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "support@shoply.com",
      description: "Send us an email anytime.",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+91 00000 00000",
      description: "Monday to Saturday, 9 AM – 6 PM.",
    },
    {
      icon: MapPin,
      title: "Our Location",
      detail: "India",
      description: "Serving customers across India.",
    },
    {
      icon: Clock,
      title: "Working Hours",
      detail: "9 AM – 6 PM",
      description: "Monday to Saturday.",
    },
  ];

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100";

  return (
    <div className="min-h-screen bg-[#fbf9ff]">

      {/* Page Heading */}
      <section className="px-4 pt-12 pb-10 sm:pt-16">
        <div className="max-w-4xl mx-auto text-center animate__animated animate__fadeIn">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            <MessageCircle size={16} />
            We'd love to hear from you
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Get in Touch With{" "}
            <span className="text-purple-700">Shoply</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Have a question, need assistance, or want to share feedback?
            Our team is here to help you enjoy a better shopping experience.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="px-4 pb-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {contactDetails.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm font-semibold text-purple-700">
                  {item.detail}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm lg:grid-cols-5">

          {/* Left Information Panel */}
          <div className="bg-purple-700 p-8 text-white sm:p-10 lg:col-span-2">

            <h2 className="text-2xl font-bold sm:text-3xl">
              Let's Talk!
            </h2>

            <p className="mt-4 text-sm leading-7 text-purple-100">
              Your experience matters to us. Contact our support team
              and we'll do our best to assist you.
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-white/15 p-3">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Email Support</h3>
                  <p className="mt-1 text-sm text-purple-100">
                    support@shoply.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-white/15 p-3">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Customer Care</h3>
                  <p className="mt-1 text-sm text-purple-100">
                    Monday – Saturday
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-white/15 p-3">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Support Hours</h3>
                  <p className="mt-1 text-sm text-purple-100">
                    9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-12 rounded-2xl border border-white/20 bg-white/10 p-5">
              <p className="text-sm font-semibold">
                Shoply Customer Promise
              </p>
              <p className="mt-2 text-xs leading-6 text-purple-100">
                We're committed to making your shopping experience
                simple, convenient, and enjoyable.
              </p>
            </div>
          </div>

          {/* Form Panel */}
          <div className="p-6 sm:p-10 lg:col-span-3">

            <h2 className="text-2xl font-bold text-slate-900">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill out the form below and let us know how we can help.
            </p>

            {submitted && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                <CheckCircle size={20} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">
                    Message submitted successfully!
                  </p>
                  <p className="mt-1 text-xs">
                    Thank you for contacting Shoply.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClass}
                />

                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                />

                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  className={inputClass}
                />

                {errors.subject && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Your Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your message here..."
                  className={`${inputClass} resize-none`}
                />

                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-200 sm:w-auto"
              >
                Send Message
                <Send size={17} />
              </button>

            </form>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Contact;
