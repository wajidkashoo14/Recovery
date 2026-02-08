"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Shield,
  Award,
  Clock,
  ArrowRight
} from "lucide-react";

const footerLinks = {
  services: [
    { name: "Bitcoin Recovery", href: "/services/bitcoin-recovery" },
    { name: "Ethereum Recovery", href: "/services/ethereum-recovery" },
    { name: "Hardware Wallet Recovery", href: "/services/hardware-wallet" },
    { name: "Seed Phrase Reconstruction", href: "/services/seed-phrase" },
    { name: "Password Recovery", href: "/services/password-recovery" },
    { name: "Scam Investigation", href: "/services/scam-investigation" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "FAQs", href: "/faqs" },
    { name: "Guides & Tutorials", href: "/guides" },
    { name: "Security Tips", href: "/security-tips" },
    { name: "Documentation", href: "/docs" },
    { name: "API", href: "/api" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Compliance", href: "/compliance" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/walletrecover", color: "hover:text-blue-400" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/walletrecover", color: "hover:text-sky-400" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/walletrecover", color: "hover:text-blue-500" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/walletrecover", color: "hover:text-pink-400" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/walletrecover", color: "hover:text-red-500" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setIsSubmitting(false);
      setEmail("");
    }, 1000);
  };

  return (
    <footer 
      className="relative bg-black border-t border-white/10"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main footer content */}
        <div className="py-12 sm:py-16 md:py-20">
          
          {/* Top section - Newsletter & Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 pb-10 sm:pb-12 md:pb-16 border-b border-white/10">
            
            {/* Left: Brand & Newsletter */}
            <div>
              {/* Logo & Description */}
              <div className="mb-6 sm:mb-8">
                <Link 
                  href="/"
                  className="inline-block mb-4"
                  itemProp="url"
                >
                  <h2 
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    itemProp="name"
                  >
                    WalletRecover
                  </h2>
                </Link>
                <p 
                  className="text-sm sm:text-base text-white/60 max-w-md leading-relaxed"
                  itemProp="description"
                >
                  Industry-leading cryptocurrency wallet recovery service. We've helped 10,000+ clients recover over $500M in lost digital assets since 2019.
                </p>
              </div>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                  Stay Updated
                </h3>
                <p className="text-xs sm:text-sm text-white/60 mb-4">
                  Get crypto security tips and recovery insights delivered to your inbox.
                </p>
                
                {subscribed ? (
                  <div className="flex items-center gap-2 text-green-400 text-sm sm:text-base">
                    <Shield className="w-5 h-5" />
                    <span>Thanks for subscribing!</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-colors text-sm sm:text-base"
                      aria-label="Email address for newsletter"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
                      aria-label="Subscribe to newsletter"
                    >
                      {isSubmitting ? (
                        <span>Subscribing...</span>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white">SSL Secured</div>
                    <div className="text-[10px] xs:text-xs text-white/50">AES-256 Encryption</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white">98% Success</div>
                    <div className="text-[10px] xs:text-xs text-white/50">Industry Leading</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Info */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
                Get In Touch
              </h3>
              
              <div 
                className="space-y-4 sm:space-y-5"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <meta itemProp="name" content="WalletRecover" />
                
                {/* Email */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-white/50 mb-1">Email</div>
                    <a 
                      href="mailto:support@walletrecover.com"
                      className="text-sm sm:text-base text-white hover:text-blue-400 transition-colors"
                      itemProp="email"
                    >
                      support@walletrecover.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-white/50 mb-1">Phone (24/7)</div>
                    <a 
                      href="tel:+1-800-RECOVER"
                      className="text-sm sm:text-base text-white hover:text-purple-400 transition-colors"
                      itemProp="telephone"
                    >
                      +1 (800) RECOVER
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                  </div>
                  <div 
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <div className="text-xs sm:text-sm text-white/50 mb-1">Headquarters</div>
                    <address className="text-sm sm:text-base text-white not-italic">
                      <span itemProp="streetAddress">123 Blockchain Ave, Suite 500</span><br />
                      <span itemProp="addressLocality">San Francisco</span>, <span itemProp="addressRegion">CA</span> <span itemProp="postalCode">94105</span><br />
                      <span itemProp="addressCountry">United States</span>
                    </address>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-center gap-2 pt-2 sm:pt-4">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span className="text-xs sm:text-sm text-white/60">
                    Average response time: &lt;2 hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 py-10 sm:py-12 md:py-16 border-b border-white/10">
            
            {/* Services */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">
                Services
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">
                Company
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">
                Resources
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">
                Legal
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 sm:pt-8 md:pt-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              
              {/* Copyright */}
              <div className="text-xs sm:text-sm text-white/50 text-center md:text-left order-2 md:order-1">
                <p>
                  © {new Date().getFullYear()} WalletRecover. All rights reserved.
                </p>
                <p className="mt-1">
                  Cryptocurrency Recovery Specialists | Licensed & Insured
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 sm:gap-4 order-1 md:order-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 ${social.color} hover:border-white/20 hover:scale-110 transition-all`}
                      aria-label={`Visit our ${social.name} page`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Trust Seals */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
                <div className="text-xs sm:text-sm text-white/40">Accepted Cryptocurrencies:</div>
                <div className="flex items-center gap-2 sm:gap-3">
                  {["BTC", "ETH", "USDT", "BNB", "SOL", "XRP"].map((crypto, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 sm:px-3 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[10px] xs:text-xs font-semibold text-white/60"
                    >
                      {crypto}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden schema markup for organization */}
      <div itemScope itemType="https://schema.org/Organization" style={{ display: 'none' }}>
        <meta itemProp="name" content="WalletRecover" />
        <meta itemProp="url" content="https://walletrecover.com" />
        <meta itemProp="logo" content="https://walletrecover.com/logo.png" />
        <meta itemProp="foundingDate" content="2019" />
        <meta itemProp="email" content="support@walletrecover.com" />
        <meta itemProp="telephone" content="+1-800-RECOVER" />
        <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
          <meta itemProp="ratingValue" content="4.9" />
          <meta itemProp="bestRating" content="5" />
          <meta itemProp="ratingCount" content="10000" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;