"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRightLeft,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  FileText,
  Ban,
  XCircle,
  HelpCircle,
  ChevronRight,
  Wallet,
  Send,
  RefreshCw,
  Info,
  Shield,
  Award,
  Activity,
  Search
} from "lucide-react";

// Wrong transfer scenarios
const wrongTransferScenarios = [
  {
    icon: ArrowRightLeft,
    title: "Wrong Network / Chain Mismatch",
    description: "Sent token to correct address but wrong blockchain (e.g., USDT ERC20 → BEP20 or Solana). Often recoverable if recipient controls both networks.",
    severity: "Medium",
    recoveryRate: "60-85%",
    timeframe: "3-21 days",
    commonCauses: ["Network confusion", "Copy-paste error", "Unsupported chain selection"],
  },
  {
    icon: Send,
    title: "Sent to Wrong Address (Valid but Unknown)",
    description: "Funds sent to incorrect but valid wallet address owned by stranger. Irreversible unless recipient voluntarily returns.",
    severity: "Critical",
    recoveryRate: "5-15%",
    timeframe: "N/A - Usually permanent",
    commonCauses: ["Typo in address", "Clipboard malware swap", "Phishing address"],
  },
  {
    icon: Wallet,
    title: "Missing Memo/Tag/Destination Tag",
    description: "Sent to exchange (Binance, Kraken, etc.) without required memo/tag. Exchange may recover if you prove ownership.",
    severity: "High",
    recoveryRate: "70-90%",
    timeframe: "7-30 days",
    commonCauses: ["Forgot memo", "Exchange-specific requirement ignored"],
  },
  {
    icon: AlertTriangle,
    title: "Sent to Contract / Burn Address",
    description: "Funds sent to smart contract or known burn address. Almost never recoverable without special protocol support.",
    severity: "Very High",
    recoveryRate: "0-10%",
    timeframe: "N/A",
    commonCauses: ["Wrong token contract copy", "Fake address scam"],
  },
  {
    icon: RefreshCw,
    title: "Wrong Token / Similar Symbol Confusion",
    description: "Sent one token to address expecting another (e.g., fake USDT scam). Recovery depends on recipient cooperation.",
    severity: "High",
    recoveryRate: "20-50%",
    timeframe: "5-45 days",
    commonCauses: ["Scam token confusion", "Symbol similarity"],
  },
  {
    icon: FileText,
    title: "Deceased / Inherited Wrong Transfer",
    description: "Funds mis-sent from/to estate wallet. Requires legal + technical recovery.",
    severity: "Very High",
    recoveryRate: "30-60%",
    timeframe: "30-120 days",
    commonCauses: ["No documentation", "Family access issues"],
  },
];

// Supported platforms / chains (focus on common mistake-prone ones)
const supportedPlatforms = [
  { name: "Binance", logo: "🟡", tier: "Exchange", supported: true },
  { name: "Coinbase", logo: "🔵", tier: "Exchange", supported: true },
  { name: "Ethereum", logo: "⟠", tier: "Chain", supported: true },
  { name: "BSC", logo: "🟢", tier: "Chain", supported: true },
  { name: "Solana", logo: "☀️", tier: "Chain", supported: true },
  { name: "Tron", logo: "🔴", tier: "Chain", supported: true },
  { name: "Ripple/XRP", logo: "X", tier: "Chain", supported: true },
  { name: "Kraken", logo: "🐙", tier: "Exchange", supported: true },
  // Add more
];

// Recovery steps
const recoverySteps = [
  {
    number: "01",
    title: "Transaction Analysis",
    description: "Review tx hash, trace on explorer, identify exact mistake (network, memo, address type).",
    icon: Search,
  },
  {
    number: "02",
    title: "Proof Collection",
    description: "Gather screenshots, original intended address, ownership docs, tx proofs for support claims.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Recipient / Exchange Contact",
    description: "Reach out to recipient (if known) or file detailed recovery request with exchange/support team.",
    icon: Send,
  },
  {
    number: "04",
    title: "Escalation & Forensics",
    description: "Escalate via our contacts; for wrong network cases, guide multi-chain wallet import or contract interaction.",
    icon: Activity,
  },
  {
    number: "05",
    title: "Fund Retrieval & Security",
    description: "Coordinate return, secure new addresses, advise on prevention (double-check, test sends).",
    icon: Unlock,
  },
];

