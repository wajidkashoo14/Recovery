"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  FileText,
  Search,
  Zap,
  DollarSign,
  Phone,
  Mail,
  ChevronRight,
  Award,
  Users,
  Clock
} from "lucide-react";

// How it works steps
const howItWorksSteps = [
  {
    number: "01",
    title: "Submit a Recovery Request",
    description: "Provide us with details about your wallet issue.",
  },
  {
    number: "02",
    title: "Free Assessment",
    description: "Our experts will evaluate the case and determine the likelihood of recovery.",
  },
  {
    number: "03",
    title: "Signing of Contract",
    description: "We'll always sign a legal contract before starting.",
  },
  {
    number: "04",
    title: "Recovery Process",
    description: "We work on restoring access to your wallet.",
  },
  {
    number: "05",
    title: "Successful Recovery & Payment",
    description: "Once we recover your funds, we deduct our fee and return the rest to you.",
  },
];

// FAQs
const faqs = [
  {
    question: "How much does crypto wallet recovery cost?",
    answer: "Our standard fee is 20% of the recovered funds. However, for wallets with significant holdings, we offer custom pricing to provide a fair and competitive rate.",
  },
  {
    question: "Do I need to pay upfront for crypto recovery?",
    answer: "No, we work on a no recovery, no fee basis. You only pay us once we successfully recover your funds. This means we offer a free crypto recovery service.",
  },
  {
    question: "What if my wallet contains a large amount of cryptocurrency?",
    answer: "For high-value wallets, we can negotiate a lower percentage fee. Contact us to discuss a custom pricing plan that suits your needs.",
  },
  {
    question: "How do I know if my crypto wallet can be recovered?",
    answer: "We offer a free assessment to determine the likelihood of recovery. Simply submit a request, and our experts will evaluate your case.",
  },
  {
    question: "Are there any hidden fees in your crypto recovery services?",
    answer: "No, we believe in transparent pricing. The fee you agree to before recovery is the only amount you will be charged upon successful recovery.",
  },
  {
    question: "Do you offer pro bono crypto recovery services?",
    answer: "We operate on a no cure, no pay basis, meaning you only pay if we successfully recover your crypto. While we don't offer completely pro bono crypto recovery, we ensure that there's no financial risk for you—if we can't recover your funds, you owe us nothing. Contact us to discuss your case and see how we can help.",
  },
];

// Partner logos (you can replace with actual images)
const partners = [
  { name: "Bitcoin.com", logo: "₿" },
  { name: "Medium", logo: "M" },
  { name: "Yahoo! Finance", logo: "Y!" },
  { name: "Nasdaq", logo: "📈" },
  { name: "GOBankingRates", logo: "💰" },
  { name: "Taboola", logo: "T" },
];

const PricingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      
      {/* Hero Section */}
      <section className="relative pt-20 xs:pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-white">Crypto Recovery</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            
            <p className="text-base xs:text-lg sm:text-xl text-white/60 max-w-3xl mx-auto">
              The pricing of our crypto recovery services explained.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12 sm:mb-16">
            
            {/* Standard Pricing Card */}
            <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/30 transition-all">
              <div className="mb-6">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-3">
                  Standard Crypto Recovery Fee
                </h2>
                <p className="text-sm sm:text-base text-white/60">
                  The standard recovery fee is{" "}
                  <span className="text-blue-400 font-bold">20% of the recovered amount</span>.
                  This means that if we successfully restore access to your wallet, we take a 20% commission 
                  from the recovered funds, and you keep the remaining 80%.
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl xs:text-6xl sm:text-7xl font-bold text-white">20%</span>
                  <span className="text-xl sm:text-2xl text-white/60">fee</span>
                </div>
                <div className="text-sm sm:text-base text-white/50">
                  You keep <span className="text-green-400 font-semibold">80%</span> of recovered funds
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
              >
                Start Your Recovery
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Custom Pricing Card */}
            <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 hover:border-purple-400/50 transition-all">
              <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                CUSTOM
              </div>
              
              <div className="mb-6">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-3">
                  Custom Pricing for High-Value Wallets
                </h2>
                <p className="text-sm sm:text-base text-white/60">
                  For wallets with{" "}
                  <span className="text-purple-400 font-bold">significantly high-value holdings</span>,
                  we offer custom pricing based on the complexity and effort required. Get in touch with us 
                  to discuss a tailored fee structure that works best for you.
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl xs:text-6xl sm:text-7xl font-bold text-white">&lt;20%</span>
                </div>
                <div className="text-sm sm:text-base text-white/50">
                  Negotiable for high-value recoveries
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
              >
                Book a Call
                <Phone className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Trust Statement */}
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-6">
              At Crypto Recovers, we believe in a clear and fair pricing structure. We operate on a{" "}
              <span className="text-green-400 font-bold">success-based fee model</span>, meaning you only 
              pay us if we successfully recover your crypto assets. There are no upfront costs, hidden fees, 
              or unnecessary charges.
            </p>

            {/* 5 Star Rating */}
            <div className="inline-flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 sm:w-8 sm:h-8 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-white/70">
                *Our clients rate us with a 5/5
              </p>
              <Link href="/testimonials" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                View all testimonials
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative py-12 sm:py-16 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-base sm:text-lg text-white/50 mb-8 sm:mb-12">
            Partners & Mentioned on
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <span className="text-3xl sm:text-4xl">{partner.logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 sm:space-y-8">
              {howItWorksSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 sm:gap-6 items-start p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* No Recovery, No Fee Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 text-center">
            <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mx-auto mb-4 sm:mb-6" />
            
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">
              No Recovery, No Fee
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              We stand by our work. If we are unable to recover your wallet, you{" "}
              <span className="text-green-400 font-bold">don't pay anything</span>. This ensures that we 
              are fully committed to delivering results while minimizing risk for our clients.
            </p>

            <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8">
              Contact us today to get started with a free assessment.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions about Crypto Recovery Pricing
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4" itemScope itemType="https://schema.org/FAQPage">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all"
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-start justify-between gap-4 p-4 sm:p-5 md:p-6 text-left hover:bg-white/5 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-white pr-2" itemProp="name">
                      {faq.question}
                    </h3>
                    <ChevronRight
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0 transition-transform ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      className="px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6 pt-0"
                      itemProp="acceptedAnswer"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <div className="border-t border-white/10 pt-4 sm:pt-5">
                        <p className="text-xs xs:text-sm sm:text-base text-white/70 leading-relaxed" itemProp="text">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 text-center">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">
              Get a Free Assessment Today
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              If you need help recovering your cryptocurrency, don't hesitate to reach out. Our team is ready 
              to assist you with a secure and professional recovery process.
            </p>

            <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8">
              Contact us today to get started with a free assessment and discuss the best pricing for your case.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
              >
                Start Your Recovery
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-sm sm:text-base"
              >
                Meet Our Team
                <Users className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="relative py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">No Upfront Costs</h3>
              <p className="text-sm text-white/60">Pay only if we succeed</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-3" />
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Transparent Pricing</h3>
              <p className="text-sm text-white/60">No hidden fees ever</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
              <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mx-auto mb-3" />
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Legal Contract</h3>
              <p className="text-sm text-white/60">Everything in writing</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PricingPage;