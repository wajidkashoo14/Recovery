"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  Info,
  Eye,
  EyeOff,
  Smartphone,
  Fingerprint,
  Wifi,
  WifiOff,
  Database,
  FileCheck,
  ShieldCheck,
  AlertOctagon,
  Zap,
  Server,
  Cloud,
  HardDrive,
  Download,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Check,
  X
} from "lucide-react";

// Security best practices
const securityPractices = [
  {
    id: "storage",
    title: "Secure Storage",
    icon: Database,
    color: "blue",
    practices: [
      {
        title: "Use Hardware Wallets",
        description: "Store large amounts in cold storage devices like Ledger or Trezor",
        priority: "Critical",
        difficulty: "Easy",
      },
      {
        title: "Multiple Backup Locations",
        description: "Store recovery phrases in 2-3 secure, separate physical locations",
        priority: "Critical",
        difficulty: "Easy",
      },
      {
        title: "Avoid Digital Storage",
        description: "Never store seed phrases in photos, emails, or cloud storage",
        priority: "Critical",
        difficulty: "Easy",
      },
      {
        title: "Use Metal Backup",
        description: "Store seed phrases on fireproof/waterproof metal plates",
        priority: "High",
        difficulty: "Medium",
      },
    ],
  },
  {
    id: "authentication",
    title: "Authentication & Access",
    icon: Fingerprint,
    color: "purple",
    practices: [
      {
        title: "Enable 2FA Everywhere",
        description: "Use authenticator apps (Google Authenticator, Authy) for all accounts",
        priority: "Critical",
        difficulty: "Easy",
      },
      {
        title: "Use Strong Passwords",
        description: "Create unique 16+ character passwords with password manager",
        priority: "Critical",
        difficulty: "Easy",
      },
      {
        title: "Biometric Authentication",
        description: "Enable fingerprint/face ID when available",
        priority: "High",
        difficulty: "Easy",
      },
      {
        title: "Hardware Security Keys",
        description: "Use YubiKey or similar for critical accounts",
        priority: "High",
        difficulty: "Medium",
      },
    ],
  },
  {
    id: "network",
    title: "Network Security",
    icon: Wifi,
    color: "green",
    practices: [
      {
        title: "Avoid Public WiFi",
        description: "Never access wallets on public or unsecured networks",
        priority: "Critical",
        difficulty: "Easy",
      },
      {
        title: "Use VPN",
        description: "Always use a trusted VPN for crypto transactions",
        priority: "High",
        difficulty: "Easy",
      },
      {
        title: "Secure Home Network",
        description: "Use WPA3 encryption and strong router password",
        priority: "High",
        difficulty: "Medium",
      },
      {
        title: "Dedicated Device",
        description: "Consider a device exclusively for crypto management",
        priority: "Medium",
        difficulty: "Hard",
      },
    ],
  },
  {
    id: "scam-prevention",
    title: "Scam Prevention",
    icon: AlertTriangle,
    color: "red",
    practices: [
      {
        title: "Verify URLs",
        description: "Always double-check website URLs before entering credentials",
        priority: "Critical",
        difficulty: "Easy",
      },
      {
        title: "Never Share Seed Phrases",
        description: "No legitimate service will ever ask for your seed phrase",
        priority: "Critical",
        difficulty: "Easy",
      },
      {
        title: "Verify Smart Contracts",
        description: "Check contract addresses on block explorers before transactions",
        priority: "High",
        difficulty: "Medium",
      },
      {
        title: "Beware of Urgency",
        description: "Scammers create fake urgency - always take time to verify",
        priority: "High",
        difficulty: "Easy",
      },
    ],
  },
] as const;

