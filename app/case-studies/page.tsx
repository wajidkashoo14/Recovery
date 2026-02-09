"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp,
  Search,
  Filter,
  DollarSign,
  Clock,
  Shield,
  CheckCircle,
  ChevronRight,
  Star,
  Award,
  Zap,
  Users,
  Target,
  ArrowUpRight,
  Calendar,
  MapPin
} from "lucide-react";

// Case study categories
const categories = [
  { id: "all", name: "All Cases", icon: Award },
  { id: "bitcoin", name: "Bitcoin", icon: DollarSign },
  { id: "ethereum", name: "Ethereum", icon: Zap },
  { id: "hardware", name: "Hardware Wallets", icon: Shield },
  { id: "seed-phrase", name: "Seed Phrase", icon: CheckCircle },
  { id: "scam", name: "Scam Recovery", icon: Target },
];

// Case studies data
const caseStudies = [
  {
    id: 1,
    title: "Recovered $2.3M in Bitcoin from Forgotten Password",
    category: "bitcoin",
    excerpt: "A tech entrepreneur had lost access to his early Bitcoin investments from 2013. With only partial password information, our team successfully recovered his wallet containing 45 BTC.",
    amountRecovered: "$2,300,000",
    cryptocurrency: "Bitcoin",
    timeframe: "7 days",
    difficulty: "High",
    successRate: "100%",
    client: "Tech Entrepreneur",
    location: "San Francisco, CA",
    year: "2023",
    featured: true,
    image: "/images/cases/bitcoin-recovery.jpg",
    metrics: {
      btcAmount: "45 BTC",
      attempts: "127,000",
      method: "Advanced Password Recovery",
    },
    testimonial: {
      text: "I had given up hope after years of trying. WalletRecover's team worked tirelessly and recovered my Bitcoin in just one week. Absolutely life-changing!",
      author: "Michael R.",
      role: "Client",
    },
  },
  {
    id: 2,
    title: "Ethereum Wallet Recovered After Hard Drive Failure",
    category: "ethereum",
    excerpt: "A DeFi investor lost access to 850 ETH when their external hard drive failed. Our data recovery specialists extracted the wallet file and restored full access.",
    amountRecovered: "$1,700,000",
    cryptocurrency: "Ethereum",
    timeframe: "14 days",
    difficulty: "Very High",
    successRate: "100%",
    client: "DeFi Investor",
    location: "London, UK",
    year: "2024",
    featured: true,
    image: "/images/cases/ethereum-recovery.jpg",
    metrics: {
      ethAmount: "850 ETH",
      dataRecovered: "2.5 TB",
      method: "Hardware Data Recovery",
    },
    testimonial: {
      text: "The drive was completely dead. I thought everything was lost forever. Their technical expertise is unmatched.",
      author: "Sarah K.",
      role: "Client",
    },
  },
  {
    id: 3,
    title: "Ledger Hardware Wallet Recovery - $450K Restored",
    category: "hardware",
    excerpt: "Client lost their Ledger device and recovery phrase in a house fire. Using partial information and advanced recovery techniques, we restored access to their portfolio.",
    amountRecovered: "$450,000",
    cryptocurrency: "Multi-Chain",
    timeframe: "21 days",
    difficulty: "Very High",
    successRate: "100%",
    client: "Private Investor",
    location: "New York, NY",
    year: "2023",
    featured: false,
    image: "/images/cases/ledger-recovery.jpg",
    metrics: {
      wallets: "7 wallets",
      currencies: "5 cryptocurrencies",
      method: "Hardware Forensics",
    },
    testimonial: {
      text: "After the fire, I thought all hope was lost. They recovered everything from minimal information.",
      author: "David L.",
      role: "Client",
    },
  },
  {
    id: 4,
    title: "Partial Seed Phrase Recovery - $890K in BTC",
    category: "seed-phrase",
    excerpt: "With only 8 out of 12 seed phrase words, our AI-powered reconstruction algorithm successfully recovered the complete phrase and restored access to 18 BTC.",
    amountRecovered: "$890,000",
    cryptocurrency: "Bitcoin",
    timeframe: "5 days",
    difficulty: "High",
    successRate: "100%",
    client: "Early Adopter",
    location: "Austin, TX",
    year: "2024",
    featured: true,
    image: "/images/cases/seed-phrase-recovery.jpg",
    metrics: {
      knownWords: "8 of 12",
      combinations: "16.7M tested",
      method: "AI Seed Reconstruction",
    },
    testimonial: {
      text: "I only had 8 words written down. Their AI technology found the missing 4 words in less than a week!",
      author: "James P.",
      role: "Client",
    },
  },
  {
    id: 5,
    title: "Scam Recovery - Traced and Recovered $320K",
    category: "scam",
    excerpt: "Client fell victim to a sophisticated phishing scam. Our blockchain forensics team traced the stolen funds and worked with authorities to recover 85% of the assets.",
    amountRecovered: "$320,000",
    cryptocurrency: "USDT & ETH",
    timeframe: "45 days",
    difficulty: "Very High",
    successRate: "85%",
    client: "Business Owner",
    location: "Miami, FL",
    year: "2023",
    featured: false,
    image: "/images/cases/scam-recovery.jpg",
    metrics: {
      traced: "12 wallets",
      recovered: "85%",
      method: "Blockchain Forensics",
    },
    testimonial: {
      text: "I thought I'd never see my money again. Their investigation skills are phenomenal.",
      author: "Robert M.",
      role: "Client",
    },
  },
  {
    id: 6,
    title: "MetaMask Recovery - $125K in NFTs and Tokens",
    category: "ethereum",
    excerpt: "Lost MetaMask password with valuable NFT collection at stake. Successfully recovered account and transferred assets to a new secure wallet.",
    amountRecovered: "$125,000",
    cryptocurrency: "ETH & NFTs",
    timeframe: "3 days",
    difficulty: "Medium",
    successRate: "100%",
    client: "NFT Collector",
    location: "Los Angeles, CA",
    year: "2024",
    featured: false,
    image: "/images/cases/metamask-recovery.jpg",
    metrics: {
      nfts: "47 NFTs",
      tokens: "15 tokens",
      method: "Browser Extension Recovery",
    },
    testimonial: {
      text: "My entire NFT collection was locked. They recovered everything in just 3 days!",
      author: "Alex T.",
      role: "Client",
    },
  },
];

const CaseStudiesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Filter and sort case studies
  let filteredCases = caseStudies.filter(study => {
    const matchesCategory = selectedCategory === "all" || study.category === selectedCategory;
    const matchesSearch = 
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.cryptocurrency.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort cases
  if (sortBy === "featured") {
    filteredCases = filteredCases.sort((a, b) => Number(b.featured) - Number(a.featured));
  } else if (sortBy === "amount") {
    filteredCases = filteredCases.sort((a, b) => 
      parseFloat(b.amountRecovered.replace(/[$,]/g, '')) - parseFloat(a.amountRecovered.replace(/[$,]/g, ''))
    );
  } else if (sortBy === "recent") {
    filteredCases = filteredCases.sort((a, b) => Number(b.year) - Number(a.year));
  }

  const totalRecovered = caseStudies.reduce((sum, study) => 
    sum + parseFloat(study.amountRecovered.replace(/[$,]/g, '')), 0
  );

  return (
    <main 
      className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black"
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      
      {/* Hero Section */}
      <section 
        className="relative pt-20 xs:pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} aria-hidden="true" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              <span className="text-xs sm:text-sm text-green-300 font-medium">Real Success Stories</span>
            </div>
            
            <h1 
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              itemProp="name"
            >
              <span className="text-white">Recovery</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h1>
            
            <p 
              className="text-sm xs:text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-6 sm:mb-8 px-4"
              itemProp="description"
            >
              Real cases of cryptocurrency recovery from our clients. Over ${(totalRecovered / 1000000).toFixed(1)}M recovered across {caseStudies.length} successful cases.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto mb-8 sm:mb-10">
              <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  ${(totalRecovered / 1000000).toFixed(1)}M+
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Recovered</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  {caseStudies.length}
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Cases</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  98%
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Success</div>
              </div>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search case studies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-colors"
                  aria-label="Search case studies"
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                      inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25' 
                        : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                      }
                    `}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 sm:px-4 sm:py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-blue-400 transition-colors"
              aria-label="Sort case studies"
            >
              <option value="featured">Featured First</option>
              <option value="amount">Highest Amount</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="relative py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredCases.map((study) => (
                <CaseStudyCard key={study.id} study={study} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 md:py-20">
              <Search className="w-12 h-12 sm:w-16 sm:h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">No cases found</h3>
              <p className="text-sm sm:text-base text-white/60 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" aria-hidden="true" />
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 mb-4 sm:mb-6">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>

              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Ready to Recover Your Crypto?
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-white/60 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join our success stories. Get a free consultation and find out how we can help recover your lost cryptocurrency.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
                >
                  Start Free Consultation
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  How It Works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

// Case Study Card Component
const CaseStudyCard = ({ study }: { study: any }) => {
  const difficultyColors = {
    Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    High: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    "Very High": "text-red-400 bg-red-400/10 border-red-400/20",
  };

  return (
    <article
      className={`
        group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 
        bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm
        hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10
        transition-all duration-300 hover:scale-105
        ${study.featured ? 'ring-2 ring-blue-500/50' : ''}
      `}
      itemScope
      itemType="https://schema.org/Article"
    >
      {/* Featured Badge */}
      {study.featured && (
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-[10px] xs:text-xs font-bold text-white">
          Featured
        </div>
      )}

      {/* Image Placeholder */}
      <div className="relative h-40 xs:h-48 sm:h-56 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <DollarSign className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 text-white/20" />
        </div>
        
        {/* Stats Overlay */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
          <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
            <div className="text-base xs:text-lg sm:text-xl font-bold text-white">{study.amountRecovered}</div>
            <div className="text-[10px] xs:text-xs text-white/60">Recovered</div>
          </div>
          <div className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] xs:text-xs font-semibold border ${difficultyColors[study.difficulty as keyof typeof difficultyColors]}`}>
            {study.difficulty}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 xs:p-5 sm:p-6">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-[10px] xs:text-xs sm:text-sm text-white/50">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{study.year}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{study.timeframe}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="truncate">{study.location}</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          className="text-base xs:text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all line-clamp-2"
          itemProp="headline"
        >
          {study.title}
        </h3>

        {/* Description */}
        <p 
          className="text-xs xs:text-sm sm:text-base text-white/60 mb-4 sm:mb-5 line-clamp-3"
          itemProp="description"
        >
          {study.excerpt}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10">
          {Object.entries(study.metrics).map(([key, value], index) => (
            <div key={index} className="text-center">
              <div className="text-xs xs:text-sm sm:text-base font-bold text-white truncate">{value as string}</div>
              <div className="text-[10px] xs:text-xs text-white/40 truncate capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mb-4 sm:mb-5 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">
          <div className="flex items-start gap-2 mb-2">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs xs:text-sm text-white/80 italic line-clamp-2">"{study.testimonial.text}"</p>
          </div>
          <div className="text-[10px] xs:text-xs text-white/50 ml-5 sm:ml-6">
            — {study.testimonial.author}
          </div>
        </div>

        {/* Read More Link */}
        <Link
          href={`/case-studies/${study.id}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
        >
          <span>Read Full Case Study</span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>

        {/* Hidden Schema */}
        <meta itemProp="author" content="WalletRecover" />
        <meta itemProp="datePublished" content={`${study.year}-01-01`} />
      </div>
    </article>
  );
};

export default CaseStudiesPage;