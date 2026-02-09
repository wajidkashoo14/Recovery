"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Coins,              // Using as ETH-like icon (or you can import a specific ETH icon if available)
  Shield,
  Lock,
  Key,
  HardDrive,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Award,
  ChevronRight,
  Phone,
  Mail,
  ArrowRight,
  FileText,
  Smartphone,
  Laptop,
  Database,
  Zap,
  Star,
  TrendingUp,
  Info
} from "lucide-react";

// Recovery scenarios — adapted for Ethereum common cases
const recoveryScenarios = [
  {
    icon: Lock,
    title: "Forgot Ethereum Keystore / Wallet Password",
    description: "Forgot the password to your Ethereum keystore file or wallet? We use advanced brute-force and dictionary techniques (with your hints) to regain access.",
    difficulty: "Medium",
    successRate: "94%",
    timeframe: "3-8 days",
  },
  {
    icon: HardDrive,
    title: "Deleted or Corrupted Ethereum Wallet",
    description: "Accidentally deleted your wallet files, or your device failed? Many Ethereum wallets (including old JSON keystores) can still be recovered from remnants.",
    difficulty: "High",
    successRate: "82%",
    timeframe: "7-15 days",
  },
  {
    icon: Key,
    title: "Incomplete or Partial Seed Phrase / Mnemonic",
    description: "Lost part of your 12/24-word seed phrase? We can help reconstruct valid mnemonics and derive your Ethereum private keys.",
    difficulty: "Very High",
    successRate: "68%",
    timeframe: "12-25 days",
  },
];

// Supported wallets — popular Ethereum / ERC-20 wallets
const supportedWallets = [
  { name: "MetaMask", logo: "🦊", link: "/recovery-services/metamask" },
  { name: "Trust Wallet", logo: "🔷", link: "/recovery-services/trust-wallet" },
  { name: "Ledger", logo: "🔐", link: "/recovery-services/ledger" },
  { name: "Trezor", logo: "🛡️", link: "/recovery-services/trezor" },
  { name: "Coinbase Wallet", logo: "📱", link: "/recovery-services/coinbase-wallet" },
  { name: "MyEtherWallet", logo: "🅴", link: "/recovery-services/myetherwallet" },
  { name: "Exodus", logo: "🌌", link: "/recovery-services/exodus" },
  { name: "Rainbow", logo: "🌈", link: "/recovery-services/rainbow" },
];

// Why choose us reasons — slightly adjusted wording
const whyChooseUs = [
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Over $450M in ETH & ERC-20 assets recovered for 9,000+ clients worldwide",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "AES-256 encryption and isolated environments protect your keys & data",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Blockchain forensics specialists with 5+ years Ethereum recovery experience",
  },
  {
    icon: DollarSign,
    title: "No Recovery, No Fee",
    description: "Pay only if we successfully recover your Ethereum — zero upfront costs",
  },
];

// Process steps — minor wording tweaks for ETH
const recoveryProcess = [
  {
    number: "01",
    title: "Free Consultation",
    description: "Tell us about your lost Ethereum access. We'll evaluate your case and give realistic recovery odds.",
    icon: Phone,
  },
  {
    number: "02",
    title: "Case Analysis",
    description: "We examine wallet type, keystore/JSON files, seed hints, and create a tailored recovery plan.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Recovery Execution",
    description: "Advanced decryption, mnemonic brute-forcing, and forensic tools are used to regain access.",
    icon: Zap,
  },
  {
    number: "04",
    title: "ETH Transfer",
    description: "Recovered ETH & tokens are securely sent to your new wallet. You pay our 20% success fee only after.",
    icon: CheckCircle,
  },
];

// FAQs — Ethereum-specific
const faqs = [
  {
    question: "What is Ethereum wallet recovery?",
    answer: "Ethereum wallet recovery helps regain access to lost ETH and ERC-20 tokens by recovering passwords, keystore files, private keys, or partial seed phrases using specialized forensic techniques.",
  },
  {
    question: "Can you recover an Ethereum wallet?",
    answer: "Yes — in most non-theft cases. Success depends on wallet type, available info (partial passwords/mnemonics), and loss circumstances. We typically achieve 94% success on password/keystore cases and 82% on deleted wallets.",
  },
  {
    question: "How long does Ethereum recovery take?",
    answer: "Timelines vary: password/keystore recovery often 3-8 days; complex partial-mnemonic or corrupted-file cases 12-25 days. We give accurate estimates after your free consultation.",
  },
  {
    question: "What if I've lost my Ethereum keystore password?",
    answer: "Keystore JSON files are encrypted with your password. We apply optimized brute-force & mask attacks using any password hints you remember (length, patterns, etc.).",
  },
  {
    question: "What is your fee structure?",
    answer: "No recovery = no fee. On success we take 20% of recovered ETH/tokens (reduced for very large amounts). You keep 80%. Nothing owed if we cannot recover.",
  },
  {
    question: "Is the recovery process secure?",
    answer: "Yes — we use military-grade AES-256 encryption, air-gapped systems for key work, and delete all sensitive data after transfer. Your privacy and funds stay protected.",
  },
];

const EthereumRecoveryPage = () => {
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
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" /> {/* Changed to blue-ish tone for ETH feel */}
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/50 mb-6 sm:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <Link href="/recovery-services" className="hover:text-white transition-colors">Recovery Services</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-white">Ethereum (ETH)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
                <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-xs sm:text-sm text-blue-300 font-medium">Professional ETH Recovery</span>
              </div>
              
              <h1 
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                itemProp="name"
              >
                <span className="text-white">Ethereum Wallet</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Recovery Service
                </span>
              </h1>
              
              <p 
                className="text-sm xs:text-base sm:text-lg md:text-xl text-white/60 mb-6 sm:mb-8 leading-relaxed"
                itemProp="description"
              >
                Lost access to your Ethereum wallet? Forgotten keystore password, partial seed phrase, or deleted files? 
                Our specialists recover ETH & ERC-20 tokens with high success rates. No recovery, no fee.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-blue-400 mb-1">97%</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Success Rate</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-blue-400 mb-1">4-9</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Days Average</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-blue-400 mb-1">$0</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Upfront Cost</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base shadow-lg shadow-blue-500/25"
                >
                  Start Free Consultation
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  How It Works
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6">
                <a href="tel:+1-800-RECOVER" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span>+1 (800) RECOVER</span>
                </a>
                <a href="mailto:support@walletrecover.com" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span>support@walletrecover.com</span>
                </a>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-6 sm:p-8 md:p-10">
                {/* ETH icon */}
                <div className="flex items-center justify-center mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-50" />
                    <Coins className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 text-blue-400" />
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Keystore Password Recovery</div>
                      <div className="text-xs sm:text-sm text-white/60">Forgotten JSON file passwords recovered.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Partial Seed Phrase Recovery</div>
                      <div className="text-xs sm:text-sm text-white/60">Reconstruct missing words & derive keys.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Deleted Wallet Files</div>
                      <div className="text-xs sm:text-sm text-white/60">Recover from corrupted drives & backups.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Hardware & Software Wallets</div>
                      <div className="text-xs sm:text-sm text-white/60">Ledger, Trezor, MetaMask & more.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Scenarios */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Common Ethereum Recovery Scenarios
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60 max-w-3xl mx-auto">
              We handle all major Ethereum access loss situations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {recoveryScenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <article
                  key={index}
                  className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:scale-105"
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 sm:mb-5">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3" itemProp="name">
                    {scenario.title}
                  </h3>
                  
                  <p className="text-xs xs:text-sm sm:text-base text-white/60 mb-4 sm:mb-5 leading-relaxed" itemProp="description">
                    {scenario.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                    <span className="px-2.5 py-1 rounded-md text-[10px] xs:text-xs font-semibold bg-blue-400/10 text-blue-400 border border-blue-400/20">
                      {scenario.difficulty}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] xs:text-xs font-semibold bg-green-400/10 text-green-400 border border-green-400/20">
                      {scenario.successRate} Success
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] xs:text-xs font-semibold bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                      {scenario.timeframe}
                    </span>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
                  >
                    <span>Start Recovery</span>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported Wallets */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Ethereum Wallets We Recover
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              We support all major Ethereum & ERC-20 compatible wallets
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {supportedWallets.map((wallet, index) => (
              <Link
                key={index}
                href={wallet.link}
                className="group p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/30 hover:bg-white/10 transition-all text-center hover:scale-105"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">{wallet.logo}</div>
                <div className="text-xs sm:text-sm md:text-base font-medium text-white/70 group-hover:text-white transition-colors">
                  {wallet.name}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-white/50 mb-3 sm:mb-4">Don't see your wallet? We likely support it too.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Contact us about your wallet
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Why Choose WalletRecover?
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Trusted by thousands of Ethereum users worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {whyChooseUs.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all text-center"
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-xs sm:text-sm text-white/60">{reason.description}</p>
                </div>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 text-center">
            <p className="text-sm sm:text-base md:text-lg text-white/80 italic mb-2">
              "Lost access to 320 ETH after forgetting my old keystore password. Recovered in 6 days — life-changing service!"
            </p>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-white/50">— Sarah K., Verified Client</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Our Ethereum Recovery Process
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Simple, secure, and transparent — 4 steps to regain access
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-cyan-500/50 to-blue-500/50" aria-hidden="true" />

            <div className="space-y-6 sm:space-y-8">
              {recoveryProcess.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex gap-4 sm:gap-6 group">
                    {/* Number Circle */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border-4 border-black">
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

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base shadow-lg shadow-blue-500/25"
            >
              Start Your Recovery Today
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
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
              Common questions about Ethereum wallet recovery
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

          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-sm sm:text-base text-white/60 mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Contact our support team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5" aria-hidden="true" />
            
            <div className="relative">
              <Coins className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Ready to Recover Your Ethereum?
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-white/60 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Don't leave your ETH and tokens locked forever. Our team is ready to help with our proven no-recovery-no-fee guarantee.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
                >
                  Get Free Consultation
                </Link>
                <a
                  href="tel:+1-800-RECOVER"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Now
                </a>
              </div>

              <p className="text-xs sm:text-sm text-white/50">
                Available 24/7 • No upfront costs • 97% success rate
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default EthereumRecoveryPage;