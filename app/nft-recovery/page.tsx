"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Gem,
  Shield,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  FileText,
  Ban,
  Fingerprint,
  XCircle,
  HelpCircle,
  ChevronRight,
  Wallet,
  Image as ImageIcon,
  Activity,
  Search,
  AlertCircle,
  Info,
  Award,
} from "lucide-react";

// NFT recovery scenarios
const nftScenarios = [
  {
    icon: AlertTriangle,
    title: "Stolen / Drained NFTs",
    description: "NFTs transferred without authorization due to phishing, malicious signature, wallet compromise or drainer contract.",
    severity: "Critical",
    recoveryRate: "15-45%",
    timeframe: "Hours to 90 days",
    commonCauses: ["Phishing mint sites", "Fake OpenSea links", "Malicious approvals"],
  },
  {
    icon: Fingerprint,
    title: "Compromised Minting Wallet",
    description: "Primary wallet used for minting was hacked, leading to theft of newly minted or held NFTs.",
    severity: "High",
    recoveryRate: "20-50%",
    timeframe: "1-60 days",
    commonCauses: ["Seed exposure", "Clipboard hijack", "Compromised browser"],
  },
  {
    icon: Ban,
    title: "Unauthorized Marketplace Transfer",
    description: "NFT listed/sold on fake marketplace or transferred after approving malicious contract.",
    severity: "High",
    recoveryRate: "25-55%",
    timeframe: "3-45 days",
    commonCauses: ["Fake listing sites", "Unlimited approvals", "Rug pull contracts"],
  },
  {
    icon: ImageIcon,
    title: "Wrong Contract / Fake NFT Mint",
    description: "Minted or received counterfeit NFTs or sent ETH to scam contract instead of real collection.",
    severity: "Medium-High",
    recoveryRate: "10-40%",
    timeframe: "5-60 days",
    commonCauses: ["Impersonator collections", "Copy-paste contract address error"],
  },
  {
    icon: Wallet,
    title: "NFT Sent to Wrong Wallet / Burn Address",
    description: "Transferred NFT to incorrect address or burn function by mistake.",
    severity: "Very High",
    recoveryRate: "5-25%",
    timeframe: "Usually permanent",
    commonCauses: ["Address typo", "Wrong recipient copy"],
  },
  {
    icon: FileText,
    title: "Deceased Owner NFT Access / Recovery",
    description: "Need to recover or prove ownership of NFTs from deceased person's wallet.",
    severity: "Very High",
    recoveryRate: "30-65%",
    timeframe: "30-120 days",
    commonCauses: ["No shared seed", "Legal inheritance required"],
  },
];

// Supported marketplaces & chains
const supportedPlatforms = [
  { name: "OpenSea", logo: "🌊", tier: "Marketplace", supported: true },
  { name: "Blur", logo: "⚡", tier: "Marketplace", supported: true },
  { name: "Magic Eden", logo: "🪄", tier: "Solana", supported: true },
  { name: "Tensor", logo: "📈", tier: "Solana", supported: true },
  { name: "Ethereum", logo: "⟠", tier: "Chain", supported: true },
  { name: "Solana", logo: "☀️", tier: "Chain", supported: true },
  { name: "Polygon", logo: "⬣", tier: "Chain", supported: true },
  { name: "Bitcoin Ordinals", logo: "₿", tier: "Chain", supported: true },
];

// Recovery process steps
const recoverySteps = [
  {
    number: "01",
    title: "Incident Forensics",
    description: "Analyze transaction history, approvals, signatures, phishing vectors, and trace stolen NFTs across chains/marketplaces.",
    icon: Search,
  },
  {
    number: "02",
    title: "Evidence & Ownership Proof",
    description: "Collect wallet proofs, mint txs, original purchase receipts, metadata, IP logs, and any KYC-linked marketplace data.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Marketplace & Protocol Escalation",
    description: "File urgent reports with OpenSea, Blur, Magic Eden, etc., and coordinate with chain/protocol teams when applicable.",
    icon: Activity,
  },
  {
    number: "04",
    title: "Freeze & Legal Coordination",
    description: "Request freezes on marketplaces/exchanges where NFTs land; prepare reports for law enforcement if value justifies.",
    icon: Shield,
  },
  {
    number: "05",
    title: "Secure Recovery & Hardening",
    description: "If recovered, transfer to secure wallet, revoke approvals, implement hardware wallet + multi-sig for future protection.",
    icon: Unlock,
  },
];

