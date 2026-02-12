"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText,
  Shield,
  Lock,
  Key,
  AlertCircle,
  CheckCircle,
  Clock,
  Calculator,
  ChevronRight,
  Phone,
  Mail,
  ArrowRight,
  AlertTriangle,
  Info,
  Zap,
  Target,
  Award,
  Star,
  Database,
  Search,
  Lightbulb,
  BookOpen,
  HelpCircle
} from "lucide-react";

// Seed phrase scenarios
const seedPhraseScenarios = [
  {
    icon: FileText,
    title: "Partial Seed Phrase Recovery",
    description: "Have only some words from your 12 or 24-word seed phrase? Our AI-powered reconstruction algorithms can identify the missing words using advanced computational techniques.",
    minWords: "8 of 12 or 18 of 24",
    successRate: "92%",
    timeframe: "5-14 days",
    complexity: "High",
  },
  {
    icon: Key,
    title: "Incorrect Word Order",
    description: "Know all your seed phrase words but forgot the correct order? We can test all possible combinations to find the right sequence for your wallet.",
    minWords: "All words known",
    successRate: "98%",
    timeframe: "3-10 days",
    complexity: "Medium",
  },
  {
    icon: AlertCircle,
    title: "Wrong Word in Seed Phrase",
    description: "One or two words might be incorrect or misspelled? We can identify and correct invalid words using BIP39 wordlist verification and wallet validation.",
    minWords: "10+ of 12 words",
    successRate: "85%",
    timeframe: "7-14 days",
    complexity: "Very High",
  },
];

// BIP39 information
const bip39Info = [
  {
    type: "12-Word Phrase",
    combinations: "2,048¹²",
    entropy: "128 bits",
    checksum: "4 bits",
    difficulty: "Medium",
  },
  {
    type: "24-Word Phrase",
    combinations: "2,048²⁴",
    entropy: "256 bits",
    checksum: "8 bits",
    difficulty: "Very High",
  },
];

// Recovery requirements
const recoveryRequirements = [
  {
    scenario: "12-word phrase",
    minKnown: "8-9 words",
    maxMissing: "3-4 words",
    estimatedTime: "5-10 days",
    difficulty: "High",
  },
  {
    scenario: "24-word phrase",
    minKnown: "18-20 words",
    maxMissing: "4-6 words",
    estimatedTime: "10-21 days",
    difficulty: "Very High",
  },
  {
    scenario: "Wrong order (12 words)",
    minKnown: "All 12 words",
    maxMissing: "0 words",
    estimatedTime: "3-7 days",
    difficulty: "Medium",
  },
  {
    scenario: "Wrong order (24 words)",
    minKnown: "All 24 words",
    maxMissing: "0 words",
    estimatedTime: "7-14 days",
    difficulty: "High",
  },
];

// How it works steps
const recoverySteps = [
  {
    number: "01",
    title: "Provide Known Information",
    description: "Share the seed phrase words you remember, their possible positions, and any other details about your wallet setup.",
    icon: FileText,
  },
  {
    number: "02",
    title: "AI-Powered Analysis",
    description: "Our advanced algorithms analyze your partial phrase against the BIP39 wordlist and calculate possible combinations.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Systematic Testing",
    description: "We systematically test valid combinations using our high-performance computing infrastructure to find the correct seed phrase.",
    icon: Target,
  },
  {
    number: "04",
    title: "Wallet Restoration",
    description: "Once the correct seed phrase is found, we verify it generates your wallet addresses and securely transfer your assets.",
    icon: CheckCircle,
  },
];

