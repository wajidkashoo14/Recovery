"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Search,
  ChevronRight,
  ChevronDown,
  Code,
  Terminal,
  FileText,
  Shield,
  Zap,
  Database,
  Settings,
  Lock,
  Key,
  Cpu,
  Book,
  Download,
  ExternalLink,
  Copy,
  Check,
  Menu,
  X
} from "lucide-react";

// Documentation structure
const docSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    items: [
      { id: "introduction", title: "Introduction", slug: "introduction" },
      { id: "quick-start", title: "Quick Start Guide", slug: "quick-start" },
      { id: "system-requirements", title: "System Requirements", slug: "system-requirements" },
      { id: "installation", title: "Installation", slug: "installation" },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
    icon: Code,
    items: [
      { id: "authentication", title: "Authentication", slug: "authentication" },
      { id: "endpoints", title: "API Endpoints", slug: "endpoints" },
      { id: "rate-limits", title: "Rate Limits", slug: "rate-limits" },
      { id: "error-codes", title: "Error Codes", slug: "error-codes" },
    ],
  },
  {
    id: "recovery-methods",
    title: "Recovery Methods",
    icon: Key,
    items: [
      { id: "password-recovery", title: "Password Recovery", slug: "password-recovery" },
      { id: "seed-phrase", title: "Seed Phrase Recovery", slug: "seed-phrase" },
      { id: "hardware-wallet", title: "Hardware Wallet Recovery", slug: "hardware-wallet" },
      { id: "exchange-recovery", title: "Exchange Recovery", slug: "exchange-recovery" },
    ],
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    items: [
      { id: "encryption", title: "Encryption Standards", slug: "encryption" },
      { id: "data-protection", title: "Data Protection", slug: "data-protection" },
      { id: "best-practices", title: "Security Best Practices", slug: "best-practices" },
      { id: "compliance", title: "Compliance & Regulations", slug: "compliance" },
    ],
  },
  {
    id: "technical-specs",
    title: "Technical Specifications",
    icon: Cpu,
    items: [
      { id: "architecture", title: "System Architecture", slug: "architecture" },
      { id: "algorithms", title: "Recovery Algorithms", slug: "algorithms" },
      { id: "blockchain", title: "Blockchain Integration", slug: "blockchain" },
      { id: "performance", title: "Performance Metrics", slug: "performance" },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: Zap,
    items: [
      { id: "webhooks", title: "Webhooks", slug: "webhooks" },
      { id: "sdks", title: "SDKs & Libraries", slug: "sdks" },
      { id: "plugins", title: "Plugins", slug: "plugins" },
      { id: "third-party", title: "Third-Party Tools", slug: "third-party" },
    ],
  },
];