// Common issues table data
const commonIssues = [
  {
    issue: "Wrong network (ERC20 → BEP20)",
    difficulty: "Medium",
    time: "3-14 days",
    solution: "Import seed to multi-chain wallet or exchange recovery",
  },
  {
    issue: "Missing memo/tag on exchange",
    difficulty: "Medium",
    time: "7-30 days",
    solution: "Submit ownership proof to exchange",
  },
  {
    issue: "Wrong address (unknown owner)",
    difficulty: "Very Hard",
    time: "Permanent loss likely",
    solution: "Contact if identifiable; otherwise impossible",
  },
  {
    issue: "Sent to burn/contract address",
    difficulty: "Very Hard",
    time: "Usually impossible",
    solution: "Rare protocol rollback (almost never)",
  },
  {
    issue: "Wrong token to exchange deposit",
    difficulty: "Hard",
    time: "10-45 days",
    solution: "Exchange manual credit after verification",
  },
];

// FAQs
const faqs = [
  {
    question: "Can I recover crypto sent to the wrong address?",
    answer:
      "It depends on the mistake. Pure wrong address (typo, unknown owner) is usually permanent — blockchain transactions are irreversible. However, wrong network mismatches, missing memos on exchanges, or sends to your own/other known wallets often have good recovery chances (60-90%) with proper escalation.",
  },
  {
    question: "I sent to the wrong network — is it recoverable?",
    answer:
      "Yes, this is one of the most common recoverable cases. If the recipient controls the address on multiple chains (or it's your wallet), import your seed phrase into a compatible wallet (MetaMask + networks, Trust Wallet, etc.) to access and move funds back. Exchanges may help if deposited incorrectly.",
  },
  {
    question: "Forgot memo/tag when depositing to exchange?",
    answer:
      "Many exchanges (Binance, Kraken, etc.) can recover with strong proof of ownership (tx hash, account details, KYC). Success rate high (70-90%) but takes 1-4 weeks. We help prepare and escalate tickets.",
  },
  {
    question: "Sent to a completely wrong stranger's address?",
    answer:
      "Unfortunately, very low chance. Crypto is designed to be irreversible. Only possible if recipient voluntarily returns (rare) or address is identifiable and legally pursued (very costly, low success).",
  },
  {
    question: "How much do you charge for wrong transfer recovery?",
    answer:
      "10-25% of recovered amount depending on complexity (lower for exchange/memo cases, higher for cross-chain forensics). No recovery = no fee. Fixed fees (~$400+) for simple guidance cases.",
  },
  {
    question: "What if I sent to a burn or contract address?",
    answer:
      "Almost always lost permanently — no private key exists for burn addresses. Some rare cases (protocol bugs) have been recovered historically, but don't count on it.",
  },
];

const WrongTransferRecoveryPage = () => {
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
        <div className="absolute top-0 left-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/50 mb-6 sm:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <Link href="/recovery-services" className="hover:text-white transition-colors">Recovery Services</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-white">Wrong Transfer Recovery</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
                <ArrowRightLeft className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                <span className="text-xs sm:text-sm text-amber-300 font-medium">Wrong Transfer Recovery</span>
              </div>

              <h1
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                itemProp="name"
              >
                <span className="text-white">Wrong Crypto Transfer</span>
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                  Recovery Services
                </span>
              </h1>

              <p
                className="text-sm xs:text-base sm:text-lg md:text-xl text-white/60 mb-6 sm:mb-8 leading-relaxed"
                itemProp="description"
              >
                Sent crypto to wrong address, wrong network, or forgot memo/tag? We specialize in analyzing transfers, escalating with exchanges, and guiding cross-chain recovery where possible. Highest success in memo/exchange & network mismatch cases.
              </p>

              <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-400/30 mb-6 sm:mb-8">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-white mb-1">Act Fast – Details Matter</div>
                    <div className="text-xs sm:text-sm text-white/70">
                      Provide tx hash immediately. Wrong network & exchange cases often recoverable; pure wrong address usually not.
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-amber-400 mb-1">50-85%</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Success (Recoverable Cases)</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-amber-400 mb-1">Major Chains</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Supported</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-amber-400 mb-1">3-30 Days</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Avg Time</div>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base shadow-lg shadow-amber-500/25"
                >
                  Start Recovery Check
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="#platforms"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  Supported Chains & Exchanges
                </Link>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6">
                <a href="tel:+1-800-RECOVER" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  <span>+1 (800) RECOVER</span>
                </a>
                <a href="mailto:wrongtransfer@walletrecover.com" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  <span>wrongtransfer@walletrecover.com</span>
                </a>
              </div>
            </div>

            {/* Right: Issue Checker */}
            <div className="relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">
                  Common Wrong Transfer Issues
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <ArrowRightLeft className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">Wrong Network</div>
                        <div className="text-xs sm:text-sm text-white/60">60-85% • 3-21 days</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">Missing Memo/Tag</div>
                        <div className="text-xs sm:text-sm text-white/60">70-90% • 7-30 days</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <Ban className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">Wrong Address (Unknown)</div>
                        <div className="text-xs sm:text-sm text-white/60">5-15% • Usually Lost</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">To Burn/Contract</div>
                        <div className="text-xs sm:text-sm text-white/60">0-10% • Permanent</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="mt-6 sm:mt-8 w-full inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-sm sm:text-base"
                >
                  Check Your Transfer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wrong Transfer Scenarios */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Wrong Transfer Scenarios
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60 max-w-3xl mx-auto">
              We evaluate and pursue recovery based on the type of transfer error
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {wrongTransferScenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <article
                  key={index}
                  className="p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-amber-500/10 transition-all hover:scale-105"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4 sm:mb-5">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
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
                      <span
                        className={`
                          font-semibold
                          ${scenario.severity === 'Critical' ? 'text-red-400' :
                            scenario.severity === 'Very High' ? 'text-orange-400' :
                            scenario.severity === 'High' ? 'text-yellow-400' :
                            'text-amber-400'}
                        `}
                      >
                        {scenario.severity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Recovery Rate:</span>
                      <span className="text-green-400 font-semibold">{scenario.recoveryRate}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Timeframe:</span>
                      <span className="text-amber-400 font-semibold">{scenario.timeframe}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-xs sm:text-sm text-white/50 mb-2">Common Causes:</div>
                    <div className="space-y-1">
                      {scenario.commonCauses.map((cause, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                          <div className="w-1 h-1 rounded-full bg-amber-400" />
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

      {/* Supported Platforms */}
      <section id="platforms" className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Supported Chains & Exchanges
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              We assist with wrong transfers involving major chains and platforms
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {supportedPlatforms.map((plat, index) => (
              <div
                key={index}
                className="group p-4 sm:p-5 rounded-xl border bg-gradient-to-br from-white/5 to-white/0 border-white/10 hover:border-amber-400/30 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{plat.logo}</div>
                  <div className="text-xs sm:text-sm font-semibold text-white mb-1">{plat.name}</div>
                  <div className="text-[10px] xs:text-xs text-white/50">{plat.tier}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/20 text-center">
            <p className="text-sm sm:text-base text-white/80 mb-4">
              Not listed? We handle most major chains & exchanges — ask us.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-amber-400 hover:text-amber-300 transition-colors"
            >
              Check your case
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
              Recovery Likelihood by Issue
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Estimated chances and timelines for common wrong transfer mistakes
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Issue Type</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Difficulty</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Timeline</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Solution Approach</th>
                </tr>
              </thead>
              <tbody>
                {commonIssues.map((item, index) => (
                  <tr key={index} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-xs sm:text-sm text-white/80">{item.issue}</td>
                    <td className="px-4 py-3">
                      <span className={`
                        px-2 py-1 rounded text-[10px] xs:text-xs font-semibold
                        ${item.difficulty === 'Medium' ? 'bg-amber-400/10 text-amber-400' :
                          item.difficulty.includes('Hard') ? 'bg-orange-400/10 text-orange-400' :
                          'bg-red-400/10 text-red-400'}
                      `}>
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-amber-400">{item.time}</td>
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
              Our Wrong Transfer Recovery Process
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Step-by-step analysis and escalation for maximum chance of success
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-orange-500/50 to-amber-500/50" aria-hidden="true" />
            <div className="space-y-6 sm:space-y-8">
              {recoverySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex gap-4 sm:gap-6 group">
                    <div className="relative flex-shrink-0 z-10">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border-4 border-black">
                        <Icon className="w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 text-white" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-black border-2 border-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-bold text-white/80">{step.number}</span>
                      </div>
                    </div>
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

      {/* FAQ Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Answers to common questions about wrong crypto transfers
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
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-amber-400 flex-shrink-0 transition-transform ${
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
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-400/20 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/10 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" aria-hidden="true" />

            <div className="relative">
              <ArrowRightLeft className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Recover Your Mis-sent Crypto
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-white/60 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Wrong network, missing memo, or address error — don't assume it's gone forever. Submit your tx details for a free assessment today.
              </p>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
                >
                  Submit Tx for Review
                </Link>
                <a
                  href="tel:+1-800-RECOVER"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Specialist
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>High Success in Memo/Network Cases</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Major Chains & Exchanges</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>No Recovery = No Fee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WrongTransferRecoveryPage;