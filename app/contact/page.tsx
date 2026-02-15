"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Phone,
  Mail,
  Building2,
  Send,
  CheckCircle,
  AlertCircle,
  Shield,
  FileText,
  Users,
  MapPin
} from "lucide-react";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Update form data
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Please provide more details (minimum 20 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Web3Forms endpoint
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          // Replace with your Web3Forms access key
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
          
          // Form data
          subject: `Contact Form: ${formData.subject}`,
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          
          // Additional info
          "Subject": formData.subject,
          
          // Redirect after submission (optional)
          redirect: false,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        // Hide success message after 10 seconds
        setTimeout(() => setIsSuccess(false), 10000);
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit form. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      
      {/* Hero Section */}
      <section className="relative pt-20 xs:pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-white">Contact</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            
            <p className="text-base xs:text-lg sm:text-xl text-white/60 max-w-3xl mx-auto">
              We've helped over 100 clients regaining access to their crypto wallet since 2019.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 text-center">
              <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-3" />
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Legally Binding Agreements</h3>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 text-center">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">No Recovery, No Fee Guarantee</h3>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 text-center">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mx-auto mb-3" />
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">In-Person Consultations Available</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            
            {/* Left: Contact Information */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* Contact Info */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-white/60 mb-2">Email Address</h3>
                      <a 
                        href="mailto:support@walletrecover.com" 
                        className="flex items-center gap-3 text-base sm:text-lg text-white hover:text-blue-400 transition-colors group"
                      >
                        <Mail className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                        support@walletrecover.com
                      </a>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white/60 mb-2">Phone</h3>
                      <a 
                        href="tel:+1-800-RECOVER" 
                        className="flex items-center gap-3 text-base sm:text-lg text-white hover:text-blue-400 transition-colors group"
                      >
                        <Phone className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                        +1 (800) RECOVER
                      </a>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white/60 mb-2">Chambers of Commerce</h3>
                      <div className="flex items-center gap-3 text-base sm:text-lg text-white">
                        <Building2 className="w-5 h-5 text-purple-400" />
                        75927276
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                        24/7 Support Available
                      </h3>
                      <p className="text-sm text-white/70">
                        Our team is ready to help you recover your cryptocurrency. 
                        Get a free consultation within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                
                <div className="mb-8">
                  <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-3">
                    Let's get started!
                  </h2>
                  <p className="text-sm sm:text-base text-white/60">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                {/* Success Message */}
                {isSuccess && (
                  <div className="mb-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 animate-fade-in">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1">Message Sent Successfully!</h3>
                        <p className="text-sm text-white/80">
                          Thank you for contacting us. We'll get back to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 sm:p-5 rounded-xl bg-red-500/10 border border-red-400/30">
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      {error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className={`
                        w-full px-4 py-3 sm:py-4 bg-white/5 border rounded-lg text-white placeholder-white/40 
                        focus:outline-none focus:border-blue-400 transition-colors
                        ${errors.name ? 'border-red-400' : 'border-white/10'}
                      `}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className={`
                          w-full px-4 py-3 sm:py-4 bg-white/5 border rounded-lg text-white placeholder-white/40 
                          focus:outline-none focus:border-blue-400 transition-colors
                          ${errors.email ? 'border-red-400' : 'border-white/10'}
                        `}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className={`
                          w-full px-4 py-3 sm:py-4 bg-white/5 border rounded-lg text-white placeholder-white/40 
                          focus:outline-none focus:border-blue-400 transition-colors
                          ${errors.phone ? 'border-red-400' : 'border-white/10'}
                        `}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-400">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      Subject *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => updateFormData('subject', e.target.value)}
                      className={`
                        w-full px-4 py-3 sm:py-4 bg-white/5 border rounded-lg text-white placeholder-white/40 
                        focus:outline-none focus:border-blue-400 transition-colors
                        ${errors.subject ? 'border-red-400' : 'border-white/10'}
                      `}
                      placeholder="Bitcoin Wallet Recovery"
                    />
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-400">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      rows={6}
                      className={`
                        w-full px-4 py-3 sm:py-4 bg-white/5 border rounded-lg text-white placeholder-white/40 
                        focus:outline-none focus:border-blue-400 transition-colors resize-none
                        ${errors.message ? 'border-red-400' : 'border-white/10'}
                      `}
                      placeholder="Please describe your situation and what you need help with..."
                    />
                    <div className="flex items-center justify-between mt-2">
                      {errors.message ? (
                        <p className="text-sm text-red-400">{errors.message}</p>
                      ) : (
                        <p className="text-sm text-white/40">Minimum 20 characters</p>
                      )}
                      <p className="text-sm text-white/40">{formData.message.length} characters</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-white/40">
                    By submitting this form, you agree to our{" "}
                    <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300">
                      privacy policy
                    </Link>
                    {" "}and{" "}
                    <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                      terms of service
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Contact Info (Repeated for visibility) */}
      <section className="relative py-12 sm:py-16 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
            Contact Information
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
              <Mail className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-sm font-semibold text-white/60 mb-2">Email Address</h3>
              <a 
                href="mailto:support@walletrecover.com" 
                className="text-base text-white hover:text-blue-400 transition-colors break-all"
              >
                support@walletrecover.com
              </a>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
              <Phone className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h3 className="text-sm font-semibold text-white/60 mb-2">Phone</h3>
              <a 
                href="tel:+1-800-RECOVER" 
                className="text-base text-white hover:text-green-400 transition-colors"
              >
                +1 (800) RECOVER
              </a>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
              <Building2 className="w-10 h-10 text-purple-400 mx-auto mb-4" />
              <h3 className="text-sm font-semibold text-white/60 mb-2">Chambers of Commerce</h3>
              <p className="text-base text-white">75927276</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;