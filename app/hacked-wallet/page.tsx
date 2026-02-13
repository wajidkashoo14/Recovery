"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
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
  Ban,
  Fingerprint,
  XCircle,
  HelpCircle,
  Skull,
  Search,
  Activity,
  ChevronRight,
  Wallet,
} from "lucide-react";

// Hacked wallet scenarios (realistic based on industry data)
const hackedScenarios = [
  {
    icon: AlertTriangle,
    title: "Phishing / Fake Wallet Connect",
    description: "Tricked into signing malicious transaction or connecting to fake dApp/site draining funds.",
    severity: "High",
    recoveryRate: "25-45%",
    timeframe: "Hours to 30 days",
    commonCauses: ["Fake airdrop links", "Compromised Discord/Telegram", "Malicious wallet connect"],
  },
  {
    icon: Skull,
    title: "Seed Phrase / Private Key Compromised",
    description: "Seed phrase stolen via malware, keylogger, clipboard hijack, or exposed backup.",
    severity: "Critical",
    recoveryRate: "5-20%",
    timeframe: "Immediate to 60+ days",
    commonCauses: ["Infostealer malware", "Phishing emails", "Unsecured cloud backups"],
  },
  {
    icon: Fingerprint,
    title: "Malware / Clipboard Hijack",
    description: "Crypto clipper replaced wallet address during copy-paste, or trojan stole keys.",
    severity: "High",
    recoveryRate: "10-35%",
    timeframe: "1-45 days",
    commonCauses: ["Downloaded fake software", "Pirated tools", "Compromised browser extension"],
  },
  {
    icon: Ban,
    title: "Drainer / Scam Contract Approved",
    description: "Unlimited approval given to malicious smart contract draining wallet over time.",
    severity: "High",
    recoveryRate: "30-60%",
    timeframe: "Hours to 14 days",
    commonCauses: ["Fake NFT mint", "Rug pull sites", "DeFi scam approvals"],
  },
  {
    icon: Shield,
    title: "Exchange-Linked Wallet Hack",
    description: "Hot wallet or API key compromised on centralized platform or linked software wallet.",
    severity: "Medium-High",
    recoveryRate: "50-80%",
    timeframe: "3-30 days",
    commonCauses: ["API abuse", "Support phishing", "2FA bypass"],
  },
  {
    icon: FileText,
    title: "Deceased / Inherited Hacked Wallet",
    description: "Deceased user's wallet compromised or access needed after hack/theft.",
    severity: "Very High",
    recoveryRate: "15-40%",
    timeframe: "30-120 days",
    commonCauses: ["No secure inheritance plan", "Family disputes", "Post-mortem theft"],
  },
];

// Supported wallets & chains (non-custodial focus)
const supportedWallets = [
  { name: "MetaMask", logo: "🦊", tier: "Popular", supported: true },
  { name: "Trust Wallet", logo: "🔒", tier: "Mobile", supported: true },
  { name: "Phantom", logo: "👻", tier: "Solana", supported: true },
  { name: "Ledger", logo: "🔵", tier: "Hardware", supported: true },
  { name: "Trezor", logo: "🛡️", tier: "Hardware", supported: true },
  { name: "Exodus", logo: "🌌", tier: "Desktop", supported: true },
  { name: "Coinbase Wallet", logo: "🔷", tier: "Hybrid", supported: true },
  { name: "SafePal", logo: "🛡️", tier: "Hardware", supported: true },
  // Add more as needed
];

