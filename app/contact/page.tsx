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

// Recovery types
const recoveryTypes = [
  "Bitcoin Recovery",
  "Ethereum Recovery",
  "Seed Phrase Recovery",
  "Hardware Wallet Recovery",
  "Exchange Account Recovery",
  "DeFi Recovery",
  "Scam Recovery",
  "Lost Password",
  "Deleted Wallet",
  "Other",
];

// Wallet types
const walletTypes = [
  "Ledger",
  "Trezor",
  "Blockchain.com",
  "MetaMask",
  "Trust Wallet",
  "Coinbase Wallet",
  "Exodus",
  "Electrum",
  "Bitcoin Core",
  "Multibit",
  "Jaxx Liberty",
  "MyEtherWallet",
  "Binance",
  "Kraken",
  "Coinbase Exchange",
  "Other",
];

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    phone: "",
    country: "",
    recoveryType: "",
    walletType: "",
    message: "",
    agreed: false,
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Update form data
  const updateFormData = (field: string, value: string | boolean) => {
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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Confirm Email validation
    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = "Please confirm your email";
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Email addresses do not match";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    // Recovery Type validation
    if (!formData.recoveryType) {
      newErrors.recoveryType = "Please select a recovery type";
    }

    // Wallet Type validation
    if (!formData.walletType) {
      newErrors.walletType = "Please select a wallet type";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    // Agreement validation
    if (!formData.agreed) {
      newErrors.agreed = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      const element = document.getElementById(firstError);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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
          subject: `New Recovery Request - ${formData.recoveryType}`,
          from_name: formData.name,
          email: formData.email,
          
          // All form fields
          "Name": formData.name,
          "Email": formData.email,
          "Phone": formData.phone,
          "Country": formData.country,
          "Recovery Type": formData.recoveryType,
          "Wallet Type": formData.walletType,
          "Message": formData.message,
          
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
          confirmEmail: "",
          phone: "",
          country: "",
          recoveryType: "",
          walletType: "",
          message: "",
          agreed: false,
        });
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
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
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Confirm Email */}
                  <div>
                    <label htmlFor="confirmEmail" className="block text-sm font-medium text-white mb-2">
                      Confirm Email Address *
                    </label>
                    <input
                      id="confirmEmail"
                      type="email"
                      value={formData.confirmEmail}
                      onChange={(e) => updateFormData('confirmEmail', e.target.value)}
                      className={`
                        w-full px-4 py-3 sm:py-4 bg-white/5 border rounded-lg text-white placeholder-white/40 
                        focus:outline-none focus:border-blue-400 transition-colors
                        ${errors.confirmEmail ? 'border-red-400' : 'border-white/10'}
                      `}
                      placeholder="john@example.com"
                    />
                    {errors.confirmEmail && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.confirmEmail}
                      </p>
                    )}
                  </div>

                  {/* Phone & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-white mb-2">
                        Country *
                      </label>
                      <input
                        id="country"
                        type="text"
                        value={formData.country}
                        onChange={(e) => updateFormData('country', e.target.value)}
                        className={`
                          w-full px-4 py-3 sm:py-4 bg-white/5 border rounded-lg text-white placeholder-white/40 
                          focus:outline-none focus:border-blue-400 transition-colors
                          ${errors.country ? 'border-red-400' : 'border-white/10'}
                        `}
                        placeholder="United States"
                      />
                      {errors.country && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.country}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Type of Recovery */}
                  <div>
                    <label htmlFor="recoveryType" className="block text-sm font-medium text-white mb-2">
                      Type of Recovery *
                    </label>
                    <select
                      id="recoveryType"
                      value={formData.recoveryType}
                      onChange={(e) => updateFormData('recoveryType', e.target.value)}
                      className={`
                        w-full px-4 py-3 sm:py-4 bg-white/5 border rounded-lg text-white 
                        focus:outline-none focus:border-blue-400 transition-colors
                        ${errors.recoveryType ? 'border-red-400' : 'border-white/10'}
                        ${!formData.recoveryType ? 'text-white/40' : 'text-white'}
                      `}
                    >
                      <option value="" className="bg-zinc-900">Select recovery type...</option>
                      {recoveryTypes.map((type) => (
                        <option key={type} value={type} className="bg-zinc-900 text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.recoveryType && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.recoveryType}
                      </p>
                    )}
                  </div>

                  {/* Type of Wallet */}
                  <div>
                    <label htmlFor="walletType" className="block text-sm font-medium text-white mb-2">
                      Type of Wallet *
                    </label>
                    <select
                      id="walletType"
                      value={formData.walletType}
                      onChange={(e) => updateFormData('walletType', e.target.value)}
                      className={`
                        w-full px-4 py-3 sm:py-4 bg-white/5 border rounded-lg text-white 
                        focus:outline-none focus:border-blue-400 transition-colors
                        ${errors.walletType ? 'border-red-400' : 'border-white/10'}
                        ${!formData.walletType ? 'text-white/40' : 'text-white'}
                      `}
                    >
                      <option value="" className="bg-zinc-900">Select wallet type...</option>
                      {walletTypes.map((type) => (
                        <option key={type} value={type} className="bg-zinc-900 text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.walletType && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.walletType}
                      </p>
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
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </p>
                      ) : (
                        <p className="text-sm text-white/40">Minimum 20 characters</p>
                      )}
                      <p className="text-sm text-white/40">{formData.message.length} characters</p>
                    </div>
                  </div>

                  {/* Agreement Checkbox */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        id="agreed"
                        type="checkbox"
                        checked={formData.agreed}
                        onChange={(e) => updateFormData('agreed', e.target.checked)}
                        className={`
                          w-5 h-5 mt-0.5 rounded border-2 bg-white/5 
                          checked:bg-blue-500 checked:border-blue-500 
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black
                          transition-all cursor-pointer
                          ${errors.agreed ? 'border-red-400' : 'border-white/20'}
                        `}
                      />
                      <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                        I agree to the{" "}
                        <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                          terms and conditions
                        </Link>
                        {" "}and{" "}
                        <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">
                          privacy policy
                        </Link>
                        . I understand that by submitting this form, I consent to be contacted regarding my inquiry. *
                      </span>
                    </label>
                    {errors.agreed && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.agreed}
                      </p>
                    )}
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Contact Info */}
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