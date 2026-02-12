"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  AlertTriangle,
  Shield,
  Search,
  FileText,
  AlertOctagon,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  Eye,
  Link2,
  MessageSquare,
  CreditCard,
  TrendingUp,
  Award,
  Star,
  Users,
  Target,
  Activity,
  Database,
  Lock,
  Zap,
  Info,
  ChevronRight,
  DollarSign,
  Ban,
  ShieldAlert
} from "lucide-react";

// Common scam types
const scamTypes = [
  {
    icon: MessageSquare,
    title: "Phishing Scams",
    description: "Fake websites, emails, or messages designed to steal your wallet credentials and private keys through deceptive links and forms.",
    severity: "Critical",
    commonLoss: "$5,000 - $50,000",
    recoveryRate: "65%",
    color: "red",
  },
  {
    icon: CreditCard,
    title: "Investment/Ponzi Schemes",
    description: "Fraudulent investment platforms promising guaranteed high returns. Funds are stolen once deposits reach certain amounts.",
    severity: "High",
    commonLoss: "$10,000 - $100,000",
    recoveryRate: "45%",
    color: "orange",
  },
  {
    icon: Users,
    title: "Romance Scams",
    description: "Criminals build fake relationships and request cryptocurrency for fabricated emergencies or investment opportunities.",
    severity: "High",
    commonLoss: "$20,000 - $150,000",
    recoveryRate: "40%",
    color: "pink",
  },
  {
    icon: Link2,
    title: "Fake Exchanges/Wallets",
    description: "Counterfeit cryptocurrency exchanges or wallet apps that steal deposits or private keys from unsuspecting users.",
    severity: "Critical",
    commonLoss: "$3,000 - $30,000",
    recoveryRate: "55%",
    color: "yellow",
  },
  {
    icon: TrendingUp,
    title: "Pump and Dump",
    description: "Coordinated schemes to artificially inflate token prices, then sell at peak while leaving investors with worthless assets.",
    severity: "Medium",
    commonLoss: "$2,000 - $20,000",
    recoveryRate: "30%",
    color: "purple",
  },
  {
    icon: ShieldAlert,
    title: "Rug Pulls",
    description: "DeFi projects that drain liquidity pools or disappear after collecting investor funds, leaving tokens worthless.",
    severity: "High",
    commonLoss: "$5,000 - $75,000",
    recoveryRate: "35%",
    color: "red",
  },
];

// Warning signs
const warningSign = [
  "Promises of guaranteed returns or 'risk-free' investments",
  "Pressure to act quickly or 'limited time' offers",
  "Requests for upfront fees or personal information",
  "Unsolicited contact via email, text, or social media",
  "Too-good-to-be-true offers or unrealistic profits",
  "Unprofessional website design or poor grammar",
  "No verifiable company information or regulation",
  "Celebrity endorsements that seem suspicious",
  "Requests to send cryptocurrency to unknown wallets",
  "Inability to withdraw funds or excessive delays",
];

// Investigation process
const investigationSteps = [
  {
    number: "01",
    title: "Initial Report & Assessment",
    description: "Share all details about the scam: transaction hashes, wallet addresses, communication records, and timeline. We assess the case feasibility and recovery probability.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Blockchain Forensics",
    description: "Our team traces the stolen cryptocurrency through the blockchain, identifying wallet addresses, exchanges, and movement patterns using advanced analysis tools.",
    icon: Search,
  },
  {
    number: "03",
    title: "Evidence Collection",
    description: "We gather and document all evidence including transaction records, communications, screenshots, and any identifying information about the scammer.",
    icon: Database,
  },
  {
    number: "04",
    title: "Legal & Exchange Coordination",
    description: "We work with law enforcement, exchanges, and legal authorities to freeze accounts, file reports, and pursue recovery through official channels.",
    icon: Shield,
  },
  {
    number: "05",
    title: "Recovery & Return",
    description: "When successful, we coordinate the return of recovered funds to you. Our fee is only charged on successfully recovered amounts.",
    icon: CheckCircle,
  },
];

// Recovery statistics
const recoveryStats = [
  { value: "85%", label: "Cases Investigated", icon: Search },
  { value: "65%", label: "Funds Traced", icon: Target },
  { value: "45%", label: "Partial Recovery", icon: TrendingUp },
  { value: "$15M+", label: "Total Recovered", icon: DollarSign },
];