// FAQs
const faqs = [
  {
    question: "What is a seed phrase?",
    answer: "A seed phrase (also called recovery phrase or mnemonic phrase) is a series of 12 or 24 random words that serves as a master backup for your cryptocurrency wallet. It's generated using the BIP39 standard and can restore all your private keys and wallet addresses.",
  },
  {
    question: "How many words do I need to know for recovery?",
    answer: "For 12-word phrases, you typically need at least 8-9 words. For 24-word phrases, you need at least 18-20 words. The more words you know, the higher the success probability and the faster the recovery process.",
  },
  {
    question: "What if I have all words but in wrong order?",
    answer: "If you know all 12 or 24 words but not their order, we can recover your wallet by testing all possible permutations. For 12 words, this is computationally feasible. For 24 words, it's more complex but still possible with our advanced infrastructure.",
  },
  {
    question: "Can you recover if I have only 6 words?",
    answer: "Unfortunately, having only 6 words from a 12-word phrase (or 12 from a 24-word phrase) makes recovery extremely difficult due to the astronomical number of possible combinations. We recommend having at least 8 of 12 or 18 of 24 words for feasible recovery.",
  },
  {
    question: "How long does seed phrase recovery take?",
    answer: "Recovery time depends on how many words are missing and their positions. Partial phrase recovery typically takes 5-14 days for 12-word phrases and 10-21 days for 24-word phrases. Wrong-order recovery is usually faster at 3-14 days.",
  },
  {
    question: "Is my seed phrase safe during recovery?",
    answer: "Absolutely. We use military-grade encryption (AES-256) and secure, isolated computing environments. Your seed phrase is never stored permanently, and all data is destroyed immediately after successful recovery. We also sign NDAs for additional security.",
  },
  {
    question: "What cryptocurrencies do you support?",
    answer: "We support all cryptocurrencies that use BIP39 seed phrases, including Bitcoin, Ethereum, Litecoin, and 100+ other coins. Any wallet that was created with a 12 or 24-word seed phrase can potentially be recovered.",
  },
  {
    question: "What is your fee for seed phrase recovery?",
    answer: "We operate on a no recovery, no fee basis. You pay nothing upfront. If we successfully recover your wallet, we charge 20% of the recovered value (reduced for high-value recoveries). If we can't recover it, you owe nothing.",
  },
];

const SeedPhraseRecoveryPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [knownWords, setKnownWords] = useState<number>(8);
  const [totalWords, setTotalWords] = useState<number>(12);
  const [showCalculator, setShowCalculator] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Calculate missing words and combinations
  const missingWords = totalWords - knownWords;
  const combinations = Math.pow(2048, missingWords);
  const formattedCombinations = combinations > 1000000 
    ? `${(combinations / 1000000).toFixed(1)}M` 
    : combinations.toLocaleString();

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
        <div className="absolute top-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/50 mb-6 sm:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <Link href="/recovery-services" className="hover:text-white transition-colors">Recovery Services</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-white">Seed Phrase Recovery</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
                <Key className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                <span className="text-xs sm:text-sm text-purple-300 font-medium">Expert Seed Phrase Recovery</span>
              </div>
              
              <h1 
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                itemProp="name"
              >
                <span className="text-white">Seed Phrase</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                  Recovery Service
                </span>
              </h1>
              
              <p 
                className="text-sm xs:text-base sm:text-lg md:text-xl text-white/60 mb-6 sm:mb-8 leading-relaxed"
                itemProp="description"
              >
                Lost or incomplete recovery phrase? Missing words from your 12 or 24-word seed phrase? 
                Our AI-powered recovery system can reconstruct your seed phrase and restore wallet access. 
                92% success rate with partial phrases.
              </p>

              {/* Alert Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-purple-500/10 border border-purple-400/30 mb-6 sm:mb-8">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-white mb-1">Important Information</div>
                    <div className="text-xs sm:text-sm text-white/70">
                      We need at least 8 words from a 12-word phrase or 18 words from a 24-word phrase for successful recovery.
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base shadow-lg shadow-purple-500/25"
                >
                  Start Free Assessment
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                  Recovery Calculator
                </button>
              </div>

              {/* Contact Info */}
              <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6">
                <a href="tel:+1-800-RECOVER" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span>+1 (800) RECOVER</span>
                </a>
                <a href="mailto:support@walletrecover.com" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span>support@walletrecover.com</span>
                </a>
              </div>
            </div>

            {/* Right: Interactive Calculator */}
            <div className="relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm p-6 sm:p-8">
                
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Recovery Feasibility</h3>
                    <p className="text-xs sm:text-sm text-white/60">Check if your case is recoverable</p>
                  </div>
                </div>

                {/* Calculator Inputs */}
                <div className="space-y-4 sm:space-y-5 mb-6">
                  <div>
                    <label className="block text-xs sm:text-sm text-white/60 mb-2">Total Words in Phrase</label>
                    <select
                      value={totalWords}
                      onChange={(e) => setTotalWords(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-purple-400 transition-colors"
                    >
                      <option value={12}>12 words</option>
                      <option value={24}>24 words</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-white/60 mb-2">Words You Know</label>
                    <input
                      type="range"
                      min={0}
                      max={totalWords}
                      value={knownWords}
                      onChange={(e) => setKnownWords(Number(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                    <div className="flex justify-between text-xs sm:text-sm text-white/60 mt-2">
                      <span>0</span>
                      <span className="text-white font-bold">{knownWords} words</span>
                      <span>{totalWords}</span>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xs sm:text-sm text-white/60 mb-1">Missing Words</div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{missingWords} words</div>
                  </div>

                  <div className="p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xs sm:text-sm text-white/60 mb-1">Possible Combinations</div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{formattedCombinations}</div>
                  </div>

                  <div className={`
                    p-3 sm:p-4 rounded-lg border
                    ${knownWords >= (totalWords === 12 ? 8 : 18)
                      ? 'bg-green-500/10 border-green-400/30'
                      : 'bg-red-500/10 border-red-400/30'
                    }
                  `}>
                    <div className="flex items-center gap-2">
                      {knownWords >= (totalWords === 12 ? 8 : 18) ? (
                        <>
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                          <div>
                            <div className="text-sm sm:text-base font-semibold text-white">Recoverable!</div>
                            <div className="text-xs sm:text-sm text-white/70">We can likely recover your wallet</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                          <div>
                            <div className="text-sm sm:text-base font-semibold text-white">Too Few Words</div>
                            <div className="text-xs sm:text-sm text-white/70">Need {totalWords === 12 ? '8+' : '18+'} words for recovery</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-5 sm:mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-sm sm:text-base"
                >
                  Get Professional Assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
              Seed Phrase Recovery Scenarios
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60 max-w-3xl mx-auto">
              We handle all types of seed phrase recovery situations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {seedPhraseScenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <article
                  key={index}
                  className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all hover:scale-105"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 sm:mb-5">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {scenario.title}
                  </h3>
                  
                  <p className="text-xs xs:text-sm sm:text-base text-white/60 mb-4 sm:mb-5 leading-relaxed">
                    {scenario.description}
                  </p>

                  <div className="space-y-2 mb-4 sm:mb-5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Minimum Words:</span>
                      <span className="text-white font-semibold">{scenario.minWords}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Success Rate:</span>
                      <span className="text-green-400 font-semibold">{scenario.successRate}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/50">Timeframe:</span>
                      <span className="text-blue-400 font-semibold">{scenario.timeframe}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className={`
                      px-2.5 py-1 rounded-md text-[10px] xs:text-xs font-semibold border
                      ${scenario.complexity === 'Medium' ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' :
                        scenario.complexity === 'High' ? 'bg-orange-400/10 text-orange-400 border-orange-400/20' :
                        'bg-red-400/10 text-red-400 border-red-400/20'}
                    `}>
                      {scenario.complexity}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BIP39 Information */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Understanding BIP39 Seed Phrases
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60 max-w-3xl mx-auto">
              Technical details about seed phrase structure and recovery complexity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {bip39Info.map((info, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{info.type}</h3>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-sm sm:text-base text-white/60">Total Combinations</span>
                    <span className="text-sm sm:text-base text-white font-mono">{info.combinations}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-sm sm:text-base text-white/60">Entropy</span>
                    <span className="text-sm sm:text-base text-white font-semibold">{info.entropy}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-sm sm:text-base text-white/60">Checksum</span>
                    <span className="text-sm sm:text-base text-white font-semibold">{info.checksum}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-white/60">Recovery Difficulty</span>
                    <span className={`
                      text-sm sm:text-base font-semibold
                      ${info.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'}
                    `}>
                      {info.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Requirements Table */}
          <div className="overflow-x-auto">
            <table className="w-full border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Scenario</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Min. Known</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Max. Missing</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Time</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-white">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {recoveryRequirements.map((req, index) => (
                  <tr key={index} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-xs sm:text-sm text-white/80">{req.scenario}</td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-white/80">{req.minKnown}</td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-white/80">{req.maxMissing}</td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-blue-400">{req.estimatedTime}</td>
                    <td className="px-4 py-3">
                      <span className={`
                        px-2 py-1 rounded text-[10px] xs:text-xs font-semibold
                        ${req.difficulty === 'Medium' ? 'bg-yellow-400/10 text-yellow-400' :
                          req.difficulty === 'High' ? 'bg-orange-400/10 text-orange-400' :
                          'bg-red-400/10 text-red-400'}
                      `}>
                        {req.difficulty}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Our Recovery Process
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Advanced AI-powered seed phrase reconstruction
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-purple-500/50" aria-hidden="true" />

            <div className="space-y-6 sm:space-y-8">
              {recoverySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex gap-4 sm:gap-6 group">
                    {/* Number Circle */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border-4 border-black">
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
              Everything you need to know about seed phrase recovery
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
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-400/20 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" aria-hidden="true" />
            
            <div className="relative">
              <Key className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Ready to Recover Your Seed Phrase?
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-white/60 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Don't let partial seed phrases keep you from your crypto. Our expert team uses advanced 
                AI and computational power to reconstruct your recovery phrase. No recovery, no fee.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
                >
                  Get Free Assessment
                </Link>
                <a
                  href="tel:+1-800-RECOVER"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Expert
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>92% Success Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>AES-256 Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" />
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

export default SeedPhraseRecoveryPage;