// Common NFT issues
const commonIssues = [
  {
    issue: "Phishing / malicious signature drain",
    difficulty: "Medium-Hard",
    time: "Hours-30 days",
    solution: "Trace + marketplace freeze request",
  },
  {
    issue: "Unlimited approval exploit",
    difficulty: "Medium",
    time: "1-14 days",
    solution: "Revoke approvals + trace destination",
  },
  {
    issue: "Wallet seed compromise",
    difficulty: "Very Hard",
    time: "Immediate-90 days",
    solution: "On-chain tracing + legal escalation",
  },
  {
    issue: "Fake marketplace / listing scam",
    difficulty: "Hard",
    time: "5-45 days",
    solution: "Report to real marketplace + forensics",
  },
  {
    issue: "Sent to burn / wrong address",
    difficulty: "Very Hard",
    time: "Permanent loss likely",
    solution: "Rarely recoverable",
  },
];

// FAQs
const faqs = [
  {
    question: "Can stolen NFTs be recovered?",
    answer:
      "It depends on speed and destination. If NFTs land on centralized marketplaces (OpenSea, Blur) or exchanges, freezes and takedowns are possible (25-55% success in many cases). Pure on-chain theft with quick laundering or bridge mixing has very low recovery rates (<20%). Fast reporting is critical.",
  },
  {
    question: "My wallet approved a malicious contract and NFTs were drained — what now?",
    answer:
      "This is a common vector. We help trace approvals, identify the drainer, and escalate to marketplaces where NFTs may appear for sale. Revoking approvals immediately can stop further drains. Success often depends on whether thief tries to sell on monitored platforms.",
  },
  {
    question: "I clicked a phishing link and signed a transaction — can my NFTs be returned?",
    answer:
      "Possibly — if the NFTs are listed on OpenSea/Blur/Magic Eden, we can file DMCA-style takedown requests or coordinate freezes. Provide all transaction details and evidence of compromise. Time is the most important factor.",
  },
  {
    question: "How much do you charge for NFT recovery?",
    answer:
      "20-35% of recovered value (higher due to complexity and lower average success compared to custodial issues). No recovery = no fee. Fixed fees starting ~$750 for forensics/report preparation only.",
  },
  {
    question: "What if the NFT was minted on Solana or another chain?",
    answer:
      "We support Solana (Magic Eden, Tensor), Ethereum, Polygon, Bitcoin Ordinals, etc. Recovery paths differ per chain/marketplace — Solana cases often move faster due to lower fees but require similar escalation.",
  },
  {
    question: "Can you help if NFTs belonged to a deceased relative?",
    answer:
      "Yes — we assist with estate claims, proving ownership via mint records/purchases, and working with marketplaces/legal teams. Requires death certificate, will, and chain evidence.",
  },
];

