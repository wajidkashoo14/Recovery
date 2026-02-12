"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2,
  Shield,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  FileText,
  UserCheck,
  Ban,
  CreditCard,
  Activity,
  Award,
  Star,
  ChevronRight,
  DollarSign,
  Target,
  AlertTriangle,
  Info,
  Search,
  Fingerprint,
  Globe,
  ArrowUpDown,
  XCircle,
  HelpCircle
} from "lucide-react";

// Exchange recovery scenarios
const exchangeScenarios = [
  {
    icon: Lock,
    title: "Account Locked or Frozen",
    description: "Your exchange account has been locked, frozen, or suspended. We help restore access through proper channels and compliance procedures.",
    severity: "High",
    recoveryRate: "85%",
    timeframe: "7-21 days",
    commonCauses: ["KYC issues", "Suspicious activity flags", "Compliance holds"],
  },
  {
    icon: Ban,
    title: "Withdrawal Restrictions",
    description: "Unable to withdraw funds due to restrictions, holds, or verification requirements. We facilitate resolution with exchange support teams.",
    severity: "High",
    recoveryRate: "90%",
    timeframe: "5-14 days",
    commonCauses: ["Verification needed", "Security holds", "Large withdrawals"],
  },
  {
    icon: UserCheck,
    title: "KYC/Verification Problems",
    description: "Stuck in KYC verification, documents rejected, or unable to complete identity verification preventing account access.",
    severity: "Medium",
    recoveryRate: "95%",
    timeframe: "3-10 days",
    commonCauses: ["Document issues", "Address mismatch", "Photo quality"],
  },
  {
    icon: XCircle,
    title: "Failed Deposits or Withdrawals",
    description: "Deposits not credited or withdrawals not received. We trace transactions and coordinate with exchange support for resolution.",
    severity: "High",
    recoveryRate: "92%",
    timeframe: "5-15 days",
    commonCauses: ["Wrong memo/tag", "Network issues", "Processing delays"],
  },
  {
    icon: AlertTriangle,
    title: "Closed Exchange Recovery",
    description: "Exchange shut down, declared bankruptcy, or ceased operations. We assist with asset claims and recovery processes.",
    severity: "Critical",
    recoveryRate: "45%",
    timeframe: "30-90 days",
    commonCauses: ["Bankruptcy", "Regulatory shutdown", "Exit scams"],
  },
  {
    icon: FileText,
    title: "Deceased Account Access",
    description: "Need to recover assets from a deceased person's exchange account. We navigate inheritance and legal requirements.",
    severity: "Very High",
    recoveryRate: "70%",
    timeframe: "21-60 days",
    commonCauses: ["Estate claims", "Legal documentation", "Next of kin verification"],
  },
];

// Major exchanges supported
const majorExchanges = [
  { name: "Binance", logo: "🟡", tier: "Tier 1", volume: "$76B", supported: true },
  { name: "Coinbase", logo: "🔵", tier: "Tier 1", volume: "$2.8B", supported: true },
  { name: "Kraken", logo: "🐙", tier: "Tier 1", volume: "$1.2B", supported: true },
  { name: "OKX", logo: "⚫", tier: "Tier 1", volume: "$12B", supported: true },
  { name: "Bybit", logo: "🟠", tier: "Tier 1", volume: "$8.5B", supported: true },
  { name: "KuCoin", logo: "🟢", tier: "Tier 1", volume: "$2.4B", supported: true },
  { name: "Bitfinex", logo: "🟢", tier: "Tier 2", volume: "$400M", supported: true },
  { name: "Gemini", logo: "🔷", tier: "Tier 2", volume: "$120M", supported: true },
  { name: "Crypto.com", logo: "🔷", tier: "Tier 1", volume: "$950M", supported: true },
  { name: "Gate.io", logo: "🟣", tier: "Tier 2", volume: "$1.8B", supported: true },
  { name: "Huobi", logo: "🔴", tier: "Tier 2", volume: "$800M", supported: true },
  { name: "Bittrex", logo: "🔵", tier: "Tier 2", volume: "$50M", supported: true },
];

