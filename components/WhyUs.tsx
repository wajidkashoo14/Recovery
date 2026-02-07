import React from "react";
import Link from "next/link";
import { 
  Shield, 
  Clock, 
  Award, 
  Lock, 
  Users, 
  Zap, 
  CheckCircle, 
  TrendingUp,
  Star
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Industry Experts Since 2019",
    description:
      "Our team consists of certified blockchain specialists and cryptography experts with over 5 years of proven track record in cryptocurrency recovery.",
    stat: "5+ Years Experience",
    iconColor: "text-blue-400",
    position: "left"
  },
  {
    icon: CheckCircle,
    title: "98% Success Rate",
    description:
      "We've successfully recovered over $500M in lost digital assets with an industry-leading 98% success rate across all cryptocurrency recovery cases.",
    stat: "$500M+ Recovered",
    iconColor: "text-green-400",
    position: "right"
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "Your data is protected with military-grade AES-256 encryption. We never store your private keys and maintain complete confidentiality throughout the recovery process.",
    stat: "AES-256 Encryption",
    iconColor: "text-purple-400",
    position: "left"
  },
  {
    icon: Clock,
    title: "24/7 Emergency Support",
    description:
      "Time-sensitive cases require immediate action. Our dedicated support team is available around the clock to handle urgent cryptocurrency recovery requests.",
    stat: "Round-the-Clock",
    iconColor: "text-orange-400",
    position: "right"
  },
];

const stats = [
  { number: "10,000+", label: "Happy Clients", icon: Users },
  { number: "150+", label: "Countries", icon: TrendingUp },
  { number: "100+", label: "Cryptocurrencies", icon: Zap },
  { number: "4.9/5", label: "Client Rating", icon: Star },
];

const WhyUs = () => {
  return (
    <section 
      className="relative bg-black py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="why-us-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" aria-hidden="true" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} aria-hidden="true" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <header className="text-center mb-16 sm:mb-20 md:mb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 backdrop-blur-sm mb-6">
            <Star className="w-4 h-4 text-blue-400" fill="currentColor" aria-hidden="true" />
            <span className="text-sm text-blue-300 font-medium">Why Choose WalletRecover</span>
          </div>
          
          <h1 
            id="why-us-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">
              The Most Trusted Name in
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cryptocurrency Recovery
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
            We don't just recover crypto—we restore peace of mind. Here's what sets us apart.
          </p>
        </header>

        {/* Timeline-style alternating layout */}
        <div className="relative max-w-5xl mx-auto mb-16 sm:mb-20">
          
          {/* Center line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50" aria-hidden="true" />
          
          {/* Reasons */}
          <div className="space-y-12 md:space-y-16">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              const isLeft = reason.position === "left";
              
              return (
                <article
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" content={String(index + 1)} />
                  
                  {/* Content side */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div className="inline-block mb-3">
                      <span className="text-xs font-bold text-white/40 uppercase tracking-wider">
                        {reason.stat}
                      </span>
                    </div>
                    
                    <h2 
                      className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4"
                      itemProp="name"
                    >
                      {reason.title}
                    </h2>
                    
                    <p 
                      className="text-sm sm:text-base text-white/60 leading-relaxed max-w-md mx-auto md:mx-0"
                      itemProp="description"
                    >
                      {reason.description}
                    </p>
                  </div>
                  
                  {/* Icon in center */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-zinc-900 to-black border-2 border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-sm">
                      <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${reason.iconColor}`} aria-hidden="true" />
                    </div>
                    {/* Connecting dot */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" aria-hidden="true" />
                  </div>
                  
                  {/* Empty space for alignment */}
                  <div className="hidden md:block flex-1" />
                  
                </article>
              );
            })}
          </div>
        </div>

        {/* Stats carousel/grid */}
        <div className="mb-16 sm:mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-6 sm:p-8 text-center hover:border-white/20 transition-all hover:scale-105"
                >
                  {/* Animated gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" aria-hidden="true" />
                  
                  <div className="relative z-10">
                    <Icon className="w-8 h-8 text-white/40 mx-auto mb-3 group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-white/50">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial + CTA combined section */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-sm">
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" aria-hidden="true" />
          
          <div className="relative grid md:grid-cols-2 gap-8 p-8 sm:p-10 md:p-12">
            
            {/* Left: Testimonial */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                ))}
              </div>
              
              <blockquote 
                className="text-lg sm:text-xl text-white/90 mb-6 italic"
                itemScope
                itemType="https://schema.org/Review"
              >
                <p itemProp="reviewBody">
                  "I thought my Bitcoin was lost forever. WalletRecover recovered $250,000 
                  in just 3 days. Absolutely life-changing!"
                </p>
                <footer className="mt-4 text-base text-white/60 not-italic">
                  <cite>
                    <span itemProp="author">— Michael T.</span>, Verified Client
                  </cite>
                </footer>
                <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  <meta itemProp="ratingValue" content="5" />
                  <meta itemProp="bestRating" content="5" />
                </div>
              </blockquote>
              
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                aria-label="Read more client testimonials"
              >
                <span>Read More Success Stories</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Right: CTA */}
            <div className="flex flex-col justify-center items-start md:items-end text-left md:text-right">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Recover Your Crypto?
              </h3>
              <p className="text-sm sm:text-base text-white/60 mb-6 max-w-md">
                Join 10,000+ satisfied clients. No recovery, no fee. Get started in under 2 minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Link
                  href="/contact"
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base text-center"
                  aria-label="Start your cryptocurrency recovery process"
                >
                  Start Recovery Now
                </Link>
                <Link
                  href="/how-it-works"
                  className="px-6 py-3 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base text-center"
                  aria-label="Learn how our recovery process works"
                >
                  How It Works
                </Link>
              </div>
            </div>
            
          </div>
        </div>

        {/* Schema markup for organization */}
        <div itemScope itemType="https://schema.org/Organization" style={{ display: 'none' }}>
          <meta itemProp="name" content="WalletRecover" />
          <meta itemProp="description" content="Industry-leading cryptocurrency wallet recovery service with 98% success rate" />
          <meta itemProp="foundingDate" content="2019" />
          <meta itemProp="url" content="https://walletrecover.com" />
          <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
            <meta itemProp="ratingValue" content="4.9" />
            <meta itemProp="bestRating" content="5" />
            <meta itemProp="ratingCount" content="10000" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyUs;