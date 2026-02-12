"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Zap,
  Shield,
  Code,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  TrendingUp,
  Droplet,
  Layers,
  Lock,
  Unlock,
  Activity,
  Award,
  Star,
  ChevronRight,
  DollarSign,
  Target,
  Database,
  Info,
  AlertTriangle,
  Coins,
  RefreshCw,
  GitBranch,
  Box
} from "lucide-react";

// DeFi recovery scenarios
const defiScenarios = [
  {
    icon: Lock,
    title: "Stuck Transactions & Failed Swaps",
    description: "Transactions stuck in pending state, failed swaps with lost gas fees, or tokens locked due to insufficient gas or slippage settings.",
    severity: "Medium",
    recoveryRate: "95%",
    timeframe: "1-3 days",
    protocols: ["Uniswap", "SushiSwap", "PancakeSwap"],
  },
  {
    icon: Droplet,
    title: "Liquidity Pool Issues",
    description: "Unable to withdraw from liquidity pools, impermanent loss concerns, or LP tokens stuck after protocol changes or migrations.",
    severity: "High",
    recoveryRate: "85%",
    timeframe: "3-7 days",
    protocols: ["Curve", "Balancer", "Uniswap V2/V3"],
  },
  {
    icon: TrendingUp,
    title: "Yield Farming & Staking Problems",
    description: "Locked staking positions, unable to claim rewards, or funds stuck in deprecated farming contracts.",
    severity: "High",
    recoveryRate: "90%",
    timeframe: "2-5 days",
    protocols: ["Aave", "Compound", "Yearn Finance"],
  },
  {
    icon: Code,
    title: "Smart Contract Interactions",
    description: "Wrong contract approval, tokens sent to wrong address, or assets locked due to contract interaction errors.",
    severity: "Very High",
    recoveryRate: "70%",
    timeframe: "5-14 days",
    protocols: ["Multiple Protocols"],
  },
  {
    icon: RefreshCw,
    title: "Protocol Migrations & Upgrades",
    description: "Assets stuck in old protocol versions, migration issues, or tokens on deprecated contracts.",
    severity: "Medium",
    recoveryRate: "92%",
    timeframe: "2-7 days",
    protocols: ["Uniswap V1→V2→V3", "Compound", "SushiSwap"],
  },
  {
    icon: GitBranch,
    title: "Cross-Chain Bridge Issues",
    description: "Funds stuck in bridge contracts, failed cross-chain transfers, or tokens lost during bridging.",
    severity: "Critical",
    recoveryRate: "75%",
    timeframe: "7-21 days",
    protocols: ["Multichain", "Synapse", "Hop Protocol"],
  },
];

// Supported DeFi protocols
const supportedProtocols = [
  { name: "Uniswap", logo: "🦄", category: "DEX", chains: ["Ethereum", "Polygon", "Optimism"] },
  { name: "Aave", logo: "👻", category: "Lending", chains: ["Ethereum", "Polygon", "Avalanche"] },
  { name: "Curve", logo: "🌊", category: "DEX", chains: ["Ethereum", "Arbitrum", "Polygon"] },
  { name: "SushiSwap", logo: "🍣", category: "DEX", chains: ["Multi-chain"] },
  { name: "Compound", logo: "🏛️", category: "Lending", chains: ["Ethereum"] },
  { name: "PancakeSwap", logo: "🥞", category: "DEX", chains: ["BSC", "Ethereum"] },
  { name: "Yearn", logo: "💼", category: "Yield", chains: ["Ethereum", "Fantom"] },
  { name: "Balancer", logo: "⚖️", category: "DEX", chains: ["Ethereum", "Polygon"] },
  { name: "MakerDAO", logo: "📊", category: "Lending", chains: ["Ethereum"] },
  { name: "Convex", logo: "🔺", category: "Yield", chains: ["Ethereum"] },
  { name: "Synthetix", logo: "⚡", category: "Derivatives", chains: ["Ethereum", "Optimism"] },
  { name: "1inch", logo: "🔷", category: "Aggregator", chains: ["Multi-chain"] },
];

// Recovery process steps
const recoverySteps = [
  {
    number: "01",
    title: "Transaction Analysis",
    description: "We analyze your transaction history, contract interactions, and identify the exact issue causing your funds to be stuck or inaccessible.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Smart Contract Review",
    description: "Our blockchain developers review the smart contract code to understand the locking mechanism and identify possible recovery methods.",
    icon: Code,
  },
  {
    number: "03",
    title: "Protocol Communication",
    description: "We contact protocol teams, provide evidence, and coordinate with developers to facilitate recovery through official channels when applicable.",
    icon: Activity,
  },
  {
    number: "04",
    title: "Technical Recovery",
    description: "Execute recovery transactions, contract calls, or migration processes to unlock and return your assets safely to your wallet.",
    icon: Zap,
  },
  {
    number: "05",
    title: "Asset Return & Prevention",
    description: "Transfer recovered assets and provide guidance on best practices to prevent future DeFi-related issues.",
    icon: CheckCircle,
  },
];