// Recovery process steps
const recoverySteps = [
  {
    number: "01",
    title: "Case Documentation",
    description: "We gather all relevant information: account details, transaction history, communication records with exchange, and supporting documents.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Exchange Contact & Escalation",
    description: "Our team contacts exchange support on your behalf, escalates to management, and leverages our relationships with major platforms.",
    icon: Activity,
  },
  {
    number: "03",
    title: "Compliance & Verification",
    description: "We help prepare proper KYC documents, compliance information, and address any regulatory or security concerns raised by the exchange.",
    icon: UserCheck,
  },
  {
    number: "04",
    title: "Legal Support (If Needed)",
    description: "For complex cases, we coordinate with legal counsel to send formal demands, file complaints with regulators, or pursue legal action.",
    icon: Shield,
  },
  {
    number: "05",
    title: "Account Restoration",
    description: "Once resolved, we ensure full account access is restored and help you safely withdraw funds to a secure wallet or new exchange.",
    icon: Unlock,
  },
];

// Common exchange issues
const commonIssues = [
  {
    issue: "2FA lost/phone changed",
    difficulty: "Easy",
    time: "1-3 days",
    solution: "Account recovery process",
  },
  {
    issue: "KYC documents rejected",
    difficulty: "Easy",
    time: "2-5 days",
    solution: "Proper document preparation",
  },
  {
    issue: "Account locked - suspicious activity",
    difficulty: "Medium",
    time: "7-14 days",
    solution: "Proof of ownership verification",
  },
  {
    issue: "Withdrawal over daily limit",
    difficulty: "Easy",
    time: "1-7 days",
    solution: "Limit increase request",
  },
  {
    issue: "Deposit not credited (wrong memo)",
    difficulty: "Medium",
    time: "5-15 days",
    solution: "Manual credit request with proof",
  },
  {
    issue: "Account frozen - compliance",
    difficulty: "Hard",
    time: "14-30 days",
    solution: "Compliance documentation",
  },
  {
    issue: "Deceased account access",
    difficulty: "Very Hard",
    time: "30-60 days",
    solution: "Estate & legal process",
  },
  {
    issue: "Exchange bankruptcy",
    difficulty: "Very Hard",
    time: "60-180 days",
    solution: "Creditor claims process",
  },
];

// FAQs
const faqs = [
  {
    question: "Can you help if my exchange account is frozen?",
    answer: "Yes, we specialize in frozen and locked exchange accounts. We have a 85% success rate working with major exchanges like Binance, Coinbase, and Kraken to restore account access. The process typically takes 7-21 days depending on the reason for the freeze.",
  },
  {
    question: "What if I can't withdraw my funds from an exchange?",
    answer: "Withdrawal restrictions are common and usually due to KYC requirements, security holds, or compliance checks. We have a 90% success rate resolving withdrawal issues within 5-14 days by working directly with exchange support and compliance teams.",
  },
  {
    question: "My KYC verification keeps getting rejected. Can you help?",
    answer: "Yes, KYC rejection is one of our most common cases with a 95% success rate. We help prepare proper documentation, ensure photo quality meets requirements, and address common issues like address mismatches or document authenticity concerns.",
  },
  {
    question: "Can you recover funds from a closed exchange?",
    answer: "We assist with bankruptcy claims and recovery processes for closed exchanges like FTX, Celsius, and others. Success rate is lower (45%) and timeframe longer (30-90 days), but we help navigate creditor claims and legal proceedings.",
  },
  {
    question: "I lost my 2FA device. Can you help recover my account?",
    answer: "Yes, lost 2FA is one of the easiest cases we handle. Most exchanges have recovery procedures that require identity verification. We guide you through the process, which typically takes 1-3 days for major exchanges.",
  },
  {
    question: "What if the exchange is ignoring my support tickets?",
    answer: "This is extremely common. We have direct contacts with tier-2 and tier-3 support at major exchanges and can escalate cases that are stuck in standard support queues. Our industry relationships often resolve cases that have been pending for months.",
  },
  {
    question: "How much do you charge for exchange recovery?",
    answer: "We charge 15% of recovered funds for exchange cases. This is lower than our standard rate due to higher success rates. For KYC-only issues, we offer fixed pricing starting at $500. No recovery, no fee - you only pay if we successfully restore access.",
  },
  {
    question: "Can you help recover a deceased person's exchange account?",
    answer: "Yes, we handle estate claims and deceased account recovery. This requires legal documentation (death certificate, will, proof of inheritance) and has a 70% success rate. The process takes 21-60 days and involves working with exchange legal teams.",
  },
];

const ExchangeRecoveryPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null);

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
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/50 mb-6 sm:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <Link href="/recovery-services" className="hover:text-white transition-colors">Recovery Services</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-white">Exchange Recovery</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
                <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-xs sm:text-sm text-blue-300 font-medium">Exchange Account Recovery</span>
              </div>
              
              <h1 
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                itemProp="name"
              >
                <span className="text-white">Cryptocurrency Exchange</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                  Account Recovery
                </span>
              </h1>
              
              <p 
                className="text-sm xs:text-base sm:text-lg md:text-xl text-white/60 mb-6 sm:mb-8 leading-relaxed"
                itemProp="description"
              >
                Account locked? Withdrawals frozen? KYC problems? We specialize in recovering access to 
                frozen exchange accounts, resolving withdrawal issues, and navigating compliance problems. 
                85% success rate with major exchanges.
              </p>

              {/* Alert Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-blue-500/10 border border-blue-400/30 mb-6 sm:mb-8">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-white mb-1">Industry Relationships</div>
                    <div className="text-xs sm:text-sm text-white/70">
                      We have direct contacts with compliance and support teams at major exchanges, 
                      enabling faster resolution of stuck cases.
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-blue-400 mb-1">85%</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Success Rate</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-blue-400 mb-1">12+</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Exchanges</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-blue-400 mb-1">7-21</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Days Avg</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base shadow-lg shadow-blue-500/25"
                >
                  Get Account Access Back
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="#exchanges"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  View Supported Exchanges
                </Link>
              </div>

              {/* Contact Info */}
              <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6">
                <a href="tel:+1-800-RECOVER" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span>+1 (800) RECOVER</span>
                </a>
                <a href="mailto:exchange@walletrecover.com" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span>exchange@walletrecover.com</span>
                </a>
              </div>
            </div>

            {/* Right: Issue Checker */}
            <div className="relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm p-6 sm:p-8">
                
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">
                  Common Exchange Issues
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">Account Locked</div>
                        <div className="text-xs sm:text-sm text-white/60">85% success • 7-21 days</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <Ban className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">Can't Withdraw</div>
                        <div className="text-xs sm:text-sm text-white/60">90% success • 5-14 days</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">KYC Rejected</div>
                        <div className="text-xs sm:text-sm text-white/60">95% success • 3-10 days</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">Lost 2FA</div>
                        <div className="text-xs sm:text-sm text-white/60">98% success • 1-3 days</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-6 sm:mt-8 w-full inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-sm sm:text-base"
                >
                  Check Your Issue
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exchange Recovery Scenarios */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Exchange Recovery Scenarios
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60 max-w-3xl mx-auto">
              We handle all types of exchange account and withdrawal issues
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {exchangeScenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <article
                  key={index}
                  className="p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:scale-105"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-4 sm:mb-5">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {scenario.title}
                  </h3>
                  
                  <p className="text-xs xs:text-sm sm:text-base text-white/60 mb-4 sm:mb-5 leading-relaxed">
                    {scenario.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Severity:</span>
                      <span className={`
                        font-semibold
                        ${scenario.severity === 'Critical' ? 'text-red-400' :
                          scenario.severity === 'Very High' ? 'text-orange-400' :
                          scenario.severity === 'High' ? 'text-yellow-400' :
                          'text-green-400'}
                      `}>
                        {scenario.severity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Recovery Rate:</span>
                      <span className="text-green-400 font-semibold">{scenario.recoveryRate}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Timeframe:</span>
                      <span className="text-blue-400 font-semibold">{scenario.timeframe}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="text-xs sm:text-sm text-white/50 mb-2">Common Causes:</div>
                    <div className="space-y-1">
                      {scenario.commonCauses.map((cause, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                          <div className="w-1 h-1 rounded-full bg-blue-400" />
                          <span>{cause}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported Exchanges */}
      <section id="exchanges" className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Supported Exchanges
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              We work with all major cryptocurrency exchanges
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {majorExchanges.map((exchange, index) => (
              <div
                key={index}
                onClick={() => setSelectedExchange(selectedExchange === exchange.name ? null : exchange.name)}
                className={`
                  group p-4 sm:p-5 rounded-xl border transition-all cursor-pointer
                  ${selectedExchange === exchange.name
                    ? 'bg-blue-500/20 border-blue-400/50 shadow-lg shadow-blue-500/20'
                    : 'bg-gradient-to-br from-white/5 to-white/0 border-white/10 hover:border-blue-400/30 hover:bg-white/10'
                  }
                `}
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{exchange.logo}</div>
                  <div className="text-xs sm:text-sm font-semibold text-white mb-1">{exchange.name}</div>
                  <div className="text-[10px] xs:text-xs text-white/50 mb-1">{exchange.tier}</div>
                  {selectedExchange === exchange.name && (
                    <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                      <div className="text-[10px] xs:text-xs text-blue-400">
                        Vol: {exchange.volume}
                      </div>
                      <div className="text-[10px] xs:text-xs text-green-400">
                        ✓ Supported
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-400/20 text-center">
            <p className="text-sm sm:text-base text-white/80 mb-4">
              Exchange not listed? We work with 30+ exchanges including regional and smaller platforms.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Ask about your exchange
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Common Issues Table */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Recovery Timeframes by Issue
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Estimated resolution times for common exchange problems
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Issue Type</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Difficulty</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Timeline</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Solution</th>
                </tr>
              </thead>
              <tbody>
                {commonIssues.map((item, index) => (
                  <tr key={index} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-xs sm:text-sm text-white/80">{item.issue}</td>
                    <td className="px-4 py-3">
                      <span className={`
                        px-2 py-1 rounded text-[10px] xs:text-xs font-semibold
                        ${item.difficulty === 'Easy' ? 'bg-green-400/10 text-green-400' :
                          item.difficulty === 'Medium' ? 'bg-yellow-400/10 text-yellow-400' :
                          item.difficulty === 'Hard' ? 'bg-orange-400/10 text-orange-400' :
                          'bg-red-400/10 text-red-400'}
                      `}>
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-blue-400">{item.time}</td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-white/60">{item.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Recovery Process */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Our Recovery Process
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Professional escalation and exchange relationship management
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-indigo-500/50 to-blue-500/50" aria-hidden="true" />

            <div className="space-y-6 sm:space-y-8">
              {recoverySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex gap-4 sm:gap-6 group">
                    {/* Number Circle */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border-4 border-black">
                        <Icon className="w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 text-white" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-black border-2 border-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-bold text-white/80">{step.number}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6 sm:pb-8">
                      <div className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all">
                        <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                          {step.title}
                        </h3>
                        <p className="text-xs xs:text-sm sm:text-base text-white/60 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Common questions about exchange account recovery
            </p>
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
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-blue-500/10 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5" aria-hidden="true" />
            
            <div className="relative">
              <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Get Your Exchange Account Back
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-white/60 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Don't let a frozen account keep you from your funds. Our team has direct relationships 
                with major exchanges and can escalate your case to get results.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
                >
                  Start Recovery Process
                </Link>
                <a
                  href="tel:+1-800-RECOVER"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Speak to Expert
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>85% Success Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>12+ Exchanges</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-400" />
                  <span>15% Fee on Success</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default ExchangeRecoveryPage;