// Sample documentation content
const docContent: { [key: string]: any } = {
  introduction: {
    title: "Introduction to WalletRecover",
    description: "Welcome to the WalletRecover technical documentation. This comprehensive guide will help you understand our cryptocurrency recovery platform.",
    lastUpdated: "2024-03-01",
    content: `
## Overview

WalletRecover is an industry-leading cryptocurrency wallet recovery service that uses advanced algorithms and AI-powered tools to help users regain access to their lost digital assets.

### Key Features

- **Multi-Cryptocurrency Support**: Recover Bitcoin, Ethereum, and 100+ cryptocurrencies
- **Advanced Recovery Algorithms**: Proprietary technology with 98% success rate
- **Bank-Level Security**: AES-256 encryption and secure environments
- **24/7 Support**: Round-the-clock assistance for urgent cases

### How It Works

Our recovery process leverages cutting-edge technology including:

1. **AI-Powered Analysis**: Machine learning models analyze wallet data
2. **Custom Algorithms**: Proprietary recovery algorithms for different wallet types
3. **Blockchain Integration**: Direct blockchain analysis and verification
4. **Secure Processing**: All operations in isolated, encrypted environments

### Getting Help

If you need assistance:
- Browse our [FAQs](/faqs)
- Contact [support@walletrecover.com](mailto:support@walletrecover.com)
- Call our 24/7 hotline: +1 (800) RECOVER
    `,
    codeExample: null,
  },
  authentication: {
    title: "API Authentication",
    description: "Learn how to authenticate your API requests using API keys and OAuth 2.0.",
    lastUpdated: "2024-02-28",
    content: `
## Authentication Methods

WalletRecover API supports two authentication methods:

### 1. API Key Authentication

Include your API key in the request header:

\`\`\`http
GET /api/v1/recovery/status
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
\`\`\`

### 2. OAuth 2.0

For more secure, user-delegated access:

1. **Obtain Authorization Code**
2. **Exchange for Access Token**
3. **Use Access Token in Requests**

### Security Best Practices

- Never expose API keys in client-side code
- Rotate keys regularly (every 90 days recommended)
- Use environment variables for key storage
- Implement rate limiting on your end
- Monitor API usage for anomalies

### Rate Limits

- **Standard Tier**: 1,000 requests/hour
- **Pro Tier**: 10,000 requests/hour
- **Enterprise**: Custom limits available
    `,
    codeExample: {
      language: "javascript",
      code: `// Initialize API client
const WalletRecoverAPI = require('@walletrecover/sdk');

const client = new WalletRecoverAPI({
  apiKey: process.env.WALLETRECOVER_API_KEY,
  environment: 'production'
});

// Make authenticated request
async function checkRecoveryStatus(caseId) {
  try {
    const response = await client.recovery.getStatus(caseId);
    console.log('Recovery status:', response.status);
    return response;
  } catch (error) {
    console.error('API Error:', error.message);
  }
}`,
    },
  },
  "seed-phrase": {
    title: "Seed Phrase Recovery",
    description: "Technical documentation for recovering wallets using partial or complete seed phrases.",
    lastUpdated: "2024-03-02",
    content: `
## Seed Phrase Recovery Process

Our seed phrase recovery service can reconstruct missing words when you have partial recovery information.

### BIP39 Standard

We support all BIP39-compliant wallets with:
- 12-word seed phrases
- 24-word seed phrases
- Multiple language dictionaries

### Recovery Requirements

**Minimum Requirements:**
- At least 8 known words (for 12-word phrases)
- At least 18 known words (for 24-word phrases)
- Correct word order (partially known)

### Technical Process

1. **Validation**: Verify known words against BIP39 wordlist
2. **Analysis**: Determine possible combinations
3. **Computation**: Test valid combinations using checksum
4. **Verification**: Validate against blockchain
5. **Restoration**: Generate wallet from correct phrase

### Computational Complexity

The number of possible combinations depends on missing words:

- 1 missing word: ~2,048 possibilities
- 2 missing words: ~4,194,304 possibilities
- 3 missing words: ~8,589,934,592 possibilities

Our advanced algorithms can process these combinations efficiently.
    `,
    codeExample: {
      language: "python",
      code: `from walletrecover import SeedPhraseRecovery

# Initialize recovery client
recovery = SeedPhraseRecovery()

# Known seed phrase with missing words (use None for unknown)
partial_seed = [
    "word1", "word2", None, "word4",
    "word5", None, "word7", "word8",
    "word9", "word10", "word11", "word12"
]

# Start recovery process
result = recovery.recover_seed_phrase(
    partial_seed=partial_seed,
    wallet_type="BIP39",
    derivation_path="m/44'/0'/0'/0/0"
)

if result.success:
    print(f"Recovered seed phrase: {result.seed_phrase}")
    print(f"Wallet address: {result.address}")
else:
    print(f"Recovery failed: {result.error}")`,
    },
  },
  encryption: {
    title: "Encryption Standards",
    description: "Details about our security measures and encryption protocols.",
    lastUpdated: "2024-02-25",
    content: `
## Security Architecture

WalletRecover employs military-grade encryption and security measures to protect your data.

### Encryption Standards

**Data at Rest:**
- AES-256 encryption
- Encrypted database fields
- Secure key management (HSM)

**Data in Transit:**
- TLS 1.3
- Perfect Forward Secrecy
- Certificate pinning

**Data Processing:**
- Isolated environments
- Memory encryption
- Secure enclaves

### Key Management

- Hardware Security Modules (HSM)
- Key rotation every 90 days
- Multi-signature key access
- Zero-knowledge architecture

### Compliance

We maintain compliance with:
- SOC 2 Type II
- ISO 27001
- GDPR
- CCPA
- PCI DSS Level 1
    `,
    codeExample: {
      language: "bash",
      code: `# Example: Secure API request with TLS
curl -X POST https://api.walletrecover.com/v1/recovery \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  --tlsv1.3 \\
  --cert client-cert.pem \\
  --key client-key.pem \\
  -d '{
    "wallet_type": "bitcoin",
    "recovery_method": "seed_phrase"
  }'`,
    },
  },
};