// FAQs
const faqs = [
  {
    question: "Can you recover cryptocurrency stolen in a scam?",
    answer: "Recovery depends on several factors: how quickly you report it, the type of scam, where the funds were sent, and whether they've been moved to exchanges. Our blockchain forensics team has a 45% overall recovery rate, with higher success rates for recent scams reported quickly.",
  },
  {
    question: "How long does scam recovery take?",
    answer: "Investigation and recovery typically takes 30-90 days, depending on the complexity. Simple cases where funds remain on traceable exchanges can be resolved in 30-45 days. Complex cases involving multiple wallets and international transfers may take 60-90 days or longer.",
  },
  {
    question: "What information do you need to investigate?",
    answer: "We need: transaction hashes (TxID), scammer's wallet addresses, your wallet address, all communication records (emails, messages, screenshots), timeline of events, and any documentation about the scam (website URLs, social media profiles, payment receipts).",
  },
  {
    question: "Should I report to police before contacting you?",
    answer: "Yes, always file a police report and report to relevant authorities (FBI IC3, FTC, local police). We work alongside law enforcement and can provide expert testimony and blockchain evidence to support your case. Police reports strengthen recovery efforts.",
  },
  {
    question: "What are the chances of recovery?",
    answer: "Overall recovery rate is approximately 45% for partial or full recovery. Phishing scams have 65% recovery rate, investment scams 45%, and rug pulls 35%. Success is highest when reported within 48 hours and funds haven't been laundered through mixers.",
  },
  {
    question: "How much does scam investigation cost?",
    answer: "Initial investigation and assessment are free. If we proceed with recovery, we charge 25% of successfully recovered funds (no recovery, no fee). Complex cases requiring legal action may have additional legal fees, discussed upfront.",
  },
  {
    question: "Can you prevent the scammer from moving funds?",
    answer: "We cannot freeze funds directly, but we work with exchanges to flag suspicious wallet addresses and coordinate with law enforcement to freeze accounts when funds reach regulated exchanges. Speed is critical - contact us immediately.",
  },
  {
    question: "What if the scammer used a mixing service?",
    answer: "Mixing services (tumblers) make recovery significantly harder but not impossible. Our forensic tools can sometimes trace through mixers, and we work with exchanges that have anti-money laundering protocols to identify and freeze suspicious deposits.",
  },
];

const ScamRecoveryPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedScam, setSelectedScam] = useState<number | null>(null);

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
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/50 mb-6 sm:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <Link href="/recovery-services" className="hover:text-white transition-colors">Recovery Services</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-white">Scam Recovery</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
                <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                <span className="text-xs sm:text-sm text-red-300 font-medium">Expert Scam Investigation</span>
              </div>
              
              <h1 
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                itemProp="name"
              >
                <span className="text-white">Cryptocurrency</span>
                <br />
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                  Scam Recovery
                </span>
              </h1>
              
              <p 
                className="text-sm xs:text-base sm:text-lg md:text-xl text-white/60 mb-6 sm:mb-8 leading-relaxed"
                itemProp="description"
              >
                Been scammed? Lost cryptocurrency to fraud? Our blockchain forensics team specializes in 
                tracing and recovering stolen crypto. We've recovered $15M+ across 1,000+ scam cases with 
                a 45% success rate.
              </p>

              {/* Alert Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-red-500/10 border border-red-400/30 mb-6 sm:mb-8">
                <div className="flex items-start gap-3">
                  <AlertOctagon className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-white mb-1">Act Fast!</div>
                    <div className="text-xs sm:text-sm text-white/70">
                      Time is critical. Contact us immediately if you've been scammed. The faster we act, 
                      the higher the recovery chances.
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base shadow-lg shadow-red-500/25"
                >
                  Report Scam Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <a
                  href="tel:+1-800-RECOVER"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Emergency Hotline
                </a>
              </div>

              {/* Contact Info */}
              <div className="pt-6 sm:pt-8 border-t border-white/10">
                <p className="text-xs sm:text-sm text-white/50 mb-3 sm:mb-4">
                  Available 24/7 for scam emergencies
                </p>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <a href="tel:+1-800-RECOVER" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                    <span>+1 (800) RECOVER</span>
                  </a>
                  <a href="mailto:scam@walletrecover.com" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                    <span>scam@walletrecover.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Stats */}
            <div className="relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm p-6 sm:p-8">
                
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">
                  Recovery Statistics
                </h3>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {recoveryStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 text-center">
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-red-400 mx-auto mb-2 sm:mb-3" />
                        <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Success */}
                <div className="p-4 sm:p-5 rounded-xl bg-green-500/10 border border-green-400/30">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Recent Success</div>
                      <div className="text-xs sm:text-sm text-white/70 mb-2">
                        Recovered $320,000 from phishing scam in 35 days through exchange cooperation.
                      </div>
                      <Link href="/case-studies" className="text-xs sm:text-sm text-green-400 hover:text-green-300 inline-flex items-center gap-1">
                        View case study
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Scam Types */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Common Cryptocurrency Scams
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60 max-w-3xl mx-auto">
              We investigate and recover funds from all types of crypto fraud
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {scamTypes.map((scam, index) => {
              const Icon = scam.icon;
              const isSelected = selectedScam === index;
              
              return (
                <article
                  key={index}
                  onClick={() => setSelectedScam(isSelected ? null : index)}
                  className={`
                    p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/0 
                    border transition-all cursor-pointer
                    ${isSelected 
                      ? 'border-red-400/50 shadow-2xl shadow-red-500/20 scale-105' 
                      : 'border-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-red-500/10'
                    }
                  `}
                  itemProp="serviceType"
                >
                  <div className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-5
                    ${scam.color === 'red' ? 'bg-red-500/20' :
                      scam.color === 'orange' ? 'bg-orange-500/20' :
                      scam.color === 'pink' ? 'bg-pink-500/20' :
                      scam.color === 'yellow' ? 'bg-yellow-500/20' :
                      'bg-purple-500/20'}
                  `}>
                    <Icon className={`
                      w-6 h-6 sm:w-7 sm:h-7
                      ${scam.color === 'red' ? 'text-red-400' :
                        scam.color === 'orange' ? 'text-orange-400' :
                        scam.color === 'pink' ? 'text-pink-400' :
                        scam.color === 'yellow' ? 'text-yellow-400' :
                        'text-purple-400'}
                    `} />
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {scam.title}
                  </h3>
                  
                  <p className="text-xs xs:text-sm sm:text-base text-white/60 mb-4 sm:mb-5 leading-relaxed">
                    {scam.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Severity:</span>
                      <span className={`
                        font-semibold
                        ${scam.severity === 'Critical' ? 'text-red-400' :
                          scam.severity === 'High' ? 'text-orange-400' :
                          'text-yellow-400'}
                      `}>
                        {scam.severity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Common Loss:</span>
                      <span className="text-white font-semibold">{scam.commonLoss}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Recovery Rate:</span>
                      <span className="text-green-400 font-semibold">{scam.recoveryRate}</span>
                    </div>
                  </div>

                  <button className="w-full py-2 px-4 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all">
                    {isSelected ? 'Show Less' : 'Learn More'}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            
            {/* Left: Warning Signs */}
            <div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Warning Signs of Crypto Scams
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-white/60 mb-6 sm:mb-8">
                Recognize these red flags to protect yourself from cryptocurrency fraud
              </p>

              <div className="space-y-3 sm:space-y-4">
                {warningSign.map((sign, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-400/20 hover:border-red-400/40 transition-all"
                  >
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs xs:text-sm sm:text-base text-white/80">{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Action Steps */}
            <div className="relative">
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
                  If You've Been Scammed
                </h3>

                <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm sm:text-base font-bold text-red-400">1</span>
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Stop All Contact</div>
                      <div className="text-xs sm:text-sm text-white/60">Cease communication with the scammer immediately. Do not send additional funds.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm sm:text-base font-bold text-red-400">2</span>
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Document Everything</div>
                      <div className="text-xs sm:text-sm text-white/60">Save all messages, emails, transaction IDs, wallet addresses, and screenshots.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm sm:text-base font-bold text-red-400">3</span>
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Report to Authorities</div>
                      <div className="text-xs sm:text-sm text-white/60">File reports with FBI IC3, FTC, and local police. Get case numbers.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm sm:text-base font-bold text-red-400">4</span>
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">Contact Us Immediately</div>
                      <div className="text-xs sm:text-sm text-white/60">Time is critical. Our forensics team can start tracing funds right away.</div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
                >
                  Start Investigation
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investigation Process */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Our Investigation Process
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Professional blockchain forensics and recovery coordination
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/50 via-orange-500/50 to-red-500/50" aria-hidden="true" />

            <div className="space-y-6 sm:space-y-8">
              {investigationSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex gap-4 sm:gap-6 group">
                    {/* Number Circle */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border-4 border-black">
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
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Common questions about scam recovery
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
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 transition-transform ${
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-red-400/20 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5" aria-hidden="true" />
            
            <div className="relative">
              <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Every Second Counts
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-white/60 mb-6 sm:mb-8 max-w-2xl mx-auto">
                The faster you act, the higher your chances of recovery. Our blockchain forensics experts 
                are available 24/7 to start investigating your case immediately.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
                >
                  Report Scam Now
                </Link>
                <a
                  href="tel:+1-800-RECOVER"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Emergency Line
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>45% Recovery Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>24/7 Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-red-400" />
                  <span>No Recovery, No Fee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default ScamRecoveryPage;