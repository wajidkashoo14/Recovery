"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Zap,
  Shield,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  FileText,
  Activity,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Headphones,
  Rocket,
  CalendarClock,
  Info,
} from "lucide-react";

// Urgent 24/7 recovery scenarios
const urgentScenarios = [
  {
    icon: Zap,
    title: "Active Theft / Draining In Progress",
    description: "Funds or assets currently being transferred or drained. Immediate freeze requests via exchanges, marketplaces, or protocols.",
    severity: "Critical",
    recoveryRate: "40-75%",
    timeframe: "Minutes to 48 hours",
    commonCauses: ["Ongoing phishing session", "Live drainer contract", "Hacked session"],
  },
  {
    icon: AlertTriangle,
    title: "Fresh Wallet / Exchange Compromise",
    description: "Account just hacked, password changed, or unauthorized withdrawals initiated. Urgent escalation to lock account.",
    severity: "Very High",
    recoveryRate: "60-90%",
    timeframe: "1-72 hours",
    commonCauses: ["Credential stuffing", "Session hijack", "Support impersonation"],
  },
  {
    icon: Rocket,
    title: "Wrong Transfer – Recent Transaction",
    description: "Crypto just sent to wrong address/network/memo within last few hours. Highest chance if funds still traceable.",
    severity: "High",
    recoveryRate: "50-85%",
    timeframe: "Hours to 7 days",
    commonCauses: ["Typo / clipboard swap", "Network mismatch", "Missing tag"],
  },
  {
    icon: Clock,
    title: "Stolen NFTs – Fresh Theft",
    description: "NFTs recently transferred without permission. Rapid marketplace freeze and takedown coordination.",
    severity: "Critical",
    recoveryRate: "30-70%",
    timeframe: "Hours to 14 days",
    commonCauses: ["Malicious signature", "Fake marketplace login", "Approval exploit"],
  },
  {
    icon: Headphones,
    title: "Locked Account – Urgent Access Needed",
    description: "Funds needed immediately (medical/legal/emergency) but account frozen, 2FA lost, or password forgotten.",
    severity: "High",
    recoveryRate: "75-95%",
    timeframe: "4-48 hours",
    commonCauses: ["2FA failure", "Suspicious activity lock", "Compliance hold"],
  },
  {
    icon: FileText,
    title: "Time-Sensitive Legal / Inheritance Cases",
    description: "Court deadline, tax requirement, or estate distribution needing fast access or proof of assets.",
    severity: "Very High",
    recoveryRate: "65-85%",
    timeframe: "24-96 hours",
    commonCauses: ["Legal urgency", "Regulatory deadline", "Family emergency"],
  },
];

// Supported platforms for urgent cases
const supportedPlatforms = [
  { name: "Binance", logo: "🟡", tier: "Exchange", urgent: true },
  { name: "Coinbase", logo: "🔵", tier: "Exchange", urgent: true },
  { name: "Kraken", logo: "🐙", tier: "Exchange", urgent: true },
  { name: "OpenSea", logo: "🌊", tier: "NFT", urgent: true },
  { name: "MetaMask", logo: "🦊", tier: "Wallet", urgent: true },
  { name: "Phantom", logo: "👻", tier: "Wallet", urgent: true },
  { name: "Bybit", logo: "🟠", tier: "Exchange", urgent: true },
  { name: "OKX", logo: "⚫", tier: "Exchange", urgent: true },
];

// Recovery process – urgent variant
const urgentSteps = [
  {
    number: "01",
    title: "Immediate Triage & Freeze Attempt",
    description: "24/7 team assesses situation within minutes. Initiate freeze requests, account locks, or approval revokes where possible.",
    icon: Zap,
  },
  {
    number: "02",
    title: "Rapid Evidence Submission",
    description: "Collect tx hashes, screenshots, emails, device info. Prepare high-priority support tickets with strong proof.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Direct Escalation & Contacts",
    description: "Leverage tier-2/3 support relationships, emergency channels, and marketplace security teams for fastest response.",
    icon: Headphones,
  },
  {
    number: "04",
    title: "Parallel Tracing & Coordination",
    description: "Monitor chain activity in real-time. Coordinate with law enforcement, exchanges, or protocols simultaneously.",
    icon: Activity,
  },
  {
    number: "05",
    title: "Secure Restoration & Hardening",
    description: "Restore access or recover funds. Immediately secure with new credentials, hardware wallet, multi-sig.",
    icon: Unlock,
  },
];