// Recovery process steps for hacked wallets
const recoverySteps = [
  {
    number: "01",
    title: "Incident Assessment",
    description: "Analyze transaction history, identify drain method, trace funds on-chain, determine if freeze/recovery window exists.",
    icon: Search,
  },
  {
    number: "02",
    title: "Evidence Collection",
    description: "Gather wallet addresses, tx hashes, screenshots, device logs, phishing links — build strong ownership & compromise proof.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Blockchain Forensics & Tracing",
    description: "Trace stolen funds through chains, mixers, bridges. Identify endpoints (exchanges, bridges) where funds may be freezable.",
    icon: Activity,
  },
  {
    number: "04",
    title: "Exchange / Chain Coordination",
    description: "File urgent reports with exchanges, protocols, law enforcement. Request freezes/seizures when funds land on compliant platforms.",
    icon: Shield,
  },
  {
    number: "05",
    title: "Secure Restoration & Prevention",
    description: "If partial funds recovered or access regained, secure new wallet, revoke approvals, set up hardware + multi-sig.",
    icon: Unlock,
  },
];

// Common hacked wallet issues
const commonIssues = [
  {
    issue: "Phishing signature / drain",
    difficulty: "Medium",
    time: "Hours-14 days",
    solution: "Trace & freeze on centralized endpoints",
  },
  {
    issue: "Seed phrase stolen",
    difficulty: "Very Hard",
    time: "Immediate-90 days",
    solution: "On-chain tracing + legal escalation",
  },
  {
    issue: "Malware clipper attack",
    difficulty: "Hard",
    time: "1-30 days",
    solution: "Victim tx proof + exchange reports",
  },
  {
    issue: "Unlimited contract approval",
    difficulty: "Medium",
    time: "Hours-7 days",
    solution: "Revoke approvals + trace drains",
  },
  {
    issue: "Hardware wallet compromise",
    difficulty: "Very Hard",
    time: "30-120 days",
    solution: "Physical + legal proof process",
  },
];

// FAQs — realistic answers
const faqs = [
  {
    question: "Can you recover funds from a hacked wallet?",
    answer:
      "It depends. If funds are still traceable and land on centralized exchanges or compliant bridges, freezes/recoveries are possible (25-60% in many cases). Full seed theft with quick laundering usually has low success (under 20%). We focus on fast action and forensics — time is critical.",
  },
  {
    question: "My wallet was drained via phishing — what are chances?",
    answer:
      "Phishing drains are among the more recoverable types if reported quickly. Success often 30-60% when funds hit exchanges that cooperate with law enforcement or freezes. We help trace and escalate immediately.",
  },
  {
    question: "Seed phrase was stolen — is recovery possible?",
    answer:
      "Very challenging. Blockchain is irreversible — success depends on slow laundering by attacker or funds hitting regulated platforms. Realistic rates 5-25%. We prioritize tracing and legal pathways.",
  },
  {
    question: "How much do you charge for hacked wallet recovery?",
    answer:
      "20-35% of recovered funds (higher due to complexity and lower average success vs exchange issues). No recovery = no fee. Fixed fees possible for forensics-only cases starting ~$800.",
  },
  {
    question: "What if funds were sent to a mixer or privacy chain?",
    answer:
      "Extremely difficult — mixers/privacy coins break traceability. Success drops significantly. We still attempt advanced clustering/forensics but expectations must be realistic.",
  },
  {
    question: "Do you work with law enforcement?",
    answer:
      "Yes — we prepare detailed reports for FBI/IC3, local cyber units, Europol, etc., and coordinate when funds are traceable to compliant entities.",
  },
];

const HackedWalletRecoveryPage = () => {
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
        <div className="absolute top-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/50 mb-6 sm:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <Link href="/recovery-services" className="hover:text-white transition-colors">Recovery Services</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-white">Hacked Wallet Recovery</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
                <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                <span className="text-xs sm:text-sm text-red-300 font-medium">Hacked Wallet Recovery</span>
              </div>

              <h1
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                itemProp="name"
              >
                <span className="text-white">Hacked Crypto Wallet</span>
                <br />
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                  Recovery Services
                </span>
              </h1>

              <p
                className="text-sm xs:text-base sm:text-lg md:text-xl text-white/60 mb-6 sm:mb-8 leading-relaxed"
                itemProp="description"
              >
                Wallet drained? Phishing attack? Seed compromised? We provide urgent forensics, tracing, and escalation to freeze/recover funds when possible. Success highest with fast reporting — act now.
              </p>

              <div className="p-4 sm:p-5 rounded-xl bg-red-500/10 border border-red-400/30 mb-6 sm:mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-white mb-1">Time Is Critical</div>
                    <div className="text-xs sm:text-sm text-white/70">
                      Funds move in minutes. Report immediately for best freeze/recovery chance via exchanges and law enforcement.
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-red-400 mb-1">20-60%</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Typical Success</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-red-400 mb-1">Many Chains</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Supported</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-red-400 mb-1">Urgent</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Response</div>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base shadow-lg shadow-red-500/25"
                >
                  Report Hack Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="#wallets"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  Supported Wallets
                </Link>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6">
                <a href="tel:+1-800-RECOVER" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  <span>+1 (800) RECOVER</span>
                </a>
                <a href="mailto:hacked@walletrecover.com" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  <span>hacked@walletrecover.com</span>
                </a>
              </div>
            </div>

            {/* Right: Common Issues Checker */}
            <div className="relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">
                  Common Hack Types
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-red-400/30 transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white mb-1">Phishing Drain</div>
                        <div className="text-xs sm:text-sm text-white/60">25-45% • Fast Action Key</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-red-400 transition-colors" />
                    </div>
                  </div>
                  {/* Add 3-4 more similar blocks for other scenarios */}
                  {/* ... */}
                </div>
                <Link
                  href="/contact"
                  className="mt-6 sm:mt-8 w-full inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-sm sm:text-base"
                >
                  Report Your Hack
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hacked Wallet Scenarios */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Hacked Wallet Scenarios
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60 max-w-3xl mx-auto">
              We handle various compromise types with realistic recovery strategies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {hackedScenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <article
                  key={index}
                  className="p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-red-500/10 transition-all hover:scale-105"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mb-4 sm:mb-5">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-red-400" />
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
                      <span className={`font-semibold ${scenario.severity.includes('Critical') ? 'text-red-500' : scenario.severity === 'Very High' ? 'text-orange-500' : 'text-yellow-400'}`}>
                        {scenario.severity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Recovery Chance:</span>
                      <span className="text-green-400 font-semibold">{scenario.recoveryRate}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Timeframe:</span>
                      <span className="text-red-400 font-semibold">{scenario.timeframe}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-xs sm:text-sm text-white/50 mb-2">Common Causes:</div>
                    <div className="space-y-1">
                      {scenario.commonCauses.map((cause, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                          <div className="w-1 h-1 rounded-full bg-red-400" />
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

      {/* Supported Wallets Section */}
      <section id="wallets" className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Supported Wallets & Chains
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              We assist with hacks on major software, hardware, and chain-specific wallets
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {supportedWallets.map((wallet, index) => (
              <div
                key={index}
                className="group p-4 sm:p-5 rounded-xl border bg-gradient-to-br from-white/5 to-white/0 border-white/10 hover:border-red-400/30 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{wallet.logo}</div>
                  <div className="text-xs sm:text-sm font-semibold text-white mb-1">{wallet.name}</div>
                  <div className="text-[10px] xs:text-xs text-white/50">{wallet.tier}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-400/20 text-center">
            <p className="text-sm sm:text-base text-white/80 mb-4">
              Not listed? We support most EVM, Solana, Bitcoin wallets — contact us.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-red-400 hover:text-red-300 transition-colors">
              Ask about your wallet
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Common Issues Table, Recovery Process, FAQ, Final CTA — follow same pattern as previous pages */}
      {/* Adjust colors to red/orange, content to hacked wallet focus. */}

      {/* ... (implement remaining sections similarly: table, steps timeline, faqs accordion, urgent CTA) ... */}

    </main>
  );
};

export default HackedWalletRecoveryPage;