// export const metadata = {
//   title: 'Technical Documentation - Cryptocurrency Recovery API | WalletRecover',
//   description: 'Comprehensive technical documentation for WalletRecover API, recovery methods, security standards, and integration guides.',
// };

const DocsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["getting-started"]);
  const [selectedDoc, setSelectedDoc] = useState("introduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleDocSelect = (docId: string) => {
    setSelectedDoc(docId);
    setSidebarOpen(false);
    // Scroll to top on mobile
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const currentDoc = docContent[selectedDoc] || docContent.introduction;

  return (
    <main 
      className="min-h-screen bg-black"
      itemScope
      itemType="https://schema.org/TechArticle"
    >
      
      {/* SEO Meta Tags */}
      <meta itemProp="name" content={currentDoc.title} />
      <meta itemProp="description" content={currentDoc.description} />
      <meta itemProp="dateModified" content={currentDoc.lastUpdated} />
      <meta itemProp="author" content="WalletRecover" />
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Logo & Title */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-1.5 sm:p-2 hover:bg-white/5 rounded-lg transition-colors flex-shrink-0"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
              </button>
              
              <Link href="/" className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <Book className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
                <span className="text-base sm:text-lg font-bold text-white truncate">Documentation</span>
              </Link>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-2 sm:mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-colors"
                  aria-label="Search documentation"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
              >
                <span className="hidden xs:inline">Get</span> Support
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto">
        <div className="flex">
          
          {/* Sidebar */}
          <aside
            className={`
              fixed lg:sticky top-14 sm:top-16 left-0 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] 
              w-full xs:w-80 sm:w-72 bg-zinc-900/95 lg:bg-zinc-900/50 backdrop-blur-sm 
              border-r border-white/10 overflow-y-auto z-40 transition-transform duration-300
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
            itemScope
            itemType="https://schema.org/SiteNavigationElement"
          >
            <nav className="p-3 xs:p-4 sm:p-6">
              
              {/* Mobile Search */}
              <div className="mb-4 sm:mb-6 md:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
                    aria-label="Search documentation"
                  />
                </div>
              </div>

              {/* Documentation Sections */}
              <div className="space-y-1">
                {docSections.map((section) => {
                  const Icon = section.icon;
                  const isExpanded = expandedSections.includes(section.id);

                  return (
                    <div key={section.id}>
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{section.title}</span>
                        </div>
                        <ChevronDown
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* Section Items */}
                      {isExpanded && (
                        <div className="ml-4 sm:ml-6 mt-1 space-y-1 border-l border-white/10 pl-2 sm:pl-3">
                          {section.items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleDocSelect(item.id)}
                              className={`
                                w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg transition-all truncate
                                ${selectedDoc === item.id
                                  ? 'bg-blue-500/20 text-blue-400 font-medium'
                                  : 'text-white/60 hover:text-white hover:bg-white/5'
                                }
                              `}
                            >
                              {item.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quick Links */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
                <h3 className="px-2.5 sm:px-3 mb-2 sm:mb-3 text-[10px] xs:text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Quick Links
                </h3>
                <div className="space-y-1">
                  <Link
                    href="/resources/guides"
                    className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Guides</span>
                  </Link>
                  <Link
                    href="/faqs"
                    className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>FAQs</span>
                  </Link>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <article
              className="max-w-4xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12 lg:py-16"
              itemProp="articleBody"
            >
              
              {/* Breadcrumb */}
              <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/50 mb-4 sm:mb-6" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                <Link href="/resources" className="hover:text-white transition-colors hidden xs:inline">Resources</Link>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 hidden xs:inline" />
                <Link href="/resources/docs" className="hover:text-white transition-colors">Docs</Link>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-white truncate max-w-[150px] xs:max-w-none">{currentDoc.title}</span>
              </nav>

              {/* Header */}
              <header className="mb-6 sm:mb-8 md:mb-12">
                <h1 
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight"
                  itemProp="headline"
                >
                  {currentDoc.title}
                </h1>
                <p 
                  className="text-sm xs:text-base sm:text-lg text-white/60 mb-3 sm:mb-4"
                  itemProp="description"
                >
                  {currentDoc.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/40">
                  <time itemProp="dateModified" dateTime={currentDoc.lastUpdated}>
                    Updated: {new Date(currentDoc.lastUpdated).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </time>
                  <span className="hidden xs:inline">•</span>
                  <span className="hidden xs:inline">5 min read</span>
                </div>
              </header>

              {/* Content */}
              <div 
                className="prose prose-invert prose-blue max-w-none mb-8 sm:mb-12"
                dangerouslySetInnerHTML={{ 
                  __html: currentDoc.content
                    .split('\n')
                    .map((line: string) => {
                      if (line.startsWith('## ')) {
                        return `<h2 class="text-xl xs:text-2xl sm:text-3xl font-bold text-white mt-8 sm:mt-12 mb-3 sm:mb-4">${line.substring(3)}</h2>`;
                      }
                      if (line.startsWith('### ')) {
                        return `<h3 class="text-lg xs:text-xl sm:text-2xl font-bold text-white mt-6 sm:mt-8 mb-2 sm:mb-3">${line.substring(4)}</h3>`;
                      }
                      if (line.startsWith('- ')) {
                        return `<li class="text-white/70 ml-4 text-sm sm:text-base">${line.substring(2)}</li>`;
                      }
                      if (line.includes('**')) {
                        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
                      }
                      if (line.startsWith('```')) {
                        return '';
                      }
                      if (line.trim()) {
                        return `<p class="text-white/70 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">${line}</p>`;
                      }
                      return '';
                    })
                    .join('')
                }}
              />

              {/* Code Example */}
              {currentDoc.codeExample && (
                <div className="mb-8 sm:mb-12">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white">Code Example</h3>
                    <button
                      onClick={() => copyCode(currentDoc.codeExample.code)}
                      className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs sm:text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                          <span className="hidden xs:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="hidden xs:inline">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="relative rounded-lg sm:rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
                    <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-zinc-800/50 border-b border-white/10">
                      <span className="text-[10px] xs:text-xs text-white/60 font-mono">{currentDoc.codeExample.language}</span>
                      <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40" />
                    </div>
                    <pre className="p-3 sm:p-4 overflow-x-auto">
                      <code className="text-xs sm:text-sm text-white/80 font-mono whitespace-pre">
                        {currentDoc.codeExample.code}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <button className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180" />
                    <span>Previous</span>
                  </button>
                  <button className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Help Section */}
                <div className="p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">
                  <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-2">Need Help?</h3>
                  <p className="text-xs xs:text-sm sm:text-base text-white/60 mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm font-medium"
                    >
                      Contact Support
                    </Link>
                    <Link
                      href="/faqs"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors text-xs sm:text-sm font-medium"
                    >
                      View FAQs
                    </Link>
                  </div>
                </div>
              </footer>
            </article>
          </div>

          {/* Right Sidebar - Table of Contents (Desktop only) */}
          <aside className="hidden xl:block sticky top-16 w-64 h-[calc(100vh-4rem)] overflow-y-auto p-6 border-l border-white/10">
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
              On This Page
            </h3>
            <nav className="space-y-2">
              <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors py-1">
                Overview
              </a>
              <a href="#" className="block text-sm text-blue-400 transition-colors py-1 font-medium">
                Key Features
              </a>
              <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors py-1">
                How It Works
              </a>
              <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors py-1">
                Getting Help
              </a>
            </nav>
          </aside>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </main>
  );
};

export default DocsPage;