// Common DeFi issues checklist
const commonIssues = [
  { issue: "Transaction stuck in mempool", solution: "Gas price adjustment & replacement", recoverable: true },
  { issue: "Failed swap with lost gas", solution: "Gas fee not recoverable", recoverable: false },
  { issue: "LP tokens can't withdraw", solution: "Contract interaction recovery", recoverable: true },
  { issue: "Rewards not claimable", solution: "Protocol-specific claim process", recoverable: true },
  { issue: "Tokens sent to contract", solution: "Contract rescue if possible", recoverable: "Depends" },
  { issue: "Bridge funds stuck", solution: "Bridge protocol coordination", recoverable: true },
  { issue: "Impermanent loss", solution: "Not a recovery issue", recoverable: false },
  { issue: "Protocol hacked/exploited", solution: "Limited recovery options", recoverable: "Partial" },
];

// FAQs
const faqs = [
  {
    question: "What types of DeFi issues can you help recover?",
    answer: "We help recover from stuck transactions, liquidity pool withdrawal issues, staking/yield farming problems, failed bridges, tokens sent to wrong contracts, protocol migration issues, and smart contract interaction errors. Our success rate is 85% for DeFi-related recoveries.",
  },
  {
    question: "How long does DeFi recovery take?",
    answer: "Most DeFi recoveries take 2-7 days for standard issues like stuck transactions or LP withdrawals. Complex cases involving smart contract rescues or bridge issues may take 7-21 days. Time depends on protocol responsiveness and technical complexity.",
  },
  {
    question: "Can you recover tokens sent to a smart contract?",
    answer: "It depends on the contract design. If the contract has a rescue function or the protocol team can intervene, recovery is possible. If tokens were sent to a standard contract without rescue mechanisms, recovery may not be possible. We analyze each case individually.",
  },
  {
    question: "What information do you need for DeFi recovery?",
    answer: "We need: your wallet address, transaction hashes (TxID), the specific DeFi protocol involved, what you were trying to do, error messages received, amount and tokens involved, and any screenshots of the issue. The more details, the better.",
  },
  {
    question: "Do you support all DeFi protocols?",
    answer: "We support major protocols on Ethereum, BSC, Polygon, Arbitrum, Optimism, and Avalanche. This includes Uniswap, Aave, Curve, SushiSwap, Compound, PancakeSwap, and 50+ others. If your protocol isn't listed, contact us - we likely still support it.",
  },
  {
    question: "Can you help with failed cross-chain bridges?",
    answer: "Yes, we specialize in bridge recovery. We work with major bridge protocols like Multichain, Synapse, Hop, and Stargate to trace and recover stuck funds. Bridge issues typically have a 75% success rate and take 7-21 days.",
  },
  {
    question: "What's your fee for DeFi recovery?",
    answer: "We charge 15% of successfully recovered assets for DeFi cases (lower than our standard 20% due to higher success rates). No recovery, no fee. Complex smart contract rescues requiring custom development may have additional fees discussed upfront.",
  },
  {
    question: "Can you recover from rug pulls or hacks?",
    answer: "Rug pulls and hacks are different from standard DeFi recovery. While we can trace stolen funds and provide forensic reports, actual recovery depends on whether funds can be frozen on exchanges or legal action. Success rate for exploits is lower (30-40%).",
  },
];

const DeFiRecoveryPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);

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
        <div className="absolute top-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/50 mb-6 sm:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <Link href="/recovery-services" className="hover:text-white transition-colors">Recovery Services</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-white">DeFi Recovery</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                <span className="text-xs sm:text-sm text-cyan-300 font-medium">DeFi Protocol Specialists</span>
              </div>
              
              <h1 
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                itemProp="name"
              >
                <span className="text-white">DeFi & Smart Contract</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  Recovery Service
                </span>
              </h1>
              
              <p 
                className="text-sm xs:text-base sm:text-lg md:text-xl text-white/60 mb-6 sm:mb-8 leading-relaxed"
                itemProp="description"
              >
                Stuck in a DeFi protocol? Liquidity pool issues? Failed bridge transaction? Our blockchain 
                developers specialize in recovering assets from DeFi protocols, smart contracts, and 
                cross-chain bridges. 85% success rate across 50+ protocols.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">85%</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Success Rate</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">50+</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Protocols</div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">2-7</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Days Avg</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base shadow-lg shadow-cyan-500/25"
                >
                  Get DeFi Recovery Help
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="#protocols"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  View Supported Protocols
                </Link>
              </div>

              {/* Contact Info */}
              <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6">
                <a href="tel:+1-800-RECOVER" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  <span>+1 (800) RECOVER</span>
                </a>
                <a href="mailto:defi@walletrecover.com" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  <span>defi@walletrecover.com</span>
                </a>
              </div>
            </div>

            {/* Right: Features */}
            <div className="relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm p-6 sm:p-8">
                
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                    <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">DeFi Expertise</h3>
                    <p className="text-xs sm:text-sm text-white/60">We handle all DeFi recovery scenarios</p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Stuck Transactions</div>
                      <div className="text-xs sm:text-sm text-white/60">Pending swaps, failed transactions, gas issues</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Liquidity Pool Recovery</div>
                      <div className="text-xs sm:text-sm text-white/60">LP tokens, withdrawal issues, migrations</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Yield Farming & Staking</div>
                      <div className="text-xs sm:text-sm text-white/60">Locked positions, unclaimed rewards</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Bridge Issues</div>
                      <div className="text-xs sm:text-sm text-white/60">Cross-chain transfers, stuck funds</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Smart Contract Errors</div>
                      <div className="text-xs sm:text-sm text-white/60">Wrong approvals, contract interactions</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-white/60">
                    <Info className="w-4 h-4 flex-shrink-0" />
                    <span>Lower fees for DeFi recovery: 15% vs standard 20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DeFi Recovery Scenarios */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              DeFi Recovery Scenarios
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60 max-w-3xl mx-auto">
              We handle all types of DeFi-related issues across multiple protocols
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {defiScenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <article
                  key={index}
                  className="p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all hover:scale-105"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 sm:mb-5">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
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
                    <div className="text-xs sm:text-sm text-white/50 mb-2">Common Protocols:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {scenario.protocols.map((protocol, idx) => (
                        <span key={idx} className="px-2 py-1 bg-cyan-400/10 text-cyan-400 rounded text-[10px] xs:text-xs font-medium">
                          {protocol}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported Protocols */}
      <section id="protocols" className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Supported DeFi Protocols
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              We work with major DeFi protocols across multiple chains
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {supportedProtocols.map((protocol, index) => (
              <div
                key={index}
                onClick={() => setSelectedProtocol(selectedProtocol === protocol.name ? null : protocol.name)}
                className={`
                  group p-4 sm:p-5 rounded-xl border transition-all cursor-pointer
                  ${selectedProtocol === protocol.name
                    ? 'bg-cyan-500/20 border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                    : 'bg-gradient-to-br from-white/5 to-white/0 border-white/10 hover:border-cyan-400/30 hover:bg-white/10'
                  }
                `}
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{protocol.logo}</div>
                  <div className="text-xs sm:text-sm font-semibold text-white mb-1">{protocol.name}</div>
                  <div className="text-[10px] xs:text-xs text-white/50 mb-2">{protocol.category}</div>
                  {selectedProtocol === protocol.name && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <div className="text-[10px] xs:text-xs text-cyan-400">
                        {protocol.chains.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-xs sm:text-sm text-white/50 mb-4">
              Don't see your protocol? We support 50+ DeFi protocols across Ethereum, BSC, Polygon, and more.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Ask about your protocol
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Common Issues Checklist */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Common DeFi Issues
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Quick reference for DeFi recovery scenarios
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Issue</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Solution</th>
                  <th className="px-4 py-3 text-center text-xs sm:text-sm font-semibold text-white">Recoverable?</th>
                </tr>
              </thead>
              <tbody>
                {commonIssues.map((item, index) => (
                  <tr key={index} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-xs sm:text-sm text-white/80">{item.issue}</td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-white/60">{item.solution}</td>
                    <td className="px-4 py-3 text-center">
                      {item.recoverable === true ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-400/10 text-green-400 rounded text-xs font-semibold">
                          <CheckCircle className="w-3 h-3" />
                          Yes
                        </span>
                      ) : item.recoverable === false ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-400/10 text-red-400 rounded text-xs font-semibold">
                          <AlertCircle className="w-3 h-3" />
                          No
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded text-xs font-semibold">
                          {item.recoverable}
                        </span>
                      )}
                    </td>
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
              DeFi Recovery Process
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Technical expertise meets protocol knowledge
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-cyan-500/50" aria-hidden="true" />

            <div className="space-y-6 sm:space-y-8">
              {recoverySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex gap-4 sm:gap-6 group">
                    {/* Number Circle */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border-4 border-black">
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
              Everything you need to know about DeFi recovery
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
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0 transition-transform ${
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
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" aria-hidden="true" />
            
            <div className="relative">
              <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Stuck in DeFi? We Can Help
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-white/60 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Our blockchain developers have recovered millions from stuck DeFi positions. Whether it's 
                a liquidity pool, yield farm, or bridge issue - we have the expertise to help.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
                >
                  Start DeFi Recovery
                </Link>
                <a
                  href="tel:+1-800-RECOVER"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call DeFi Experts
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>85% Success Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>50+ Protocols</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>15% Fee Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default DeFiRecoveryPage;