const NFTRecoveryPage = () => {
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
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/50 mb-6 sm:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <Link href="/recovery-services" className="hover:text-white transition-colors">Recovery Services</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-white">NFT Recovery</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
                <Gem className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                <span className="text-xs sm:text-sm text-purple-300 font-medium">NFT Recovery Services</span>
              </div>

              <h1
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                itemProp="name"
              >
                <span className="text-white">Stolen or Lost NFT</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
                  Recovery Services
                </span>
              </h1>

              <p
                className="text-sm xs:text-base sm:text-lg md:text-xl text-white/60 mb-6 sm:mb-8 leading-relaxed"
                itemProp="description"
              >
                NFTs stolen, drained via phishing, malicious approvals, or wallet compromise? We provide urgent forensics, marketplace escalation, and freeze coordination for OpenSea, Blur, Magic Eden, and more. Fast action dramatically improves chances.
              </p>

              <div className="p-4 sm:p-5 rounded-xl bg-purple-500/10 border border-purple-400/30 mb-6 sm:mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-white mb-1">Time Is Critical</div>
                    <div className="text-xs sm:text-sm text-white/70">
                      NFTs can be sold or bridged within minutes. Report immediately to maximize freeze/takedown potential.
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-purple-400 mb-1">15-55%</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Success Range</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-purple-400 mb-1">Major Platforms</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Supported</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-purple-400 mb-1">Urgent</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Response</div>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base shadow-lg shadow-purple-500/25"
                >
                  Report Stolen NFT Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="#platforms"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  Supported Marketplaces
                </Link>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6">
                <a href="tel:+1-800-RECOVER" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span>+1 (800) RECOVER</span>
                </a>
                <a href="mailto:nft@walletrecover.com" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span>nft@walletrecover.com</span>
                </a>
              </div>
            </div>

            {/* Right: Common Issues Checker */}
            <div className="relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-500/10 to-violet-500/10 backdrop-blur-sm p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">
                  Common NFT Theft Scenarios
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">Phishing Drain</div>
                        <div className="text-xs sm:text-sm text-white/60">15-45% • Act Fast</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <Ban className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">Malicious Approval</div>
                        <div className="text-xs sm:text-sm text-white/60">25-55% • Freeze Possible</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">Wallet Compromise</div>
                        <div className="text-xs sm:text-sm text-white/60">20-50% • Trace Dependent</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">Fake Mint / Scam</div>
                        <div className="text-xs sm:text-sm text-white/60">10-40% • Marketplace Report</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-6 sm:mt-8 w-full inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-sm sm:text-base"
                >
                  Check Your NFT Case
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NFT Recovery Scenarios */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              NFT Recovery Scenarios
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60 max-w-3xl mx-auto">
              We handle various types of NFT theft and unauthorized transfers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {nftScenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <article
                  key={index}
                  className="p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all hover:scale-105"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center mb-4 sm:mb-5">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
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
                      <span className={`font-semibold ${scenario.severity.includes('Critical') ? 'text-red-400' : scenario.severity === 'Very High' ? 'text-orange-400' : 'text-yellow-400'}`}>
                        {scenario.severity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Recovery Chance:</span>
                      <span className="text-green-400 font-semibold">{scenario.recoveryRate}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Timeframe:</span>
                      <span className="text-purple-400 font-semibold">{scenario.timeframe}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-xs sm:text-sm text-white/50 mb-2">Common Causes:</div>
                    <div className="space-y-1">
                      {scenario.commonCauses.map((cause, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                          <div className="w-1 h-1 rounded-full bg-purple-400" />
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
              Supported Marketplaces & Chains
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              We work with major NFT platforms and blockchains
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {supportedPlatforms.map((plat, index) => (
              <div
                key={index}
                className="group p-4 sm:p-5 rounded-xl border bg-gradient-to-br from-white/5 to-white/0 border-white/10 hover:border-purple-400/30 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{plat.logo}</div>
                  <div className="text-xs sm:text-sm font-semibold text-white mb-1">{plat.name}</div>
                  <div className="text-[10px] xs:text-xs text-white/50">{plat.tier}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-400/20 text-center">
            <p className="text-sm sm:text-base text-white/80 mb-4">
              Your collection/marketplace not listed? We support most major NFT ecosystems — contact us.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-purple-400 hover:text-purple-300 transition-colors">
              Ask about your NFTs
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
              Estimated chances and timelines for common NFT theft scenarios
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Issue Type</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Difficulty</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Timeline</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Typical Approach</th>
                </tr>
              </thead>
              <tbody>
                {commonIssues.map((item, index) => (
                  <tr key={index} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-xs sm:text-sm text-white/80">{item.issue}</td>
                    <td className="px-4 py-3">
                      <span className={`
                        px-2 py-1 rounded text-[10px] xs:text-xs font-semibold
                        ${item.difficulty.includes('Medium') ? 'bg-yellow-400/10 text-yellow-400' :
                          item.difficulty.includes('Hard') ? 'bg-orange-400/10 text-orange-400' :
                          'bg-red-400/10 text-red-400'}
                      `}>
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-purple-400">{item.time}</td>
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
              Our NFT Recovery Process
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Forensic tracing to marketplace escalation — step by step
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-violet-500/50 to-purple-500/50" aria-hidden="true" />
            <div className="space-y-6 sm:space-y-8">
              {recoverySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex gap-4 sm:gap-6 group">
                    <div className="relative flex-shrink-0 z-10">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border-4 border-black">
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

      {/* FAQ */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Common questions about stolen or compromised NFT recovery
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
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 transition-transform ${
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
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-400/20 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-purple-500/10 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5" aria-hidden="true" />

            <div className="relative">
              <Gem className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Recover Your Stolen NFTs
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-white/60 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Phishing, drainer, or wallet hack — don't let thieves profit. Our team specializes in NFT tracing, marketplace escalation, and freeze requests.
              </p>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
                >
                  Start NFT Recovery
                </Link>
                <a
                  href="tel:+1-800-RECOVER"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Speak to Specialist
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Marketplace Freeze Expertise</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>Major Chains & Platforms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" />
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

export default NFTRecoveryPage;