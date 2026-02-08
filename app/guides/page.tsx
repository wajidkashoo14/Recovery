"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Search,
  Filter,
  TrendingUp,
  Shield,
  Key,
  Wallet,
  AlertTriangle,
  FileText,
  ChevronRight,
  Star,
  Download,
} from "lucide-react";

// Guide categories
const categories = [
  { id: "all", name: "All Guides", icon: BookOpen },
  { id: "beginner", name: "Beginner", icon: Star },
  { id: "recovery", name: "Recovery", icon: Key },
  { id: "security", name: "Security", icon: Shield },
  { id: "wallets", name: "Wallets", icon: Wallet },
  { id: "scams", name: "Scam Prevention", icon: AlertTriangle },
];

// Featured guides data
const guides = [
  {
    id: 1,
    title: "Complete Guide to Bitcoin Wallet Recovery",
    description:
      "Step-by-step instructions for recovering lost Bitcoin wallets, including hardware wallets, software wallets, and paper wallets. Learn about seed phrase recovery, password cracking, and more.",
    category: "recovery",
    difficulty: "Intermediate",
    readTime: "15 min",
    featured: true,
    image: "/images/guides/bitcoin-recovery.jpg",
    author: "John Crypto",
    date: "2024-01-15",
    tags: ["Bitcoin", "Recovery", "Hardware Wallet"],
  },
  {
    id: 2,
    title: "How to Secure Your Cryptocurrency Wallet",
    description:
      "Essential security practices every crypto holder should know. Protect your digital assets with multi-factor authentication, cold storage, and advanced security measures.",
    category: "security",
    difficulty: "Beginner",
    readTime: "10 min",
    featured: true,
    image: "/images/guides/wallet-security.jpg",
    author: "Sarah Shield",
    date: "2024-01-20",
    tags: ["Security", "Best Practices", "2FA"],
  },
  {
    id: 3,
    title: "Seed Phrase Recovery: What You Need to Know",
    description:
      "Comprehensive guide on seed phrase recovery methods. Learn how to reconstruct partial seed phrases and what to do when you've lost critical recovery information.",
    category: "recovery",
    difficulty: "Advanced",
    readTime: "20 min",
    featured: false,
    image: "/images/guides/seed-phrase.jpg",
    author: "Mike Recovery",
    date: "2024-02-01",
    tags: ["Seed Phrase", "Recovery", "BIP39"],
  },
  {
    id: 4,
    title: "Identifying and Avoiding Crypto Scams",
    description:
      "Learn to recognize common cryptocurrency scams including phishing attacks, fake exchanges, pump and dump schemes, and social engineering tactics.",
    category: "scams",
    difficulty: "Beginner",
    readTime: "12 min",
    featured: false,
    image: "/images/guides/scam-prevention.jpg",
    author: "Lisa Aware",
    date: "2024-02-05",
    tags: ["Scams", "Phishing", "Safety"],
  },
  {
    id: 5,
    title: "MetaMask Recovery Guide",
    description:
      "Detailed walkthrough for recovering your MetaMask wallet. Covers password resets, seed phrase imports, and troubleshooting common MetaMask issues.",
    category: "wallets",
    difficulty: "Beginner",
    readTime: "8 min",
    featured: false,
    image: "/images/guides/metamask.jpg",
    author: "Alex Web3",
    date: "2024-02-10",
    tags: ["MetaMask", "Ethereum", "Web3"],
  },
  {
    id: 6,
    title: "Ledger Hardware Wallet Setup & Recovery",
    description:
      "Complete guide to setting up your Ledger hardware wallet and recovering it in case of loss or damage. Includes backup strategies and security tips.",
    category: "wallets",
    difficulty: "Intermediate",
    readTime: "18 min",
    featured: true,
    image: "/images/guides/ledger.jpg",
    author: "Tom Hardware",
    date: "2024-02-15",
    tags: ["Ledger", "Hardware Wallet", "Cold Storage"],
  },
  {
    id: 7,
    title: "What to Do If You've Been Hacked",
    description:
      "Emergency response guide for compromised cryptocurrency wallets. Learn immediate actions to take, how to secure remaining assets, and recovery options.",
    category: "security",
    difficulty: "Intermediate",
    readTime: "15 min",
    featured: false,
    image: "/images/guides/hacked.jpg",
    author: "Sarah Shield",
    date: "2024-02-20",
    tags: ["Security", "Emergency", "Hacking"],
  },
  {
    id: 8,
    title: "Understanding Wallet Types: Hot vs Cold Storage",
    description:
      "Comprehensive comparison of different cryptocurrency wallet types. Learn the pros and cons of hot wallets, cold wallets, and everything in between.",
    category: "beginner",
    difficulty: "Beginner",
    readTime: "10 min",
    featured: false,
    image: "/images/guides/wallet-types.jpg",
    author: "John Crypto",
    date: "2024-02-25",
    tags: ["Basics", "Wallets", "Education"],
  },
  {
    id: 9,
    title: "Ethereum Wallet Recovery Methods",
    description:
      "Expert techniques for recovering Ethereum wallets and ERC-20 tokens. Covers keystore file recovery, private key extraction, and smart contract interactions.",
    category: "recovery",
    difficulty: "Advanced",
    readTime: "22 min",
    featured: false,
    image: "/images/guides/ethereum-recovery.jpg",
    author: "Mike Recovery",
    date: "2024-03-01",
    tags: ["Ethereum", "Recovery", "Smart Contracts"],
  },
];

const GuidesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter guides based on category and search
  const filteredGuides = guides.filter((guide) => {
    const matchesCategory =
      selectedCategory === "all" || guide.category === selectedCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredGuides = guides.filter((guide) => guide.featured);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      {/* Hero Section */}
      <section
        className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden"
        itemScope
        itemType="https://schema.org/CollectionPage"
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
              <span className="text-xs sm:text-sm text-blue-300 font-medium">
                Resource Center
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
              itemProp="name"
            >
              <span className="text-white">Crypto Recovery &amp;</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Security Guides
              </span>
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg text-white/60 max-w-3xl mx-auto mb-8 sm:mb-10"
              itemProp="description"
            >
              Expert guides, tutorials, and best practices to help you recover
              lost cryptocurrency and keep your digital assets secure. Written
              by industry professionals.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search guides, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-colors"
                aria-label="Search guides"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      {selectedCategory === "all" && !searchQuery && (
        <section className="relative py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Featured Guides
              </h2>
              <div className="flex items-center gap-2 text-blue-400">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm sm:text-base font-medium">
                  Popular
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Guides */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {selectedCategory === "all"
                ? "All Guides"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <div className="text-sm sm:text-base text-white/50">
              {filteredGuides.length}{" "}
              {filteredGuides.length === 1 ? "guide" : "guides"}
            </div>
          </div>

          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <Search className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                No guides found
              </h3>
              <p className="text-white/60 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm p-8 sm:p-10 md:p-12 text-center">
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"
              aria-hidden="true"
            />

            <div className="relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Need Professional Help?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our recovery specialists are
                available 24/7 to provide personalized assistance for your
                specific situation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
                >
                  Get Free Consultation
                </Link>
                <Link
                  href="/faqs"
                  className="px-6 py-3 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  View FAQs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Guide Card Component
const GuideCard = ({
  guide,
  featured = false,
}: {
  guide: any;
  featured?: boolean;
}) => {
  const difficultyColors = {
    Beginner: "text-green-400 bg-green-400/10 border-green-400/20",
    Intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Advanced: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  return (
    <article
      className={`
        group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 
        bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm
        hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10
        transition-all duration-300 hover:scale-105
        ${featured ? "ring-2 ring-blue-500/50" : ""}
      `}
      itemScope
      itemType="https://schema.org/Article"
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-bold text-white">
          Featured
        </div>
      )}

      {/* Image Placeholder */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText className="w-16 h-16 sm:w-20 sm:h-20 text-white/20" />
        </div>

        {/* Difficulty Badge */}
        <div
          className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            difficultyColors[guide.difficulty as keyof typeof difficultyColors]
          }`}
        >
          {guide.difficulty}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-3 text-xs sm:text-sm text-white/50">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{guide.readTime}</span>
          </div>
          <div>
            <time itemProp="datePublished" dateTime={guide.date}>
              {new Date(guide.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all line-clamp-2"
          itemProp="headline"
        >
          {guide.title}
        </h3>

        {/* Description */}
        <p
          className="text-xs sm:text-sm text-white/60 mb-4 line-clamp-3"
          itemProp="description"
        >
          {guide.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {guide.tags.slice(0, 3).map((tag: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] sm:text-xs text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Link */}
        <Link
          href={`/guides/${guide.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
        >
          <span>Read Guide</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>

        {/* Hidden Schema */}
        <meta itemProp="author" content={guide.author} />
        <meta itemProp="keywords" content={guide.tags.join(", ")} />
      </div>
    </article>
  );
};

export default GuidesPage;