// Common urgent cases
const commonUrgentCases = [
  {
    issue: "Active wallet drain in progress",
    priority: "Extreme",
    time: "Minutes–4 hours",
    action: "Freeze requests + session termination",
  },
  {
    issue: "Fresh unauthorized withdrawal",
    priority: "Very High",
    time: "1–24 hours",
    action: "Exchange emergency lock + chargeback attempt",
  },
  {
    issue: "Just-sent wrong address/network",
    priority: "High",
    time: "Hours–48 hours",
    action: "Trace + recipient/exchange contact",
  },
  {
    issue: "Stolen NFTs listed for sale",
    priority: "Very High",
    time: "Hours–72 hours",
    action: "Marketplace takedown + freeze",
  },
  {
    issue: "Locked account – funds needed urgently",
    priority: "High",
    time: "4–48 hours",
    action: "Escalated KYC + priority support",
  },
];

// FAQs – urgent focus
const faqs = [
  {
    question: "Do you really offer 24/7 urgent recovery support?",
    answer:
      "Yes. Our team operates 24 hours a day, 7 days a week for active theft, ongoing drains, fresh compromises, and time-critical situations. Response time is typically under 30 minutes for urgent submissions.",
  },
  {
    question: "What qualifies as an 'urgent' recovery case?",
    answer:
      "Active draining, unauthorized withdrawals in progress, fresh hacks (within last 24–48 hours), wrong transfers just made, stolen NFTs being listed/sold, or situations with legal/medical/financial emergencies requiring immediate access.",
  },
  {
    question: "How fast can you act on an active theft?",
    answer:
      "We can initiate freeze requests, support escalations, and tracing within minutes of receiving transaction details and proof of ownership. Success heavily depends on how quickly funds hit centralized platforms.",
  },
  {
    question: "What is the fee structure for urgent 24/7 cases?",
    answer:
      "25–40% of recovered funds (higher due to round-the-clock staffing, priority escalation, and real-time monitoring). No recovery = no fee. Emergency setup fee may apply for ultra-high-priority cases (refundable on success).",
  },
  {
    question: "Can you help if funds were just sent to the wrong address?",
    answer:
      "Yes — especially if sent within the last few hours. We act fastest on recent transactions. Provide tx hash immediately for best chance of tracing and contacting recipient or platform.",
  },
  {
    question: "What if it's after business hours or weekend?",
    answer:
      "We have dedicated night/weekend shifts. Submit your case anytime — urgent inquiries are handled immediately regardless of time or day.",
  },
];

const UrgentRecoveryPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Hero Section */}
      <section className="relative pt-20 xs:pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-orange-900/10 to-yellow-900/10 opacity-30" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/50 mb-6 sm:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <Link href="/recovery-services" className="hover:text-white transition-colors">Recovery Services</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-white">24/7 Urgent Recovery</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/15 px-4 py-2 backdrop-blur-sm mb-6">
                <Zap className="w-5 h-5 text-red-400 animate-pulse" />
                <span className="text-sm font-semibold text-red-300">24/7 Emergency Response</span>
              </div>

              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
                <span className="text-white">24/7 Urgent Crypto</span>
                <br />
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Recovery Service
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 max-w-3xl">
                Active theft in progress? Funds just stolen? Wrong transfer minutes ago? 
                Our 24/7 emergency team responds within minutes to freeze, trace, and recover.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/contact?type=urgent"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg rounded-xl hover:scale-105 transition-all shadow-2xl shadow-red-600/40"
                >
                  <Phone className="w-6 h-6" />
                  EMERGENCY CONTACT NOW
                </Link>
                <Link
                  href="#scenarios"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 border-2 border-white/30 text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  View Urgent Cases
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-white/70">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-red-400" />
                  <span>Response &lt; 30 min</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <span>24/7 Live Team</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-400" />
                  <span>No Recovery = No Fee</span>
                </div>
              </div>
            </div>

            {/* Right panel - Urgent Cases Quick List */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-red-500/30 bg-gradient-to-br from-red-950/40 to-black/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-red-900/30">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-7 h-7 text-red-400 animate-pulse" />
                  Active Emergency Cases We Handle
                </h3>

                <div className="space-y-4">
                  {[
                    { title: "Funds being drained RIGHT NOW", color: "red" },
                    { title: "Account just hacked – withdrawals started", color: "orange" },
                    { title: "Sent to wrong address minutes ago", color: "yellow" },
                    { title: "NFTs stolen and listed for sale", color: "purple" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl bg-gradient-to-r from-${item.color}-950/30 to-transparent border border-${item.color}-500/30 flex items-center gap-4 hover:scale-[1.02] transition-all`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-${item.color}-400 animate-pulse flex-shrink-0`} />
                      <span className="font-medium text-white/90">{item.title}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact?type=urgent"
                  className="mt-8 w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all text-lg"
                >
                  <Headphones className="w-5 h-5" />
                  Speak to Emergency Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Recovery Scenarios */}
      <section id="scenarios" className="relative py-16 sm:py-20 md:py-24 bg-zinc-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              24/7 Urgent Recovery Scenarios
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Cases where minutes or hours make the difference between recovery and permanent loss
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {urgentScenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <div
                  key={index}
                  className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 hover:border-red-500/40 transition-all hover:shadow-2xl hover:shadow-red-900/20 group"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-red-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">{scenario.title}</h3>
                  <p className="text-white/70 mb-6">{scenario.description}</p>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/50">Severity:</span>
                      <span className="font-bold text-red-400">{scenario.severity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Recovery Chance:</span>
                      <span className="font-bold text-green-400">{scenario.recoveryRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Time Window:</span>
                      <span className="font-bold text-orange-400">{scenario.timeframe}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 24/7 Features & Stats */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Why Choose Our 24/7 Emergency Service?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-red-950/40 to-black border border-red-900/30 text-center">
              <Clock className="w-16 h-16 mx-auto mb-6 text-red-400" />
              <h3 className="text-2xl font-bold mb-4">True 24/7 Coverage</h3>
              <p className="text-white/70">
                Nights, weekends, holidays — live emergency team always available. Average first response under 30 minutes.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-950/40 to-black border border-orange-900/30 text-center">
              <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-400 animate-pulse" />
              <h3 className="text-2xl font-bold mb-4">Priority Escalation</h3>
              <p className="text-white/70">
                Direct contacts with tier-2/3 support at major exchanges, NFT marketplaces & protocols for fastest possible action.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-950/40 to-black border border-amber-900/30 text-center">
              <Shield className="w-16 h-16 mx-auto mb-6 text-green-400" />
              <h3 className="text-2xl font-bold mb-4">Success-Based Pricing</h3>
              <p className="text-white/70">
                Pay only if we recover funds/assets. No upfront fees for genuine emergency cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms for Urgent Cases */}
      <section className="relative py-16 sm:py-20 bg-zinc-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-12">
            Platforms We Can Act On Immediately
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
            {supportedPlatforms.map((plat, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-red-900/20 hover:border-red-500/40 transition-all text-center group hover:scale-105"
              >
                <div className="text-4xl mb-3">{plat.logo}</div>
                <div className="font-semibold text-white">{plat.name}</div>
                <div className="text-xs text-red-400 mt-1">Emergency Supported</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-white/70 mb-6">
              Not listed? We maintain emergency contacts for 30+ platforms — submit your case for instant assessment.
            </p>
            <Link
              href="/contact?type=urgent"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-red-600/30"
            >
              <Rocket className="w-6 h-6" />
              START EMERGENCY RECOVERY
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 sm:py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-12">
            Urgent Recovery FAQs
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden border border-red-900/30 bg-gradient-to-br from-zinc-900 to-black"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-red-950/30 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-white pr-8">{faq.question}</h3>
                    <ChevronRight
                      className={`w-7 h-7 text-red-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-90' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Emergency CTA */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-black to-red-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/20 border border-red-400/30 text-red-300 font-semibold animate-pulse">
              <AlertTriangle className="w-5 h-5" />
              EMERGENCY RESPONSE TEAM STANDING BY
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            Don't Wait – Your Assets Are At Risk
          </h2>

          <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
            Every minute counts in active theft, fresh compromise, or time-critical situations.
            Our 24/7 emergency team is ready right now.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact?type=urgent"
              className="inline-flex items-center justify-center gap-4 px-10 py-6 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white font-bold text-xl rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-red-600/50 animate-pulse"
            >
              <Phone className="w-7 h-7" />
              CALL EMERGENCY LINE NOW
            </Link>

            <a
              href="tel:+1800RECOVER"
              className="inline-flex items-center justify-center gap-4 px-10 py-6 border-2 border-red-400/50 text-red-300 font-bold text-xl rounded-2xl hover:bg-red-950/30 transition-all backdrop-blur-sm"
            >
              <Headphones className="w-7 h-7" />
              +1 (800) RECOVER
            </a>
          </div>

          <p className="mt-10 text-white/60 text-lg">
            Average first response time: <span className="text-red-400 font-bold">&lt; 30 minutes</span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default UrgentRecoveryPage;