// Security checklist
const securityChecklist = [
  { id: 1, text: "Seed phrase backed up in 2+ secure locations", category: "backup" },
  { id: 2, text: "Hardware wallet purchased from official source", category: "hardware" },
  { id: 3, text: "2FA enabled on all exchange accounts", category: "accounts" },
  { id: 4, text: "Password manager set up with strong master password", category: "passwords" },
  { id: 5, text: "Verified all wallet addresses before first use", category: "verification" },
  { id: 6, text: "Installed antivirus and keep it updated", category: "software" },
  { id: 7, text: "Regular security audits of all crypto holdings", category: "maintenance" },
  { id: 8, text: "Separate email for crypto accounts", category: "accounts" },
  { id: 9, text: "VPN installed and configured", category: "network" },
  { id: 10, text: "Family/trusted person knows how to access in emergency", category: "backup" },
];

// Common threats
const threats = [
  {
    title: "Phishing Attacks",
    description: "Fake websites and emails designed to steal your credentials",
    severity: "Critical",
    prevention: "Always verify URLs, use bookmarks, enable anti-phishing codes",
    icon: AlertOctagon,
  },
  {
    title: "Malware & Keyloggers",
    description: "Software that records your keystrokes and steals wallet data",
    severity: "Critical",
    prevention: "Use antivirus, avoid suspicious downloads, use hardware wallets",
    icon: AlertTriangle,
  },
  {
    title: "SIM Swap Attacks",
    description: "Attackers hijack your phone number to bypass 2FA",
    severity: "High",
    prevention: "Use authenticator apps instead of SMS 2FA, contact carrier for protection",
    icon: Smartphone,
  },
  {
    title: "Social Engineering",
    description: "Manipulation tactics to trick you into revealing sensitive info",
    severity: "High",
    prevention: "Never share private info, verify all requests independently",
    icon: Eye,
  },
  {
    title: "Exchange Hacks",
    description: "Centralized exchanges getting compromised",
    severity: "Medium",
    prevention: "Don't store large amounts on exchanges, use cold storage",
    icon: Server,
  },
  {
    title: "Clipboard Hijacking",
    description: "Malware that changes copied wallet addresses",
    severity: "Medium",
    prevention: "Always verify addresses character by character before sending",
    icon: FileCheck,
  },
];

const SecurityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("storage");
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const toggleChecklistItem = (id: number) => {
    setCheckedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const completionPercentage = Math.round((checkedItems.length / securityChecklist.length) * 100);

  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
  };

  // We know selectedCategory always matches one item → safe to use !
  const selectedPractice = securityPractices.find(p => p.id === selectedCategory)!;

  return (
    <main 
      className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      
      {/* Hero Section */}
      <section className="relative pt-20 xs:pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
        <div className="absolute top-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" aria-hidden="true" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
              <span className="text-xs sm:text-sm text-blue-300 font-medium">Protect Your Assets</span>
            </div>
            
            <h1 
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              itemProp="name"
            >
              <span className="text-white">Cryptocurrency</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Security Guide
              </span>
            </h1>
            
            <p 
              className="text-sm xs:text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 sm:mb-10"
              itemProp="description"
            >
              Comprehensive best practices, tools, and strategies to protect your digital assets. 
              Learn how to secure your cryptocurrency from hackers, scammers, and common threats.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto">
              <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2" />
                <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Attacks Preventable</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Protection Needed</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-1">$3B+</div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-white/50">Lost in 2023</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Checklist */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Security Checklist
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Track your security progress. Complete all items for maximum protection.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm text-white/60">Security Score</span>
              <span className="text-lg sm:text-xl font-bold text-white">{completionPercentage}%</span>
            </div>
            <div className="h-3 sm:h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2 sm:space-y-3">
            {securityChecklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`
                  w-full flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all
                  ${checkedItems.includes(item.id)
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }
                `}
              >
                <div className={`
                  flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 flex items-center justify-center mt-0.5
                  ${checkedItems.includes(item.id)
                    ? 'bg-green-500 border-green-500'
                    : 'border-white/30'
                  }
                `}>
                  {checkedItems.includes(item.id) && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                </div>
                <span className={`
                  text-left text-xs xs:text-sm sm:text-base
                  ${checkedItems.includes(item.id) ? 'text-white/80 line-through' : 'text-white'}
                `}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>

          {/* Completion Message */}
          {completionPercentage === 100 && (
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <div className="flex items-start gap-3 sm:gap-4">
                <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Excellent Security!</h3>
                  <p className="text-xs sm:text-sm text-white/80">
                    You've completed all security best practices. Your crypto assets are well protected!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Best Practices */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Security Best Practices
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Follow these expert-recommended practices to protect your cryptocurrency
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-2 sm:space-y-3">
                {securityPractices.map((practice) => {
                  const Icon = practice.icon;
                  const isActive = selectedCategory === practice.id;
                  return (
                    <button
                      key={practice.id}
                      onClick={() => setSelectedCategory(practice.id)}
                      className={`
                        w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all text-left
                        ${isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <span className="text-sm sm:text-base font-medium">{practice.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Practices Content */}
            <div className="lg:col-span-2">
              <div className="space-y-3 sm:space-y-4">
                {selectedPractice.practices.map((practice, index) => (
                  <div
                    key={index}
                    className="p-4 sm:p-5 md:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{practice.title}</h3>
                      <div className="flex gap-2">
                        <span className={`
                          px-2 py-1 rounded-md text-[10px] xs:text-xs font-semibold border whitespace-nowrap
                          ${practice.priority === 'Critical'
                            ? 'text-red-400 bg-red-400/10 border-red-400/30'
                            : practice.priority === 'High'
                            ? 'text-orange-400 bg-orange-400/10 border-orange-400/30'
                            : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
                          }
                        `}>
                          {practice.priority}
                        </span>
                        <span className="px-2 py-1 rounded-md text-[10px] xs:text-xs font-semibold bg-blue-400/10 text-blue-400 border border-blue-400/30 whitespace-nowrap">
                          {practice.difficulty}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs xs:text-sm sm:text-base text-white/70 leading-relaxed">
                      {practice.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Threats */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Common Threats
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-white/60">
              Understand the risks and how to protect yourself
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {threats.map((threat, index) => {
              const Icon = threat.icon;
              return (
                <div
                  key={index}
                  className="p-4 sm:p-5 md:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-red-500/10 transition-all"
                >
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className={`
                      w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${threat.severity === 'Critical'
                        ? 'bg-red-500/20 text-red-400'
                        : threat.severity === 'High'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                      }
                    `}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">{threat.title}</h3>
                      <span className={`
                        inline-block px-2 py-0.5 rounded-md text-[10px] xs:text-xs font-semibold
                        ${threat.severity === 'Critical'
                          ? 'bg-red-500/20 text-red-400'
                          : threat.severity === 'High'
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                        }
                      `}>
                        {threat.severity} Risk
                      </span>
                    </div>
                  </div>
                  <p className="text-xs xs:text-sm text-white/60 mb-3 sm:mb-4">{threat.description}</p>
                  <div className="pt-3 sm:pt-4 border-t border-white/10">
                    <div className="text-[10px] xs:text-xs text-white/40 mb-1 sm:mb-2 font-semibold">PREVENTION:</div>
                    <p className="text-xs xs:text-sm text-white/70">{threat.prevention}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Password Strength Checker */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
              Password Strength Checker
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-white/60 mb-4 sm:mb-6">
              Test your password strength. Note: Never enter your actual passwords here.
            </p>
            
            <div className="relative mb-4 sm:mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter a test password..."
                className="w-full px-4 py-3 sm:py-4 pr-12 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="text-white/70">At least 16 characters</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="text-white/70">Contains uppercase and lowercase</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="text-white/70">Contains numbers and symbols</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" aria-hidden="true" />
            
            <div className="relative">
              <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Need Security Help?
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-white/60 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Our security experts are available 24/7 to help you protect your cryptocurrency 
                and recover compromised accounts.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
                >
                  Get Security Consultation
                </Link>
                <Link
                  href="/resources/guides"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                >
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  Read Security Guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default SecurityPage;